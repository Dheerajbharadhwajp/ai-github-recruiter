from typing import List, Optional

from pydantic import BaseModel


class ProfileRequest(BaseModel):
    username: str


class RepositoryRead(BaseModel):
    id: int
    owner_login: str
    repo_name: str
    description: Optional[str] = None
    language: Optional[str] = None
    stars: int
    forks: int
    url: str
    is_contributed: bool

    model_config = {"from_attributes": True}


class ProfileResponse(BaseModel):
    id: int
    github_username: str
    name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    followers: int
    following: int
    public_repos: int
    repositories: List[RepositoryRead] = []

    model_config = {"from_attributes": True}
