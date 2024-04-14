import React, { useState } from "react";
import styles from "./notifications-menu-overlay.scss";
import { useTranslation } from "react-i18next";
import { Toggle } from "@carbon/react";

const NotificationMenuOverlay: React.FC = () => {
  const { t } = useTranslation();
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  // Dummy data
  const notifications = [
    {
      id: 1,
      avatar: "AM",
      title: "Jaba Musa's Viral Load Test Results Now Available",
      description:
        "The test findings for Jaba Musa have been delivered from CPHL",
      time: "1 day ago",
      read: false,
    },
    {
      id: 2,
      avatar: "DM",
      title: "Daphine Mwanje's Viral Load Test Results Now Available",
      description:
        "The test findings for Daphine Mwanje have been delivered from CPHL",
      time: "1 week ago",
      read: true,
    },
    {
      id: 3,
      avatar: "NTM",
      title: "Nancy Tai Mpango's Viral Load Test Results Now Available",
      description:
        "The test findings for Nancy Tai Mpango have been delivered from CPHL",
      time: "1 week ago",
      read: false,
    },
  ];

  return (
    <div className={styles.notificationMenuOverlay}>
      <div className={styles.header}>
        <h2>{t("notifications", "Notifications")}</h2>
        <div className={styles.toggleContainer}>
          <Toggle
            labelText={t("onlyShowUnread", "Only show unread")}
            labelA={t("off", "Off")}
            labelB={t("on", "On")}
            size="sm"
            onToggle={(isToggled) => setShowOnlyUnread(isToggled)}
            defaultToggled={showOnlyUnread}
            id="toggle-1"
          />
        </div>
      </div>

      <ul className={styles.notificationList}>
        {notifications
          .filter((notification) =>
            showOnlyUnread ? !notification.read : true
          )
          .map((notification) => (
            <li
              key={notification.id}
              className={`${styles.notificationItem} ${
                !notification.read ? styles.unreadNotificationItem : ""
              }`}
            >
              <div className={styles.notificationIndicatorWrapper}>
                {!notification.read && (
                  <span className={styles.unreadIndicator}></span>
                )}
                <div className={styles.avatar}>{notification.avatar}</div>
              </div>
              <div className={styles.notificationContent}>
                <h5 className={styles.title}>{notification.title}</h5>
                <p className={styles.description}>{notification.description}</p>
                <span className={styles.time}>{notification.time}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NotificationMenuOverlay;
