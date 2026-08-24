from .models import Notification


def create_notification(shop, entity, action, title, message, entity_id=None):
    Notification.objects.create(
        shop=shop,
        entity=entity,
        entity_id=entity_id,
        action=action,
        title=title,
        message=message
    )