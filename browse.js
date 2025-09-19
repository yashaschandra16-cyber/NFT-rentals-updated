document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("nftContainer");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");

  // Load NFTs from storage
  let saved = JSON.parse(localStorage.getItem("nfts")) || [];

  // ✅ Render saved NFTs
  saved.slice().reverse().forEach(nft => {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    wrapper.innerHTML = `
      <div class="card-inner" data-category="${nft.category || 'other'}" data-id="${nft.id}">
        <img src="${nft.img}" alt="${nft.title}"
             onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
        <h3>${nft.title}</h3>
        <p class="desc">${nft.desc}</p>
        <p class="price">${nft.price} ETH / day</p>
        <div class="actions">
          <button class="btn-primary btn-rent" data-id="${nft.id}">Rent Now</button>
        </div>
      </div>`;
    container.appendChild(wrapper);
  });

  // ✅ Search + Filter
  function filterCards() {
    const q = (searchInput.value || "").toLowerCase();
    const cat = filterSelect.value;

    document.querySelectorAll("#nftContainer .card-inner").forEach(card => {
      const title = (card.querySelector("h3")?.textContent || "").toLowerCase();
      const desc = (card.querySelector(".desc")?.textContent || "").toLowerCase();
      const category = card.dataset.category || "other";

      const matchesQ = title.includes(q) || desc.includes(q);
      const matchesCat = cat === "all" || category === cat;

      card.parentElement.style.display = (matchesQ && matchesCat) ? "block" : "none";
    });
  }

  searchInput.addEventListener("input", filterCards);
  filterSelect.addEventListener("change", filterCards);

  // ✅ Rent Now → Save to "rentals"
  container.addEventListener("click", (e) => {
    const rentBtn = e.target.closest(".btn-rent");
    if (!rentBtn) return;

    const card = rentBtn.closest(".card-inner");
    const nftId = card.dataset.id || "static-" + Date.now();
    const nftTitle = card.querySelector("h3").textContent;
    const nftImg = card.querySelector("img").src;
    const nftDesc = card.querySelector(".desc").textContent;
    const nftPrice = card.querySelector(".price").textContent;
    const nftCat = card.dataset.category;

    // Create rental object
    const rental = {
      id: nftId,
      title: nftTitle,
      img: nftImg,
      desc: nftDesc,
      price: nftPrice,
      category: nftCat,
      rentedAt: new Date().toISOString()
    };

    // Save to rentals
    let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
    rentals.push(rental);
    localStorage.setItem("rentals", JSON.stringify(rentals));

    alert(`✅ You rented: ${nftTitle}\nIt will now appear in your Dashboard → My Rentals`);
  });
});
