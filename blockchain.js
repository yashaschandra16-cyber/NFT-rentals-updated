// blockchain.js

// Replace with your deployed contract addresses
const rentalMarketplaceAddress = "YOUR_MARKETPLACE_CONTRACT_ADDRESS";
const rentableNFTAddress = "YOUR_RENTABLENFT_CONTRACT_ADDRESS";

// ABI fragments for the methods we call
const rentalMarketplaceABI = [
  "function listNFT(address nft, uint256 tokenId, uint256 pricePerDay) external returns (uint256)",
  "function rentNFT(uint256 listingId, uint64 numDays) external payable",
  "function getListingsCount() external view returns (uint256)",
  "function listings(uint256) external view returns (address nft, uint256 tokenId, address owner, uint256 pricePerDay, bool active)"
];

const rentableNFTABI = [
  "function mint(address to) external",
  "function setUser(uint256 tokenId, address user, uint64 expires) external",
  "function userOf(uint256 tokenId) view returns (address)"
];

let provider, signer, marketplace, nft;

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found — please install it.");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  marketplace = new ethers.Contract(rentalMarketplaceAddress, rentalMarketplaceABI, signer);
  nft = new ethers.Contract(rentableNFTAddress, rentableNFTABI, signer);

  const addr = await signer.getAddress();
  const el = document.getElementById("walletAddress");
  if (el) el.innerText = "🔗 Address: " + addr;
}

async function listNFTOnChain(tokenId, pricePerDay) {
  let tx = await marketplace.listNFT(rentableNFTAddress, tokenId, ethers.utils.parseEther(pricePerDay));
  await tx.wait();
  alert("✅ NFT listed on blockchain!");
}

async function rentNFTOnChain(listingId, numDays, pricePerDay) {
  let cost = ethers.utils.parseEther((pricePerDay * numDays).toString());
  let tx = await marketplace.rentNFT(listingId, numDays, { value: cost });
  await tx.wait();
  alert("✅ NFT rented on blockchain!");
}