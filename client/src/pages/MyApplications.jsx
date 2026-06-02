import { useEffect, useState } from "react";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:5000/api/applications/${userId}`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Applications</h2>

      {applications.length === 0 ? (
        <div className="alert alert-info">
          You have not applied for any jobs yet.
        </div>
      ) : (
        <div className="row g-4">
          {applications.map((app) => (
            <div className="col-md-4" key={app.id}>
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <h5>{app.title}</h5>
                  <p className="text-muted">{app.company}</p>
                  <p>📍 {app.location}</p>
                  <p>💰 ₹{app.salary}</p>
                  <p>
                    <strong>Skill:</strong> {app.skill}
                  </p>
                  <span className="badge bg-primary">
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;