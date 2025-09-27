import { useState } from 'react';

type Notification = {
  id: number;
  title: string;
  message: string;
  datetime: string; // ISO string or formatted string
  read: boolean;
};

const sampleNotifications: Notification[] = [
  {
    id: 1,
    title: 'Ride Confirmed',
    message: 'Your ride from New York to Boston is confirmed.',
    datetime: '2025-09-23T10:30:00Z',
    read: false,
  },
  {
    id: 2,
    title: 'New Message from Driver',
    message: 'John has sent you a message.',
    datetime: '2025-09-22T15:45:00Z',
    read: true,
  },
  {
    id: 3,
    title: 'Password Changed',
    message: 'Your password was changed successfully.',
    datetime: '2025-09-20T08:15:00Z',
    read: true,
  },
];

const Notifications = () => {
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'read') return n.read;
    if (filter === 'unread') return !n.read;
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>

      {/* Filters + Mark All */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <div className="flex space-x-4 justify-center sm:justify-start">
          {['all', 'read', 'unread'].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key as 'all' | 'read' | 'unread')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={markAllAsRead}
          disabled={notifications.every((n) => n.read)}
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            notifications.every((n) => n.read)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          aria-disabled={notifications.every((n) => n.read)}
        >
          Mark All as Read
        </button>
      </div>

      {/* Notification Cards */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications to display.</p>
        )}

        {filteredNotifications.map(({ id, title, message, datetime, read }) => (
          <div
            key={id}
            className={`border border-gray-200 rounded-lg p-4 shadow-sm transition flex items-start justify-between ${
              read ? 'bg-white' : 'bg-blue-50 border-blue-300'
            }`}
          >
            <div className="flex flex-col max-w-[90%]">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-700 mb-2">{message}</p>
              <time
                dateTime={datetime}
                className="text-xs text-gray-500"
                title={new Date(datetime).toString()}
              >
                {formatDate(datetime)}
              </time>
            </div>

            {/* Mark as read icon button */}
            <button
              onClick={() => markAsRead(id)}
              disabled={read}
              aria-label={read ? `Notification "${title}" is read` : `Mark notification "${title}" as read`}
              className={`ml-4 mt-1 p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                read
                  ? 'text-green-600 cursor-default'
                  : 'text-gray-400 hover:text-green-600 cursor-pointer'
              }`}
              title={read ? 'Read' : 'Mark as read'}
            >
              {read ? (
                <i className="bi bi-check-circle-fill text-2xl"></i>
              ) : (
                <i className="bi bi-circle text-2xl"></i>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
