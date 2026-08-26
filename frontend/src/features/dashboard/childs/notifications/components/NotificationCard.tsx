"use client";
import { NotificationType } from "@/types/types";
import {
  Inventory2Rounded,
  PaymentsRounded,
  PersonRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import { useReadMessageByIdMutation } from "../../dashboard/api/ApiDashboard";
import { toast } from "react-toastify";
import { Card, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  notification: NotificationType;
};

const entityIcons = {
  customers: PersonRounded,
  debts: ReceiptLongRounded,
  payments: PaymentsRounded,
  products: Inventory2Rounded,
} as const;

export default function NotificationCard({ notification }: Props) {
  const Icon = entityIcons[notification.entity] ?? ReceiptLongRounded;

  const [readNotifecation, { data, isLoading, isError }] =
    useReadMessageByIdMutation();

  const router = useRouter();

  const handleReadNotification = async (notification: NotificationType) => {
    const loadingToast = toast.loading("در حال خواندن اعلان...");
    try {
      await readNotifecation(notification.id).unwrap();

      toast.update(loadingToast, {
        render: "اعلان با موفقیت خوانده شد",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      if (notification.entity !== "payments") {
        router.push(`${notification.entity}/${notification.entity_id}`);
      }
    } catch (error) {
      console.error("Failed to read notification:", error);

      toast.update(loadingToast, {
        render: "خواندن اعلان ناموفق بود",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Card
      elevation={1}
      className={`
        relative
        w-full
        flex
        items-center
        gap-4
        px-5
        py-4
        border-b
        border-slate-200
        transition-colors
        duration-200
        cursor-pointer
        rounded-none!
      `}
      onClick={() =>
        notification.is_read ? null : handleReadNotification(notification)
      }
    >
      {/* Unread indicator */}
      {!notification.is_read && (
        <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-emerald-500" />
      )}

      {/* Icon */}
      <div
        className={`
          flex
          items-center
          justify-center
          shrink-0
          w-10
          h-10
          rounded-xl

          ${
            notification.is_read
              ? "bg-slate-100 text-slate-500"
              : "bg-emerald-50 text-emerald-600"
          }
        `}
      >
        <Icon sx={{ fontSize: 20 }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          {/*<h3
            className={`
              text-sm
              ${
                notification.is_read
                  ? "font-medium text-slate-700"
                  : "font-bold text-slate-900"
              }
            `}
          >
            {notification.title}
          </h3>*/}
          <Typography variant="body1">{notification.title}</Typography>
          <span className="shrink-0 text-[11px] text-slate-400">
            {formatNotificationDate(notification.created_at)}
          </span>
        </div>

        <p className="mt-1 text-xs leading-6 text-slate-500">
          {notification.message}
        </p>

        {/* Action */}
        {!notification.is_read && (
          <button
            type="button"
            className="
              mt-1.5
              text-xs
              font-semibold
              text-emerald-600
              hover:text-emerald-700
              transition-colors
            "
          >
            مشاهده نسیه ←
          </button>
        )}
      </div>
    </Card>
  );
}

function formatNotificationDate(date: string) {
  const notificationDate = new Date(date);
  const now = new Date();

  const diff = now.getTime() - notificationDate.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (minutes < 1) return "همین الان";

  if (minutes < 60) {
    return `${minutes} دقیقه پیش`;
  }

  if (hours < 24) {
    return `${hours} ساعت پیش`;
  }

  return notificationDate.toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
  });
}
