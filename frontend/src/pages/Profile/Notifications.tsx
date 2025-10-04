import { useState } from 'react';
import NotificationDisplay from '../../components/Profile/NotificationDisplay';
import apiInterceptor from '../../hooks/apiInterceptor';
import { api } from '../../hooks/api';
import { useQuery } from '@tanstack/react-query';
import ProfileNotFound from '../../components/Profile/ProfileNotFound';
import WithSuspense from '../../components/Loading/WithSuspense';
import Skeleton from '@mui/material/Skeleton';
import NotificationHeader from '../../components/Profile/NotificationHeader';
import { useToast } from '../../components/Toast/ToastContext';
import { useTranslation } from 'react-i18next';
import useInvalidateQuery from "../../hooks/useInvalidateQuery";

const Notifications = () => {
  const [filter, setFilter] = useState(undefined);
  const { showToast } = useToast();
  const { t } = useTranslation();
  const invalidateQuery = useInvalidateQuery();

  const fetchNotifications = async (isRead: any) => {
    const params: any = {};
    if (isRead !== undefined) {
      params.isRead = isRead;
    }
    try {
      const response = await apiInterceptor.get(api.user.notifications, { params });
      return response.data.data;
    }
    catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", filter],
    queryFn: () => fetchNotifications(filter),
    retry: false,
    refetchOnWindowFocus: false
  });

  const markNotificationAsRead = async (id: string) => {
    try {
      await apiInterceptor.put(api.user.markNotificationRead, { id });
      showToast("success", t("messages.markAsReadSuccess"));
      invalidateQuery(["notifications"]);
      invalidateQuery(["notificationCount"]);
    }
    catch (err) {
      console.error("Error marking a notification as read:", err);
    }
  }

  const markAllNotificationAsRead = async () => {
    try {
      await apiInterceptor.put(api.user.markAllNotificationRead);
      showToast("success", t("messages.markAllAsReadSuccess"));
      invalidateQuery(["notifications"]);
      invalidateQuery(["notificationCount"]);
    }
    catch (err) {
      console.error("Error marking a notification as read:", err);
    }
  }

  const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
    <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <WithSuspense
        data={notifications}
        isLoading={isLoading}
        fallback={renderSkeleton}
        empty={
          <>
            <NotificationHeader
              currentFilter={filter}
              onFilterChange={setFilter}
              onMarkAllAsRead={markAllNotificationAsRead}
            />
            <ProfileNotFound
              title={t("noNotifications")}
              message={t("noNotificationsMsg")}
              icon={<i className="bi bi-bell-fill" />}
            />
          </>
        }
      >
        <>
          <NotificationHeader
            currentFilter={filter}
            onFilterChange={setFilter}
            onMarkAllAsRead={markAllNotificationAsRead}
          />
          <NotificationDisplay
            notifications={notifications}
            onMarkAsRead={markNotificationAsRead}
          />
        </>
      </WithSuspense>
    </div>
  )
};

export default Notifications;