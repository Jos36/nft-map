/** @format */
import { abi } from "/abi.js";
import { config } from "/config.js";

const Web3Modal = window.Web3Modal.default;

Notiflix.Notify.init({
  position: "right-top",
});

let web3, provider, selectedAccount, accountData, contract;
let supplyInterval, supplyElement;

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
  },
};

const web3Modal = new Web3Modal({
  network: "ethereum", // optional
  cacheProvider: false, // optional
  providerOptions,
  disableInjectedProvider: false,
});

let getAccountData = async () => {
  const chainId = await web3.eth.getChainId();
  const chainData = evmChains.getChain(chainId);
  const accounts = await web3.eth.getAccounts();
  selectedAccount = accounts[0];
  const bal = await web3.eth.getBalance(selectedAccount);
  const eth_bal = web3.utils.fromWei(bal, "ether");
  const human_bal = parseFloat(eth_bal).toFixed(4);
  return {
    account: selectedAccount,
    balance: bal,
    eth_balance: eth_bal,
    human_balance: human_bal,
    chain_id: chainId,
  };
};

let verifySetup = async () => {
  // console.log(accountData.chain_id, config);
  // if (accountData.chain_id != config.requirements.chain_id) {
  //   Notiflix.Notify.failure("Wrong Chain ID! Switch to Ethereum Mainnet.");
  // }
  console.log(accountData.chain_id);
};

let total_amt;
let getTotalSupplyInterval = async () => {
  if (!contract) return;
  let res;
  try {
    res = await contract.methods.totalSupply().call();
  } catch (e) {
    return;
  }
  if (res) {
    console.log("total supply", res);
    if (supplyElement) {
      console.log(total_amt);
      if (total_amt) {
        supplyElement.innerText = `${res} / 10000 Minted`;
      } else {
        supplyElement.innerText = `${res} Minted`;
      }
    }
  }
};

let connectWallet = async () => {
  try {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
    contract = new web3.eth.Contract(abi, config.contract.contract_address);
    getTotalSupplyInterval();
    supplyInterval = setInterval(getTotalSupplyInterval, 10000);
  } catch (e) {
    console.log(e);
    if (e) Notiflix.Notify.failure(e);
    return;
  }
  accountData = await getAccountData();
  await verifySetup();
  console.log(accountData);
  window.accountData = accountData;
  console.log(window.accountData);
  provider.on("accountsChanged", async (accounts) => {
    if (accounts.length == 0) return;
    accountData = await getAccountData();
    await verifySetup();
    console.log(accountData);
  });
  provider.on("chainChanged", async (accounts) => {
    if (accounts.length == 0) return;
    accountData = await getAccountData();
    await verifySetup();
    console.log(accountData);
  });
  Notiflix.Notify.success("Connected Wallet");
  window.location.replace("/client");
};

const contractAddress = "0xAddressOfNFTContract";

const handleWalletConnect = async () => {
  const connectButton = document.getElementById("connect-button");
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const myAddress = await signer.getAddress();
  connectButton.innerText = "Connected";
  console.log(myAddress);
  return;
  const nftContract = new ethers.Contract(contractAddress, abi, signer);
  const lands = await nftContract.getLands(myAddress);
};

const initialize = () => {
  const connectButton = document.getElementById("connect-button");

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = async () => {
    if (!isMetaMaskInstalled()) {
      connectButton.innerText = "Install Metamask to claim lands.";
      connectButton.disabled = true;
    } else {
      // let accounts = await ethereum.request({ method: "eth_accounts" });
      // if (accounts.length != 0) {
      //   connectButton.innerText = "Connected";
      //   connectButton.disabled = false;
      // } else {
      connectButton.innerText = "Connect";
      connectButton.onclick = connectWallet;
      connectButton.disabled = false;
      // }
    }
  };
  MetaMaskClientCheck();
};

export async function verifyWalletConnection() {
  try {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
    contract = new web3.eth.Contract(abi, config.contract.contract_address);
    getTotalSupplyInterval();
    supplyInterval = setInterval(getTotalSupplyInterval, 10000);
  } catch (e) {
    console.log(e);
    if (e) Notiflix.Notify.failure(e);
    return;
  }
  accountData = await getAccountData();
  await verifySetup();
  console.log(accountData);
  window.accountData = accountData;
  console.log(window.accountData);
  provider.on("accountsChanged", async (accounts) => {
    if (accounts.length == 0) return;
    accountData = await getAccountData();
    await verifySetup();
    console.log(accountData);
  });
  provider.on("chainChanged", async (accounts) => {
    if (accounts.length == 0) return;
    accountData = await getAccountData();
    await verifySetup();
    console.log(accountData);
  });
  Notiflix.Notify.success("Wallet verified");
  console.log(window.accountData);
  return accountData;
}

export async function verifyWalletLands() {
  let lands;
  try {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
    contract = new web3.eth.Contract(abi, config.contract.contract_address);
    getTotalSupplyInterval();
    supplyInterval = setInterval(getTotalSupplyInterval, 10000);
  } catch (e) {
    console.log(e);
    if (e) Notiflix.Notify.failure(e);
    return;
  }
  accountData = await getAccountData();
  if (!contract) return;
  lands = await contract.methods.balanceOf(accountData.account).call();

  await verifySetup();
  console.log(accountData);
  window.accountData = accountData;
  console.log(window.accountData);
  provider.on("accountsChanged", async (accounts) => {
    if (accounts.length == 0) return;
    accountData = await getAccountData();
    await verifySetup();
    console.log(accountData);
  });
  provider.on("chainChanged", async (accounts) => {
    if (accounts.length == 0) return;
    accountData = await getAccountData();
    await verifySetup();
    console.log(accountData);
  });

  Notiflix.Notify.success("Wallet verified");
  console.log(window.accountData);
  console.log(lands);
  return { accountData, lands };
}

initialize();
