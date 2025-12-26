import { createContext, useContext, useState } from "react";

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
