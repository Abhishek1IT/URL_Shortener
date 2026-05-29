const API_BASE_URL = "http://localhost:5000";
let currentShortCode = "";

async function shortenUrl() {
  const input = document.getElementById("url-input");
  const originalUrl = input.value.trim();

  if (!originalUrl) {
    alert("Please enter a URL");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create short URL");

    currentShortCode = data.shortUrl;
    const shortUrl = `${API_BASE_URL}/${currentShortCode}`;

    const resultContent = document.getElementById("result-content");
    resultContent.innerHTML = `Short URL: <a id="shortUrl" href="${shortUrl}" target="_blank" rel="noreferrer">${shortUrl}</a>`;
    const resultEl = document.getElementById("result");
    resultEl.classList.add("visible");
  } catch (error) {
    console.error(error);
    alert("Error creating short URL");
  }
}

async function updateUrl() {
  if (!currentShortCode) return alert("No short URL to update");
  const newOriginal = prompt("Enter new original URL:");
  if (!newOriginal) return;

  try {
    const res = await fetch(`${API_BASE_URL}/${currentShortCode}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: newOriginal }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");
    alert("URL updated successfully");
  } catch (err) {
    console.error(err);
    alert("Error updating URL");
  }
}

async function deleteUrl() {
  if (!currentShortCode) return alert("No short URL to delete");
  if (!confirm("Delete this short URL?")) return;

  try {
    const res = await fetch(`${API_BASE_URL}/${currentShortCode}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Delete failed");
    document.getElementById("result-content").innerHTML = "";
    const resultEl = document.getElementById("result");
    resultEl.classList.remove("visible");
    currentShortCode = "";
    alert(data.message || "Deleted");
  } catch (err) {
    console.error(err);
    alert("Error deleting URL");
  }
}

document.getElementById("shorten-btn").addEventListener("click", shortenUrl);
document.getElementById("update-btn").addEventListener("click", updateUrl);
document.getElementById("delete-btn").addEventListener("click", deleteUrl);
