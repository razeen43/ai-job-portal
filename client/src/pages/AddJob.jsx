import { useState, useEffect } from "react";

function AddJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    skill: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      alert("Only admin can add jobs");
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    alert(data.message);

    setForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      skill: "",
    });
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body p-4">
          <h2 className="fw-bold mb-4 text-center">Add New Job</h2>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Job Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="form-control mb-3"
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />

            <input
              className="form-control mb-3"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
              className="form-control mb-3"
              placeholder="Salary"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />

            <input
              className="form-control mb-3"
              placeholder="Required Skill"
              value={form.skill}
              onChange={(e) => setForm({ ...form, skill: e.target.value })}
            />

            <button className="btn btn-primary w-100">
              Add Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddJob;