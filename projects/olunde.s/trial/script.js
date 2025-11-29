// Load artworks from localStorage or empty array
let artworks = JSON.parse(localStorage.getItem("artworks")) || [];

function saveArtworks() {
  localStorage.setItem("artworks", JSON.stringify(artworks));
}

// Display all artworks
function displayAll() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return; // not on this page
  gallery.innerHTML = "";

  artworks.forEach((art, index) => {
    const div = document.createElement("div");
    div.className = "art-card";
    div.innerHTML = `
      <h3>${art.title}</h3>
      <p>by <a href="profile.html?user=${encodeURIComponent(art.user)}">${art.user}</a></p>
      <img src="${art.image}" width="200">
      <br>
      <button onclick="deleteArtwork(${index})">Delete</button>
    `;
    gallery.appendChild(div);
  });
}

// Add new artwork
document.getElementById("uploadBtn")?.addEventListener("click", () => {
  const user = document.getElementById("user").value.trim();
  const title = document.getElementById("title").value.trim();
  const file = document.getElementById("imageInput").files[0];

  if (!user || !title || !file) {
    alert("Please fill all fields and select an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const newArt = { user, title, image: reader.result };
    artworks.push(newArt);
    saveArtworks();
    displayAll();
  };
  reader.readAsDataURL(file); // convert image to base64
});

// Delete artwork
function deleteArtwork(index) {
  if (confirm("Delete this artwork?")) {
    artworks.splice(index, 1);
    saveArtworks();
    displayAll();
  }
}

// Show specific user's artworks on profile.html
function displayUserArtworks(username) {
  const profileGallery = document.getElementById("profileGallery");
  if (!profileGallery) return;

  const userArts = artworks.filter(a => a.user === username);
  if (userArts.length === 0) {
    profileGallery.innerHTML = "<p>No artworks uploaded yet.</p>";
    return;
  }

  userArts.forEach((art) => {
    const div = document.createElement("div");
    div.className = "art-card";
    div.innerHTML = `
      <h3>${art.title}</h3>
      <img src="${art.image}" width="200">
    `;
    profileGallery.appendChild(div);
  });
}

// On home page load
displayAll();
