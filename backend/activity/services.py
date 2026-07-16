from .models import Activity


def log_activity(shop, action, entity, title, object_id=None, metadata=None):
    Activity.objects.create(
        shop=shop,
        action=action,
        entity=entity,
        title=title,
        object_id=object_id,
        metadata=metadata
    )