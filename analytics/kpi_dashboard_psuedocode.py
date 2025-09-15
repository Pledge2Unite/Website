# kpi_dashboard_pseudocode.py
from datetime import date

def fetch_ga4(metric, start_days=30):
    return {
        "pledge_submit": 5812,
        "audit_complete": 9364,
        "cta_click_pledge": 4100,
        "cta_click_braver_angels": 1200,
        "event_rsvp": 420,
        "event_actual": 310
    }.get(metric, 0)

def fetch_db_counts():
    return {
        "pledges_total": 75432,
        "pledges_30d": 5812,
        "ba_optins_total": 15890,
        "ba_pairings_completed": 6670,
        "events_hosted": 940,
        "attendees_total": 17120,
        "conversations_reported": 22150
    }

def progress_to_goal(conversations_reported, target=1_000_000):
    pct = conversations_reported / target
    return round(pct * 100, 2)

def kpis_snapshot():
    ga = { k: fetch_ga4(k) for k in [
        "pledge_submit","audit_complete","cta_click_pledge",
        "cta_click_braver_angels","event_rsvp","event_actual"
    ]}
    db = fetch_db_counts()
    goal_pct = progress_to_goal(db["conversations_reported"])

    return {
        "pledges_total": db["pledges_total"],
        "pledges_30d": db["pledges_30d"],
        "quiz_completions_30d": ga["audit_complete"],
        "braver_angels_optins_total": db["ba_optins_total"],
        "braver_angels_pairings_completed": db["ba_pairings_completed"],
        "events_hosted_total": db["events_hosted"],
        "attendees_total": db["attendees_total"],
        "event_rsvp_30d": ga["event_rsvp"],
        "event_actual_30d": ga["event_actual"],
        "conversations_reported_total": db["conversations_reported"],
        "progress_to_1M_percent": goal_pct
    }

if __name__ == "__main__":
    from pprint import pprint
    pprint(kpis_snapshot())
