import { useState } from 'react';
import NotificationDisplay from '../../components/Profile/NotificationDisplay';
import apiInterceptor from '../../hooks/apiInterceptor';
import { api } from '../../hooks/api';
import ProfileNotFound from '../Error/NotFound';
import WithSuspense from '../../components/Loading/WithSuspense';
import Skeleton from '@mui/material/Skeleton';
import NotificationHeader from '../../components/Profile/NotificationHeader';
import { useToast } from '../../components/Toast/ToastContext';
import { useTranslation } from 'react-i18next';
import useInvalidateQuery from "../../hooks/useInvalidateQuery";
import Pagination from '../../components/Pagination';
import useFetch from '../../hooks/useFetch';

const Notifications = () => {
  const [filter, setFilter] = useState(undefined);
  const { showToast } = useToast();
  const { t } = useTranslation();
  const invalidateQuery = useInvalidateQuery();

  const {
    data: notifications,
    currentPage,
    totalPages,
    isLoading,
    fetchDataHandler,
    page,
    limit,
  } = useFetch({
    url: api.user.notifications,
    queryName: "notifications",
    pageNo: 1,
    pageLimit: 5,
    filters: { isRead: filter }
  });

  const markNotificationAsRead = async (id: string) => {
    try {
      await apiInterceptor.put(api.user.markNotificationRead, { id });
      showToast("success", t("messages.markAsReadSuccess"));
      invalidateQuery(["notifications"]);
      invalidateQuery(["notificationCount"]);
    } catch (err) {
      console.error("Error marking a notification as read:", err);
    }
  }

  const markAllNotificationAsRead = async () => {
    try {
      await apiInterceptor.put(api.user.markAllNotificationRead);
      showToast("success", t("messages.markAllAsReadSuccess"));
      invalidateQuery(["notifications"]);
      invalidateQuery(["notificationCount"]);
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  }

  const renderSkeleton = (
    <>
      <Skeleton variant="text" width={"100%"} />
      <Skeleton variant="rectangular" width={"100%"} height={40} />
    </>
  );

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
    fetchDataHandler(1, limit, { isRead: newFilter });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <NotificationHeader
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        onMarkAllAsRead={markAllNotificationAsRead}
      />

      <WithSuspense
        data={notifications}
        isLoading={isLoading}
        fallback={renderSkeleton}
        empty={
          <ProfileNotFound
            title={t("noNotifications")}
            message={t("noNotificationsMsg")}
            icon={<i className="bi bi-bell-fill" />}
          />
        }
      >
        <NotificationDisplay
          notifications={notifications}
          onMarkAsRead={markNotificationAsRead}
        />
      </WithSuspense>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          page={page}
          limit={limit}
          handlePageChange={fetchDataHandler}
        />
      )}
    </div>
  )
};

export default Notifications;