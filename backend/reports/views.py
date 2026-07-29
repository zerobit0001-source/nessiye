from django.utils import timezone
from datetime import timedelta

def get_period_filter(period):
    now = timezone.now()
    if period == 'week':
        return now - timedelta(days=7)
    elif period == 'month':
        return now - timedelta(days=30)
    elif period == 'three_months':
        return now - timedelta(days=90)
    elif period == 'year':
        return now - timedelta(days=365)
    return now - timedelta(days=30)