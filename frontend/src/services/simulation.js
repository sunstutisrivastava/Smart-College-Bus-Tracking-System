// src/services/simulation.js

// ======================================================
// SMART COLLEGE BUS TRACKING SYSTEM
// SIMULATED BUS / GPS / TRIP SERVICE
// ======================================================


// ======================================================
// 1. SIMULATED GPS LOCATION
// ======================================================

export function generateGPSLocation(previousLocation) {
  const latitude =
    previousLocation.latitude +
    (Math.random() - 0.5) * 0.001;

  const longitude =
    previousLocation.longitude +
    (Math.random() - 0.5) * 0.001;

  const speed = Math.floor(20 + Math.random() * 25);

  const updateInterval = getGPSUpdateInterval(speed);

  return {
    latitude,
    longitude,
    speed,
    direction: getRandomDirection(),
    timestamp: new Date().toISOString(),
    updateInterval,
  };
}


// ======================================================
// 2. RANDOM DIRECTION
// ======================================================

export function getRandomDirection() {
  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];

  return directions[
    Math.floor(Math.random() * directions.length)
  ];
}


// ======================================================
// 3. BUS STATUS
// ======================================================

export function getBusStatus(speed) {
  if (speed > 10) {
    return "In Transit";
  }

  return "Stopped";
}


// ======================================================
// 4. AUTOMATIC TRIP START
// ======================================================

export function detectTripStart({
  speed,
  scheduledTimePassed,
  depotGeofence,
}) {
  if (
    speed > 10 &&
    scheduledTimePassed &&
    depotGeofence
  ) {
    return {
      started: true,
      message: "Trip Started Automatically",
    };
  }

  return {
    started: false,
    message: "Trip Not Started",
  };
}


// ======================================================
// 5. AUTOMATIC TRIP END
// ======================================================

export function detectTripEnd({
  collegeGeofence,
  depotGeofence,
  stoppedDuration,
}) {
  if (collegeGeofence) {
    return {
      ended: true,
      reason: "College Geofence Reached",
    };
  }

  if (depotGeofence) {
    return {
      ended: true,
      reason: "Depot Geofence Reached",
    };
  }

  if (stoppedDuration >= 10) {
    return {
      ended: true,
      reason: "Bus Remained Stopped",
    };
  }

  return {
    ended: false,
    reason: null,
  };
}


// ======================================================
// 6. GEOFENCE DETECTION
// ======================================================

export function checkGeofence(latitude, longitude) {

  const college = {
    latitude: 23.2300,
    longitude: 72.7200,
  };

  const depot = {
    latitude: 23.2000,
    longitude: 72.6800,
  };

  const distanceToCollege = calculateDistance(
    latitude,
    longitude,
    college.latitude,
    college.longitude
  );

  const distanceToDepot = calculateDistance(
    latitude,
    longitude,
    depot.latitude,
    depot.longitude
  );

  return {
    college: distanceToCollege < 0.5,
    depot: distanceToDepot < 0.5,
    distanceToCollege,
    distanceToDepot,
  };
}


// ======================================================
// 7. DISTANCE CALCULATION
// ======================================================

export function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const earthRadius = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}


// ======================================================
// 8. DEGREE → RADIAN
// ======================================================

function toRadians(value) {
  return (value * Math.PI) / 180;
}


// ======================================================
// 9. ETA CALCULATION
// ======================================================

export function calculateETA(
  distance,
  speed,
  traffic = "Moderate"
) {
  if (!speed || speed <= 0) {
    return null;
  }

  let trafficMultiplier = 1;

  if (traffic === "Light") {
    trafficMultiplier = 1;
  }

  if (traffic === "Moderate") {
    trafficMultiplier = 1.2;
  }

  if (traffic === "Heavy") {
    trafficMultiplier = 1.5;
  }

  const timeInHours =
    (distance / speed) * trafficMultiplier;

  const timeInMinutes =
    timeInHours * 60;

  return Math.max(
    1,
    Math.round(timeInMinutes)
  );
}


// ======================================================
// 10. AI ETA PREDICTION
// ======================================================

export function predictAIETA({
  distance,
  speed,
  traffic,
  weather,
  historicalTime,
}) {
  const normalETA =
    calculateETA(
      distance,
      speed,
      traffic
    ) || historicalTime || 0;

  let weatherAdjustment = 0;

  if (weather === "Light Rain") {
    weatherAdjustment = 2;
  }

  if (weather === "Heavy Rain") {
    weatherAdjustment = 5;
  }

  if (weather === "Fog") {
    weatherAdjustment = 4;
  }

  const predictedETA =
    normalETA + weatherAdjustment;

  return {
    eta: predictedETA,
    confidence: "Simulated AI Prediction",

    factors: {
      speed,
      traffic,
      weather,
      historicalTime,
      distance,
    },
  };
}


// ======================================================
// 11. DELAY PREDICTION
// ======================================================

export function predictDelay({
  currentSpeed,
  traffic,
  weather,
  historicalDelay,
}) {
  let delay = historicalDelay || 0;

  if (traffic === "Moderate") {
    delay += 3;
  }

  if (traffic === "Heavy") {
    delay += 6;
  }

  if (weather === "Light Rain") {
    delay += 2;
  }

  if (weather === "Heavy Rain") {
    delay += 5;
  }

  if (currentSpeed < 20) {
    delay += 3;
  }

  let status = "On Time";

  if (delay >= 5 && delay < 10) {
    status = "Minor Delay";
  }

  if (delay >= 10) {
    status = "Major Delay";
  }

  return {
    delay,
    status,
  };
}


// ======================================================
// 12. GPS UPDATE INTERVAL
// ======================================================

export function getGPSUpdateInterval(speed) {
  if (speed <= 5) {
    return 30000;
  }

  if (speed <= 50) {
    return 10000;
  }

  return 5000;
}


// ======================================================
// 13. TRACKING HISTORY
// ======================================================
//
// IMPORTANT:
// Only last 24 hours of GPS tracking data is kept.
// Older records are automatically removed.
//

const HISTORY_LIMIT_HOURS = 24;

const HISTORY_LIMIT_MS =
  HISTORY_LIMIT_HOURS *
  60 *
  60 *
  1000;


// Remove records older than 24 hours
export function cleanTrackingHistory(records = []) {
  const now = Date.now();

  return records.filter((record) => {

    if (!record.timestamp) {
      return false;
    }

    const recordTime =
      new Date(record.timestamp).getTime();

    if (Number.isNaN(recordTime)) {
      return false;
    }

    return (
      now - recordTime <= HISTORY_LIMIT_MS
    );
  });
}


// Add new GPS record to history
export function addTrackingHistoryRecord(
  records = [],
  gpsData
) {
  const newRecord = {
    ...gpsData,

    timestamp:
      gpsData.timestamp ||
      new Date().toISOString(),
  };

  const updatedRecords = [
    newRecord,
    ...records,
  ];

  // Automatically remove records older than 24 hours
  return cleanTrackingHistory(
    updatedRecords
  );
}


// Get only last 24 hours history
export function getTrackingHistory(
  records = []
) {
  return cleanTrackingHistory(records);
}


// ======================================================
// 14. LOCAL STORAGE TRACKING HISTORY
// ======================================================
//
// This allows history to remain after page refresh.
// Still, only the last 24 hours are retained.
//

const TRACKING_HISTORY_KEY =
  "smartbus_tracking_history";


export function saveTrackingHistory(
  records = []
) {
  const cleanRecords =
    cleanTrackingHistory(records);

  localStorage.setItem(
    TRACKING_HISTORY_KEY,
    JSON.stringify(cleanRecords)
  );

  return cleanRecords;
}


export function loadTrackingHistory() {

  const storedHistory =
    localStorage.getItem(
      TRACKING_HISTORY_KEY
    );

  if (!storedHistory) {
    return [];
  }

  try {

    const records =
      JSON.parse(storedHistory);

    // Remove anything older than 24 hours
    const cleanRecords =
      cleanTrackingHistory(records);

    // Save cleaned version again
    localStorage.setItem(
      TRACKING_HISTORY_KEY,
      JSON.stringify(cleanRecords)
    );

    return cleanRecords;

  } catch (error) {

    console.error(
      "Unable to load tracking history:",
      error
    );

    return [];
  }
}


// Clear tracking history manually
export function clearTrackingHistory() {

  localStorage.removeItem(
    TRACKING_HISTORY_KEY
  );

  return [];
}


// ======================================================
// 15. OFFLINE DATA QUEUE
// ======================================================

export function createOfflineRecord(data) {
  return {
    ...data,

    synced: false,

    storedAt:
      new Date().toISOString(),
  };
}


// ======================================================
// 16. SYNCHRONIZE OFFLINE DATA
// ======================================================

export function synchronizeOfflineData(records) {

  return records.map((record) => ({
    ...record,

    synced: true,

    syncedAt:
      new Date().toISOString(),
  }));
}


// ======================================================
// 17. BUS REPLACEMENT EVENT
// ======================================================

export function createBusReplacementEvent({
  previousBus,
  newBus,
  driver,
  conductor,
  route,
}) {
  return {

    type: "BUS_REPLACEMENT",

    previousBus,

    newBus,

    driver,

    conductor,

    route,

    message:
      `Your bus has been changed from ${previousBus} to ${newBus}.`,

    timestamp:
      new Date().toISOString(),
  };
}


// ======================================================
// 18. COLLEGE ARRIVAL EVENT
// ======================================================

export function createCollegeArrivalEvent({
  busNumber,
  arrivalTime,
}) {
  return {

    type: "COLLEGE_ARRIVAL",

    busNumber,

    arrivalTime,

    message:
      `${busNumber} reached college at ${arrivalTime}.`,

    timestamp:
      new Date().toISOString(),
  };
}


// ======================================================
// 19. BUS DEPARTURE EVENT
// ======================================================

export function createBusDepartureEvent({
  busNumber,
  departureTime,
}) {
  return {

    type: "BUS_DEPARTURE",

    busNumber,

    departureTime,

    message:
      `${busNumber} has left the college.`,

    timestamp:
      new Date().toISOString(),
  };
}
// ======================================================
// DAILY HISTORY CLEANUP
// ======================================================

export function cleanupDailyHistory() {
  const today = new Date().toISOString().split("T")[0];

  const lastHistoryDate =
    localStorage.getItem("busHistoryDate");

  // New day -> delete previous day's history
  if (
    lastHistoryDate &&
    lastHistoryDate !== today
  ) {
    localStorage.removeItem("busTrackingHistory");
  }

  localStorage.setItem(
    "busHistoryDate",
    today
  );
}