const API_BASE = "http://127.0.0.1:5000";  // Flask Backend

// Search for Jobs
function searchJobs() {
    const jobTitle = document.getElementById("jobTitle").value;
    const location = document.getElementById("location").value;

    fetch(`${API_BASE}/search-jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_title: jobTitle, location: location })
    })
    .then(response => response.json())
    .then(data => {
        let resultsDiv = document.getElementById("jobResults");
        resultsDiv.innerHTML = "<h3>Job Results</h3>";
        if (data.length > 0) {
            data.forEach(job => {
                resultsDiv.innerHTML += `<p><b>${job.title}</b> - ${job.company} (<a href="${job.link}" target="_blank">Apply</a>)</p>`;
            });
        } else {
            resultsDiv.innerHTML += "<p>No jobs found.</p>";
        }
    })
    .catch(error => console.error("Error fetching jobs:", error));
}

// Apply to a Job
function applyJob() {
    const jobLink = document.getElementById("jobLink").value;

    fetch(`${API_BASE}/apply-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_link: jobLink })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("applicationStatus").innerHTML = `<p>${data.message}</p>`;
    })
    .catch(error => console.error("Error applying to job:", error));
}
