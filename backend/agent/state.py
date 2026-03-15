from typing import TypedDict, Optional, Dict

class CRMState(TypedDict):
    text: str
    route: Optional[str]
    result: Optional[Dict]