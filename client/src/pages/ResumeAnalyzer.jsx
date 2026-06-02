import { useEffect, useState } from "react";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to analyze your resume");
      window.location.href = "/login";
    }
  }, []);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const response = await fetch("http://localhost:5000/api/analyze-resume", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "750px" }}>
        <div className="card-body p-5">
          <h2 className="fw-bold text-center mb-3">AI Resume Analyzer</h2>
          <p className="text-center text-muted mb-4">
            Upload your resume and get skill match analysis instantly.
          </p>

          <input
            type="file"
            accept=".pdf"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="btn btn-primary w-100" onClick={uploadResume}>
            Analyze Resume
          </button>

          {result && (
            <div className="mt-5">
              <h4 className="text-center">
                Match Score:{" "}
                <span className="badge bg-success">{result.matchScore || 0}%</span>
              </h4>

              <div className="row mt-4">
                <div className="col-md-4">
                  <h5>Matched Skills</h5>
                  {(result.matchedSkills || []).map((skill, index) => (
                    <span key={index} className="badge bg-success me-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="col-md-4">
                  <h5>Missing Skills</h5>
                  {(result.missingSkills || []).map((skill, index) => (
                    <span key={index} className="badge bg-danger me-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="col-md-4">
                  <h5>Recommended Jobs</h5>
                  {(result.recommendations || []).map((job, index) => (
                    <span key={index} className="badge bg-primary me-2 mb-2">
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;