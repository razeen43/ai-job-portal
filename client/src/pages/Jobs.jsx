import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [skill, setSkill] = useState("");

  const fetchJobs = async () => {
    let url = "http://localhost:5000/api/jobs";

    if (skill.trim() !== "") {
      url = `http://localhost:5000/api/jobs?skill=${skill}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setJobs(data);
  };

  const applyJob = async (jobId) => {
    const response = await fetch("http://localhost:5000/api/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("userId"),
        job_id: jobId,
      }),
    });

    const data = await response.json();
    alert(data.message);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Jobs</h2>

      <div className="d-flex mb-4">
        <input
          className="form-control me-2"
          placeholder="Search by skill, e.g. React"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <button className="btn btn-primary" onClick={fetchJobs}>
          Search
        </button>
      </div>

      <div className="row">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.id}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p className="card-text">
                    <strong>Skill:</strong> {job.skill}
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() => applyJob(job.id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;