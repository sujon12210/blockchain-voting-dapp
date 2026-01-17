const { ethers } = window;

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  {
    "name": "vote",
    "type": "function",
    "inputs": [{ "name": "option", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "getVotes",
    "type": "function",
    "inputs": [{ "name": "option", "type": "uint256" }],
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "view"
  }
];

async function vote(option) {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const tx = await contract.vote(option);
  await tx.wait();

  document.getElementById("result").innerText = "Vote sent!";
}
