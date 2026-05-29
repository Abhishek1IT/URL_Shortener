const API_BASE_URL = "http://localhost:5000";

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create short URL");
    }

    const shortUrl = `${API_BASE_URL}/${data.shortUrl}`;
    const result = document.getElementById("result");

    result.innerHTML = `Short URL: <a id="shortUrl" href="${shortUrl}" target="_blank" rel="noreferrer">${shortUrl}</a>`;
    result.style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Error creating short URL");
  }
}

document.getElementById("shorten-btn").addEventListener("click", shortenUrl);
