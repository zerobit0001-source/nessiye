from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from config.pagination import StandardPagination
from .models import Notification


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        is_read = request.query_params.get('is_read')

        notifications = Notification.objects.filter(shop=request.user)

        if is_read == 'false':
            notifications = notifications.filter(is_read=False)
        elif is_read == 'true':
            notifications = notifications.filter(is_read=True)

        unread_count = Notification.objects.filter(shop=request.user, is_read=False).count()

        result = [
            {
                'id': n.id,
                'entity': n.entity,
                'entity_id': n.entity_id,
                'action': n.action,
                'title': n.title,
                'message': n.message,
                'is_read': n.is_read,
                'read_at': n.read_at,
                'created_at': n.created_at
            }
            for n in notifications
        ]

        paginator = StandardPagination()
        page = paginator.paginate_queryset(result, request)
        response = paginator.get_paginated_response(page)
        response.data['unread_count'] = unread_count
        return response


class NotificationUnreadCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        unread_count = Notification.objects.filter(
            shop=request.user, is_read=False
        ).count()

        return Response({'ok': True, 'unread_count': unread_count})


class NotificationReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            notification = Notification.objects.get(pk=pk, shop=request.user)
        except Notification.DoesNotExist:
            return Response({'ok': False, 'error': 'نوتیفیکیشن یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        notification.is_read = True
        notification.read_at = timezone.now()
        notification.save()

        return Response({'ok': True, 'message': 'خوانده شد'})


class NotificationReadAllView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        Notification.objects.filter(
            shop=request.user, is_read=False
        ).update(is_read=True, read_at=timezone.now())

        return Response({'ok': True, 'message': 'همه خوانده شدند'})