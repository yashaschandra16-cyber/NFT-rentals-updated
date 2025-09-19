// Example: Show a welcome message in console
console.log("Welcome to NFT Rentals - Landing Page Loaded!");

// You can add interactivity later if needed
// NFT Search Filter
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const nftGrid = document.getElementById("nftGrid");

if (searchInput && filterSelect && nftGrid) {
  searchInput.addEventListener("input", filterNFTs);
  filterSelect.addEventListener("change", filterNFTs);

  function filterNFTs() {
    const searchValue = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    Array.from(nftGrid.children).forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const matchesSearch = title.includes(searchValue);
      const matchesFilter =
        filterValue === "all" ||
        (filterValue === "games" && title.includes("skin")) ||
        (filterValue === "art" && title.includes("art")) ||
        (filterValue === "events" && title.includes("pass"));

      if (matchesSearch && matchesFilter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}
// NFT Rent Function
function rentNFT() {
  const duration = document.getElementById("duration").value;
  alert(`You selected to rent this NFT for ${duration} day(s).\n(Note: Payment would be handled by smart contract in real app)`);
}
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".row.g-4"); // NFT grid container

  // Load NFTs from localStorage
  const savedNFTs = JSON.parse(localStorage.getItem("nfts")) || [];
  savedNFTs.forEach(nft => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-md-4";
    cardDiv.innerHTML = `
      <div class="card shadow-sm">
        <img src="${nft.img}" class="card-img-top" alt="${nft.title}">
        <div class="card-body">
          <h5 class="card-title">${nft.title}</h5>
          <p class="card-text">${nft.desc}</p>
          <p class="card-text"><strong>${nft.price} ETH / day</strong></p>
          <a href="#" class="btn btn-primary">Rent Now</a>
        </div>
      </div>
    `;
    container.appendChild(cardDiv);
  });
});
// Return NFT
function returnNFT() {
  alert("✅ NFT returned successfully!");
}

// Edit Listing
function editNFT() {
  alert("✏️ NFT listing edit feature (demo only)");
}
// Contact Form Submit
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    alert(`✅ Message Sent!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    contactForm.reset();
  });
}
