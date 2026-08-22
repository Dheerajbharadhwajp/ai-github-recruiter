import asyncio
from typing import Optional

import httpx
from fastapi import HTTPException

from app.core.config import GITHUB_TOKEN

GITHUB_API_BASE = "https://api.github.com"
GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
MAX_REPO_PAGES = 3
MAX_README_REPOS = 5
MAX_CONTRIBUTED_REPOS = 20
README_TIMEOUT = 10.0

CONTRIBUTED_REPOS_QUERY = """
query($login: String!, $first: Int!) {
  user(login: $login) {
    repositoriesContributedTo(
      first: $first
      includeUserRepositories: false
      contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, REPOSITORY]
    ) {
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage { name }
        owner { login }
      }
    }
  }
}
"""


def _headers() -> dict:
    headers = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return headers


def _raise_for_github_status(resp: httpx.Response, username: str) -> None:
    if resp.status_code == 404:
        raise HTTPException(status_code=404, detail=f"GitHub user '{username}' not found")
    if resp.status_code == 403:
        raise HTTPException(
            status_code=429,
            detail="GitHub API rate limit exceeded. Try again later or set GITHUB_TOKEN.",
        )
    resp.raise_for_status()


async def fetch_github_user(username: str) -> dict:
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(f"{GITHUB_API_BASE}/users/{username}", headers=_headers())
    _raise_for_github_status(resp, username)
    return resp.json()


async def fetch_github_repos(username: str) -> list[dict]:
    repos: list[dict] = []
    async with httpx.AsyncClient(timeout=10.0) as client:
        for page in range(1, MAX_REPO_PAGES + 1):
            resp = await client.get(
                f"{GITHUB_API_BASE}/users/{username}/repos",
                headers=_headers(),
                params={"per_page": 100, "page": page, "sort": "updated"},
            )
            _raise_for_github_status(resp, username)
            batch = resp.json()
            repos.extend(batch)
            if len(batch) < 100:
                break
    return [r for r in repos if not r.get("fork", False)]


async def fetch_contributed_repos(username: str) -> list[dict]:
    if not GITHUB_TOKEN:
        return []

    headers = _headers()
    headers["Content-Type"] = "application/json"
    payload = {
        "query": CONTRIBUTED_REPOS_QUERY,
        "variables": {"login": username, "first": MAX_CONTRIBUTED_REPOS},
    }
    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(GITHUB_GRAPHQL_URL, headers=headers, json=payload)
    if resp.status_code != 200:
        return []

    data = resp.json()
    if data.get("errors") or not data.get("data", {}).get("user"):
        return []

    nodes = data["data"]["user"]["repositoriesContributedTo"]["nodes"]
    return [
        {
            "repo_name": node["name"],
            "description": node.get("description"),
            "language": (node.get("primaryLanguage") or {}).get("name"),
            "stars": node.get("stargazerCount", 0),
            "forks": node.get("forkCount", 0),
            "url": node["url"],
            "owner_login": node["owner"]["login"],
        }
        for node in nodes
    ]


async def fetch_repo_readme(owner: str, repo: str) -> Optional[str]:
    headers = _headers()
    headers["Accept"] = "application/vnd.github.raw"
    try:
        async with httpx.AsyncClient(timeout=README_TIMEOUT) as client:
            resp = await client.get(
                f"{GITHUB_API_BASE}/repos/{owner}/{repo}/readme", headers=headers
            )
        if resp.status_code != 200:
            return None
        return resp.text
    except (httpx.TimeoutException, httpx.HTTPError):
        return None


async def fetch_readmes_for_top_repos(owner: str, repos: list[dict]) -> dict[str, Optional[str]]:
    top = sorted(repos, key=lambda r: r.get("stars", 0), reverse=True)[:MAX_README_REPOS]
    results = await asyncio.gather(*(fetch_repo_readme(owner, r["repo_name"]) for r in top))
    return {r["repo_name"]: content for r, content in zip(top, results)}
