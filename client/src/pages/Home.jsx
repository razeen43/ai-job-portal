function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
            <span
              className="d-inline-flex align-items-center justify-content-center me-2"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                backgroundColor: "#111827",
                color: "white",
                fontWeight: "700",
              }}
            >
              JP
            </span>
            JobPilot
          </a>

          <div className="d-flex flex-wrap gap-2">
            {token ? (
              <>
                <a href="/jobs" className="btn btn-outline-dark">Jobs</a>
                <a href="/my-applications" className="btn btn-outline-dark">Applications</a>
                <a href="/dashboard" className="btn btn-outline-dark">Dashboard</a>
                <a href="/resume-analyzer" className="btn btn-outline-dark">Resume Analyzer</a>

                {role === "admin" && (
                  <a href="/add-job" className="btn btn-warning">Add Job</a>
                )}

                <button className="btn btn-dark" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="btn btn-outline-dark">Login</a>
                <a href="/register" className="btn btn-dark">Register</a>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="container py-5">
        <div className="row align-items-center py-5">
          <div className="col-lg-7">
            <span className="badge bg-dark mb-3 px-3 py-2">
              AI-Powered Job Platform
            </span>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
                lineHeight: "1.05",
                color: "#111827",
              }}
            >
              Find your dream job with smarter matching.
            </h1>

            <p
              className="lead mb-4"
              style={{
                color: "#475569",
                maxWidth: "650px",
              }}
            >
              Browse jobs, analyze your resume, discover missing skills,
              and track your applications in one clean dashboard.
            </p>

            <div className="d-flex flex-wrap gap-3">
              {token ? (
                <>
                  <a href="/jobs" className="btn btn-dark btn-lg px-4">
                    Browse Jobs
                  </a>

                  <a href="/resume-analyzer" className="btn btn-outline-dark btn-lg px-4">
                    Analyze Resume
                  </a>
                </>
              ) : (
                <>
                  <a href="/register" className="btn btn-dark btn-lg px-4">
                    Get Started
                  </a>

                  <a href="/login" className="btn btn-outline-dark btn-lg px-4">
                    Login
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-5 mt-5 mt-lg-0">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Resume Match Preview</h5>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>React Developer</span>
                    <strong>86%</strong>
                  </div>
                  <div className="progress mt-2">
                    <div className="progress-bar bg-dark" style={{ width: "86%" }}></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>Frontend Engineer</span>
                    <strong>78%</strong>
                  </div>
                  <div className="progress mt-2">
                    <div className="progress-bar bg-dark" style={{ width: "78%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between">
                    <span>Full Stack Developer</span>
                    <strong>72%</strong>
                  </div>
                  <div className="progress mt-2">
                    <div className="progress-bar bg-dark" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold">Smart Job Search</h5>
                <p className="text-muted mb-0">
                  Search jobs by skill, salary, location and company.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold">Resume Analyzer</h5>
                <p className="text-muted mb-0">
                  Detect matched skills, missing skills and role fit.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold">Application Tracking</h5>
                <p className="text-muted mb-0">
                  Track your applied, accepted and rejected applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-top bg-white py-4">
        <div className="container text-center text-muted">
          © 2026 JobPilot | React • Node.js • MySQL
        </div>
      </footer>
    </div>
  );
}

export default Home;