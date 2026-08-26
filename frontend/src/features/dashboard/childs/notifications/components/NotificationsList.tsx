import { NotificationType } from "@/types/types";
import NotificationCard from "./NotificationCard";

export default function NotificationsList({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  return (
    <div className="w-full flex flex-col">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
