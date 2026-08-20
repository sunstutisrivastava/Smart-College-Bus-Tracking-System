import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      {/* Header */}
      <header className="student-header">
        <div>
          <div className="brand">
            🚌 <span>SmartBus</span>
          </div>
          <p>Student Transportation Portal</p>
        </div>

        <div className="student-welcome">
          <span>👋</span>
          <div>
            <strong>Welcome, Student</strong>
            <small>College ID: IT2026001</small>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">

        {/* Page Title */}
        <div className="page-title">
          <div>
            <h1>Student Dashboard</h1>
            <p>Track your college bus and transportation information</p>
          </div>

          <div className="live-badge">
            <span></span>
            LIVE SYSTEM
          </div>
        </div>

        {/* Summary Cards */}
        <section className="summary-grid">

          <div className="summary-card blue">
            <div className="card-icon">🚌</div>
            <div>
              <span>MY BUS</span>
              <h2>BUS-01</h2>
              <p>Route A → College</p>
            </div>
          </div>

          <div className="summary-card green">
            <div className="card-icon">🟢</div>
            <div>
              <span>BUS STATUS</span>
              <h2>Running</h2>
              <p>Currently on route</p>
            </div>
          </div>

          <div className="summary-card purple">
            <div className="card-icon">⏱️</div>
            <div>
              <span>ESTIMATED ARRIVAL</span>
              <h2>15 min</h2>
              <p>To your assigned stop</p>
            </div>
          </div>

          <div className="summary-card orange">
            <div className="card-icon">💳</div>
            <div>
              <span>TRANSPORT FEE</span>
              <h2>PAID</h2>
              <p>Valid till May 2027</p>
            </div>
          </div>

        </section>

        {/* Two Column Section */}
        <section className="main-grid">

          {/* Live Tracking */}
          <div className="dashboard-card tracking-card">

            <div className="card-header">
              <div>
                <h2>📍 Live Bus Tracking</h2>
                <p>Real-time location of your assigned bus</p>
              </div>

              <span className="status-pill">
                <span></span>
                In Transit
              </span>
            </div>

            {/* Map Area */}
            <div className="map-area">

              <div className="map-grid"></div>

              <div className="route-line"></div>

              <div className="location depot">
                <span>●</span>
                <label>Depot</label>
              </div>

              <div className="location stop-one">
                <span>●</span>
                <label>Main Gate</label>
              </div>

              <div className="location college">
                <span>🎓</span>
                <label>College</label>
              </div>

              <div className="bus-marker">
                🚌
                <strong>BUS-01</strong>
              </div>

            </div>

            {/* Location Details */}
            <div className="location-details">

              <div>
                <span>Current Location</span>
                <strong>On Route</strong>
              </div>

              <div>
                <span>Speed</span>
                <strong>32 km/h</strong>
              </div>

              <div>
                <span>Direction</span>
                <strong>East →</strong>
              </div>

              <div>
                <span>GPS</span>
                <strong className="gps-connected">● Connected</strong>
              </div>

            </div>

          </div>

          {/* Student Profile */}
          <div className="dashboard-card profile-card">

            <div className="card-header">
              <div>
                <h2>👤 My Transport Profile</h2>
                <p>Information synced from College ERP</p>
              </div>
            </div>

            <div className="profile-info">

              <div className="profile-row">
                <span>Name</span>
                <strong>Student Name</strong>
              </div>

              <div className="profile-row">
                <span>College ID</span>
                <strong>IT2026001</strong>
              </div>

              <div className="profile-row">
                <span>Branch</span>
                <strong>Information Technology</strong>
              </div>

              <div className="profile-row">
                <span>Email</span>
                <strong>student@college.edu</strong>
              </div>

              <div className="profile-row">
                <span>Assigned Bus</span>
                <strong>BUS-01</strong>
              </div>

              <div className="profile-row">
                <span>Assigned Stop</span>
                <strong>Main Gate</strong>
              </div>

            </div>

          </div>

        </section>

        {/* AI ETA */}
        <section className="dashboard-card eta-card">

          <div className="card-header">
            <div>
              <h2>🤖 AI-Powered ETA Prediction</h2>
              <p>
                Estimated arrival based on speed, traffic, weather and route
                distance
              </p>
            </div>

            <span className="ai-badge">AI SIMULATED</span>
          </div>

          <div className="eta-grid">

            <div className="eta-box">
              <span>ETA</span>
              <strong>15 min</strong>
            </div>

            <div className="eta-box">
              <span>DISTANCE</span>
              <strong>6.8 km</strong>
            </div>

            <div className="eta-box">
              <span>SPEED</span>
              <strong>32 km/h</strong>
            </div>

            <div className="eta-box">
              <span>EXPECTED ARRIVAL</span>
              <strong>10:55 AM</strong>
            </div>

          </div>

          <div className="conditions">

            <span className="condition traffic">
              🚦 Traffic: Moderate
            </span>

            <span className="condition weather">
              🌦️ Weather: Clear
            </span>

            <span className="condition next-stop">
              📍 Next Stop: Main Gate
            </span>

            <span className="condition gps">
              🟢 GPS Connected
            </span>

          </div>

          <div className="ai-message">
            💡 <strong>AI Prediction:</strong> Bus is currently running on
            schedule with no major delay expected.
          </div>

        </section>

        {/* Bus Information + Driver */}
        <section className="bottom-grid">

          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h2>🚌 Live Bus Information</h2>
                <p>Details of your assigned bus</p>
              </div>
            </div>

            <div className="bus-info-grid">

              <div>
                <span>Bus Number</span>
                <strong>BUS-01</strong>
              </div>

              <div>
                <span>Route</span>
                <strong>Route A → College</strong>
              </div>

              <div>
                <span>Driver</span>
                <strong>Rahul Sharma</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="running">● Running</strong>
              </div>

            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h2>💳 Transport Fee</h2>
                <p>Fee information from College ERP</p>
              </div>
            </div>

            <div className="fee-status">
              <div className="paid-circle">✓</div>

              <div>
                <span>Current Status</span>
                <h2>PAID / ACTIVE</h2>
                <p>Transport facility is active</p>
              </div>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;