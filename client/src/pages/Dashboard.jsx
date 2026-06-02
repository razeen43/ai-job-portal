import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    applied: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:5000/api/dashboard/${userId}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const chartData = {
    labels: ["Jobs", "Applications", "Applied", "Accepted", "Rejected"],
    datasets: [
      {
        label: "Count",
        data: [
          stats.totalJobs,
          stats.totalApplications,
          stats.applied,
          stats.accepted,
          stats.rejected,
        ],
        backgroundColor: "#111827",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#111827",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#111827",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#111827",
          precision: 0,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  const cards = [
    { title: "Total Jobs", value: stats.totalJobs },
    { title: "Applications", value: stats.totalApplications },
    { title: "Applied", value: stats.applied },
    { title: "Accepted", value: stats.accepted },
    { title: "Rejected", value: stats.rejected },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: "#111827" }}>
              Dashboard
            </h1>
            <p className="text-muted mb-0">
              Track your job applications and activity.
            </p>
          </div>

          <button className="btn btn-dark mt-3 mt-md-0" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="row g-3 mb-4">
          {cards.map((card, index) => (
            <div className="col-6 col-md" key={index}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-2">{card.title}</p>
                  <h2 className="fw-bold mb-0" style={{ color: "#111827" }}>
                    {card.value}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4" style={{ color: "#111827" }}>
              Application Analytics
            </h4>

            <div style={{ height: "380px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;