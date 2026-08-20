// src/data/mockData.js

// Temporary mock data.
// Later these values will come from the College ERP + backend APIs.

export const studentData = {
  id: "IT2026001",
  name: "Student Name",
  branch: "Information Technology",
  email: "student@college.edu",

  transport: {
    feeStatus: "PAID",
    feeValidTill: "31 May 2027",

    assignedBus: "BUS-01",
    route: "Route A → College",
    assignedStop: "Main Gate",

    driver: {
      name: "Rahul Sharma",
      phone: "+91 90000 00000",
    },

    conductor: {
      name: "Vikas Kumar",
      phone: "+91 91111 11111",
},

    busStatus: "Running",
    currentLocation: "On Route",

    currentSpeed: 32,
    estimatedArrival: 15,
    nextStop: "Main Gate",

    latitude: 23.22314,
    longitude: 72.70812,

    direction: "E",

    liveTracking: true,
  },
};


// Bus information
export const busData = {
  busNumber: "BUS-01",
  route: "Route A → College",
  driver: "Rahul Sharma",
  status: "Running",
  speed: 32,

  location: {
    latitude: 23.22314,
    longitude: 72.70812,
  },

  nextStop: "Main Gate",
  estimatedArrival: 15,
};


// Bus stops
export const busStops = [
  {
    id: 1,
    name: "Central Depot",
    status: "completed",
  },
  {
    id: 2,
    name: "Civil Lines",
    status: "completed",
  },
  {
    id: 3,
    name: "Main Gate",
    status: "current",
  },
  {
    id: 4,
    name: "Gandhi Gram",
    status: "upcoming",
  },
  {
    id: 5,
    name: "College Campus",
    status: "upcoming",
  },
];


// Live tracking history
export const trackingHistory = [
  {
    time: "10:32 PM",
    bus: "BUS-01",
    latitude: 23.22314,
    longitude: 72.70812,
    speed: 32,
    direction: "E",
  },
  {
    time: "10:31 PM",
    bus: "BUS-01",
    latitude: 23.22475,
    longitude: 72.69765,
    speed: 32,
    direction: "E",
  },
  {
    time: "10:30 PM",
    bus: "BUS-01",
    latitude: 23.22554,
    longitude: 72.69498,
    speed: 30,
    direction: "E",
  },
  {
    time: "10:29 PM",
    bus: "BUS-01",
    latitude: 23.22630,
    longitude: 72.69239,
    speed: 34,
    direction: "E",
  },
];


// Notifications
export const notifications = [
  {
    id: 1,
    title: "Bus is on the way",
    message: "BUS-01 is currently running on Route A.",
    time: "10 minutes ago",
    type: "bus",
  },
  {
    id: 2,
    title: "Bus arriving soon",
    message: "Your bus is approximately 15 minutes away.",
    time: "5 minutes ago",
    type: "arrival",
  },
  {
    id: 3,
    title: "Transport Fee",
    message: "Your transport fee is paid and active.",
    time: "Today",
    type: "fee",
  },
];