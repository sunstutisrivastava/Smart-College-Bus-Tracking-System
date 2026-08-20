import { createContext, useContext, useEffect, useState } from "react";
import { studentData, busData, notifications } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [student, setStudent] = useState(studentData);
  const [bus, setBus] = useState(busData);
  const [notificationList, setNotificationList] = useState(notifications);

  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulated live bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBus((previousBus) => {
        const newSpeed = Math.floor(25 + Math.random() * 15);

        const newLatitude =
          previousBus.location.latitude + (Math.random() - 0.5) * 0.001;

        const newLongitude =
          previousBus.location.longitude + (Math.random() - 0.5) * 0.001;

        return {
          ...previousBus,
          status: newSpeed > 10 ? "Running" : "Stopped",
          speed: newSpeed,
          location: {
            latitude: newLatitude,
            longitude: newLongitude,
          },
        };
      });

      setStudent((previousStudent) => ({
        ...previousStudent,
        transport: {
          ...previousStudent.transport,
          currentSpeed: Math.floor(25 + Math.random() * 15),
          currentLocation: "On Route",
          busStatus: "Running",
        },
      }));

      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulated online/offline state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Admin can replace student's bus later
  const changeStudentBus = ({
    busNumber,
    route,
    driver,
    conductor,
    eta,
  }) => {
    setStudent((previousStudent) => ({
      ...previousStudent,

      transport: {
        ...previousStudent.transport,

        assignedBus: busNumber,
        route: route || previousStudent.transport.route,

        driver: {
          name: driver?.name || previousStudent.transport.driver.name,
          phone: driver?.phone || previousStudent.transport.driver.phone,
        },

        conductor: {
          name:
            conductor?.name ||
            previousStudent.transport.conductor?.name ||
            "Not Assigned",

          phone:
            conductor?.phone ||
            previousStudent.transport.conductor?.phone ||
            "Not Available",
        },

        estimatedArrival:
          eta ?? previousStudent.transport.estimatedArrival,
      },
    }));

    setBus((previousBus) => ({
      ...previousBus,

      busNumber,
      route: route || previousBus.route,

      driver:
        driver?.name ||
        previousBus.driver,

      estimatedArrival:
        eta ?? previousBus.estimatedArrival,
    }));

    setNotificationList((previousNotifications) => [
      {
        id: Date.now(),

        title: "Bus Updated",

        message: `Your bus has been changed to ${busNumber}.`,

        time: "Just now",

        type: "bus",
      },

      ...previousNotifications,
    ]);

    setLastUpdated(new Date());
  };

  // Add notification
  const addNotification = (notification) => {
    setNotificationList((previousNotifications) => [
      {
        id: Date.now(),
        time: "Just now",
        ...notification,
      },
      ...previousNotifications,
    ]);
  };

  const value = {
    student,
    setStudent,

    bus,
    setBus,

    notifications: notificationList,

    addNotification,

    changeStudentBus,

    isOnline,

    lastUpdated,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}