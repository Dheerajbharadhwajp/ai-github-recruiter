from langgraph.graph import END, START, StateGraph

from app.agents.nodes import (
    profile_analyzer,
    recruiter_agent,
    repository_analyzer,
    skill_extractor,
)
from app.agents.state import AnalysisState


def build_analysis_graph():
    graph = StateGraph(AnalysisState)

    graph.add_node("profile_analyzer", profile_analyzer)
    graph.add_node("repository_analyzer", repository_analyzer)
    graph.add_node("skill_extractor", skill_extractor)
    graph.add_node("recruiter_agent", recruiter_agent)

    graph.add_edge(START, "profile_analyzer")
    graph.add_edge(START, "repository_analyzer")
    graph.add_edge(START, "skill_extractor")

    graph.add_edge("profile_analyzer", "recruiter_agent")
    graph.add_edge("repository_analyzer", "recruiter_agent")
    graph.add_edge("skill_extractor", "recruiter_agent")

    graph.add_edge("recruiter_agent", END)

    return graph.compile()


_compiled_graph = build_analysis_graph()


async def run_analysis_graph(initial_state: dict) -> dict:
    return await _compiled_graph.ainvoke(initial_state)
