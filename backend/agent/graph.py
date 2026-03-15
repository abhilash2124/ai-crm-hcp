from langgraph.graph import StateGraph, END
from agent.state import CRMState

from agent.tools import (
    log_interaction,
    edit_interaction,
    get_interaction_history,
    summarize_interaction,
    suggest_followup
)
ROUTES = {
    "edit_tool": ["change", "update", "edit", "modify"],
    "history_tool": ["history", "show", "list"],
    "summary_tool": ["summarize", "summary"],
    "followup_tool": ["follow", "next"],
}

def router_node(state: CRMState):

    text = state["text"].lower()

    for route, keywords in ROUTES.items():
        if any(word in text for word in keywords):
            state["route"] = route
            return state

    state["route"] = "log_tool"
    return state

def run_log(state: CRMState):

    result = log_interaction.invoke(state["text"])
    state["result"] = result
    return state


def run_edit(state: CRMState):

    result = edit_interaction.invoke(state["text"])
    state["result"] = result
    return state


def run_history(state: CRMState):

    result = get_interaction_history.invoke(state["text"])
    state["result"] = result
    return state


def run_summary(state: CRMState):

    result = summarize_interaction.invoke(state["text"])
    state["result"] = result
    return state


def run_followup(state: CRMState):

    result = suggest_followup.invoke(state["text"])
    state["result"] = result
    return state


graph = StateGraph(CRMState)

graph.add_node("router", router_node)

graph.add_node("log_tool", run_log)
graph.add_node("edit_tool", run_edit)
graph.add_node("history_tool", run_history)
graph.add_node("summary_tool", run_summary)
graph.add_node("followup_tool", run_followup)

graph.set_entry_point("router")


graph.add_conditional_edges(
    "router",
    lambda state: state["route"],
    {
        "log_tool": "log_tool",
        "edit_tool": "edit_tool",
        "history_tool": "history_tool",
        "summary_tool": "summary_tool",
        "followup_tool": "followup_tool"
    }
)

graph.add_edge("log_tool", END)
graph.add_edge("edit_tool", END)
graph.add_edge("history_tool", END)
graph.add_edge("summary_tool", END)
graph.add_edge("followup_tool", END)

app_graph = graph.compile()
