from django.core.cache import cache


DASHBOARD_TIMEOUT = 60 * 5
REPORT_TIMEOUT = 60 * 15
PRODUCTS_TIMEOUT = 60 * 2
CATEGORIES_TIMEOUT = 60 * 60


# key generators
def dashboard_key(user_id):
    return f"dashboard_{user_id}"

def products_key(user_id, **params):
    return f"products_{user_id}_{params}"

def categories_key():
    return "categories_all"

def report_summary_key(user_id, from_date, to_date):
    return f"report_summary_{user_id}_{from_date}_{to_date}"

def report_charts_key(user_id, from_date, to_date):
    return f"report_charts_{user_id}_{from_date}_{to_date}"

def report_customers_key(user_id, from_date, to_date):
    return f"report_customers_{user_id}_{from_date}_{to_date}"

def report_products_key(user_id, from_date, to_date):
    return f"report_products_{user_id}_{from_date}_{to_date}"


def invalidate_dashboard(user_id):
    cache.delete(dashboard_key(user_id))

def invalidate_products(user_id):
    cache.delete_pattern(f"products_{user_id}_*")

def invalidate_reports(user_id):
    cache.delete_pattern(f"report_*_{user_id}_*")

def invalidate_all(user_id):
    invalidate_dashboard(user_id)
    invalidate_products(user_id)
    invalidate_reports(user_id)