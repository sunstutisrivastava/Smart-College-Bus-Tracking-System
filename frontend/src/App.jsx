import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import "./App.css";
import StudentDashboard from "./pages/student/StudentDashboard";

function Home() {
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">🚌</div>
          SmartBus
        </div>

        <div className="nav-badge">
          College Transportation System
        </div>
      </nav>

      <section className="hero">

        <div className="hero-content">

          <div className="small-title">
            🛰️ SMART COLLEGE TRANSPORTATION
          </div>

          <h1>
            Track Your Bus.
            <br />
            <span>Travel Smarter.</span>
          </h1>

          <p>
            A modern college bus tracking platform that helps students
            track buses in real-time while administrators manage routes,
            drivers, trips and transportation operations from one place.
          </p>

          <div className="button-group">

            <Link to="/student" className="btn btn-primary">
              🎓 Student Portal
            </Link>

            <Link to="/admin" className="btn btn-secondary">
              🛡️ Admin Portal
            </Link>

          </div>

        </div>

        <div className="bus-section">

          <div className="bus-card">

            <div className="bus-icon">
              🚌
            </div>

            <h2>Real-Time Bus Tracking</h2>

            <p>
              Know where your college bus is and when it will arrive.
            </p>

            <div className="live-status">
              <span className="status-dot"></span>
              Live Tracking System
            </div>

          </div>

        </div>

      </section>

      <section className="features">

        <div className="features-title">
          <h2>Everything in One Place</h2>
          <p>Smart features for students and administrators</p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Live Tracking</h3>
            <p>
              Track active college buses and view their current status.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Route Management</h3>
            <p>
              Manage bus routes, stops, schedules and trip information.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Notifications</h3>
            <p>
              Receive important updates about delays, arrivals and trips.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Dashboard</h3>
            <p>
              Monitor buses, drivers, students and transportation activity.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="app">
      <h1 style={{ padding: "50px" }}>
        🛡️ Admin Dashboard
      </h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;