// src/services/simulation.js

// ======================================================
// SIMULATED BUS / GPS / TRIP SERVICE
// ======================================================

// Generate a simulated GPS location
export function generateGPSLocation(previousLocation) {
  const latitude =
    previousLocation.latitude + (Math.random() - 0.5) * 0.001;

  const longitude =
    previousLocation.longitude + (Math.random() - 0.5) * 0.001;

  const speed = Math.floor(20 + Math.random() * 25);

  let updateInterval;

  if (speed <= 5) {
    updateInterval = 30000;
  } else if (speed <= 50) {
    updateInterval = 10000;
  } else {
    updateInterval = 5000;
  }

  return {
    latitude,
    longitude,
    speed,
    direction: getRandomDirection(),
    timestamp: new Date().toISOString(),
    updateInterval,
  };
}


// Generate random direction
export function getRandomDirection() {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return directions[
    Math.floor(Math.random() * directions.length)
  ];
}


// Determine bus status from speed
export function getBusStatus(speed) {
  if (speed > 10) {
    return "In Transit";
  }

  return "Stopped";
}


// Automatic trip detection
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


// Automatic trip end
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


// Simulated geofence detection
export function checkGeofence(latitude, longitude) {
  // Prototype coordinates
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


// Simple distance calculation
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
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}


// Convert degrees to radians
function toRadians(value) {
  return (value * Math.PI) / 180;
}


// Simulated ETA calculation
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


// Simulated AI ETA prediction
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
    ) || historicalTime;

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
    normalETA +
    weatherAdjustment;

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


// Simulated delay prediction
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


// Simulated adaptive GPS interval
export function getGPSUpdateInterval(speed) {
  if (speed <= 5) {
    return 30000;
  }

  if (speed <= 50) {
    return 10000;
  }

  return 5000;
}


// Simulated offline data queue
export function createOfflineRecord(data) {
  return {
    ...data,
    synced: false,
    storedAt: new Date().toISOString(),
  };
}


// Simulated synchronization
export function synchronizeOfflineData(records) {
  return records.map((record) => ({
    ...record,
    synced: true,
    syncedAt: new Date().toISOString(),
  }));
}


// Simulated bus replacement event
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

    message: `Your bus has been changed from ${previousBus} to ${newBus}.`,

    timestamp: new Date().toISOString(),
  };
}


// Simulated college arrival event
export function createCollegeArrivalEvent({
  busNumber,
  arrivalTime,
}) {
  return {
    type: "COLLEGE_ARRIVAL",

    busNumber,

    arrivalTime,

    message: `${busNumber} reached college at ${arrivalTime}.`,

    timestamp: new Date().toISOString(),
  };
}


// Simulated bus departure event
export function createBusDepartureEvent({
  busNumber,
  departureTime,
}) {
  return {
    type: "BUS_DEPARTURE",

    busNumber,

    departureTime,

    message: `${busNumber} has left the college.`,

    timestamp: new Date().toISOString(),
  };
}