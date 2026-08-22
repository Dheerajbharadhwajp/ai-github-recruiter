from sqlmodel import Session, select

from app.models import Repository, User
from app.services.github_service import (
    fetch_contributed_repos,
    fetch_github_repos,
    fetch_github_user,
)


async def sync_profile(username: str, session: Session) -> User:
    gh_user = await fetch_github_user(username)
    gh_repos = await fetch_github_repos(username)
    contributed_repos = await fetch_contributed_repos(username)

    user = session.exec(select(User).where(User.github_username == gh_user["login"])).first()
    if user is None:
        user = User(github_username=gh_user["login"])

    user.name = gh_user.get("name")
    user.bio = gh_user.get("bio")
    user.avatar_url = gh_user.get("avatar_url")
    user.followers = gh_user.get("followers", 0)
    user.following = gh_user.get("following", 0)
    user.public_repos = gh_user.get("public_repos", 0)

    session.add(user)
    session.commit()
    session.refresh(user)

    existing_by_key = {
        (r.owner_login, r.repo_name): r
        for r in session.exec(select(Repository).where(Repository.user_id == user.id))
    }

    for repo_data in gh_repos:
        name = repo_data["name"]
        owner_login = repo_data.get("owner", {}).get("login", gh_user["login"])
        key = (owner_login, name)
        repo = existing_by_key.get(key) or Repository(
            user_id=user.id, owner_login=owner_login, repo_name=name, url=repo_data["html_url"]
        )
        repo.description = repo_data.get("description")
        repo.language = repo_data.get("language")
        repo.stars = repo_data.get("stargazers_count", 0)
        repo.forks = repo_data.get("forks_count", 0)
        repo.url = repo_data["html_url"]
        repo.is_contributed = False
        session.add(repo)

    for repo_data in contributed_repos:
        key = (repo_data["owner_login"], repo_data["repo_name"])
        repo = existing_by_key.get(key) or Repository(
            user_id=user.id,
            owner_login=repo_data["owner_login"],
            repo_name=repo_data["repo_name"],
            url=repo_data["url"],
        )
        repo.description = repo_data.get("description")
        repo.language = repo_data.get("language")
        repo.stars = repo_data.get("stars", 0)
        repo.forks = repo_data.get("forks", 0)
        repo.url = repo_data["url"]
        repo.is_contributed = True
        session.add(repo)

    session.commit()
    session.refresh(user)
    return user
