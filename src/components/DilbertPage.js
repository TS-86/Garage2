import React, { useState, useEffect } from "react";
import { Contract, getDefaultProvider, providers, utils } from "ethers";
import { config } from "../config";
import abi from "../fixtures/abi.json";
import axios from "axios";

const provider = getDefaultProvider("rinkeby", { alchemy: config.alchemyKey });
const contract = new Contract(
  "0xF39422A2CEeA9f5aa5974e697D7193755B3E4E32",  //my 1st robots contract, working, then tested over-minting intentionally and crashed it, so NOT working now
  //"0x066e4b308B17e4A9719b1b69D50Fd4492e79A829",  //my robots contract deployed to test CONTRACT limitation of 2 NFTs ONLY, working
  abi,
  provider
);


const formatIpfsUrl = (url) => {
  return url.replace(/ipfs:\/\//g, "https://cloudflare-ipfs.com/");
};

export const DilbertPage = () => {
  const [mintedNftState, setMintedNftState] = useState({
    state: "UNINITIALIZED",
  });
  const [purchaseState, setPurchaseState] = useState({
    state: "UNINITIALIZED",
  });
  let modalVisible =  // <-- was const, changed to let to try method below, didn't work
    purchaseState.state === "PENDING_METAMASK" ||
    purchaseState.state === "PENDING_SIGNER" ||
    purchaseState.state === "PENDING_CONFIRMAION";

  // this method didn't work, but can leave it here:  
  function closeModal() {
    modalVisible = false;
  }
  
  const [numberMinted, setNumberMinted] = useState(0);

  const loadRobotsData = async () => {
    setMintedNftState({
      state: "PENDING",
    });
    const totalSupply = await contract.totalSupply();
    const ids = [...Array(totalSupply.toNumber()).keys()];
    const deferredData = ids.map(async (id) => {
      const ipfsUri = await contract.tokenURI(id);
      const owner = await contract.ownerOf(id);
      const formattedUri = formatIpfsUrl(ipfsUri);
      const metadata = (await axios.get(formattedUri)).data;
      const formattedImage = formatIpfsUrl(metadata.image);
      return {
        id,
        name: metadata.name,
        image: formattedImage,
        description: metadata.description,
        owner,
      };
    });
    const data = await Promise.all(deferredData);
    setMintedNftState({
      state: "SUCCESS",
      data,
    });
  };

  useEffect(() => {
    loadRobotsData();
  }, []);

  const handlePurchase = async () => {
    const { ethereum } = window;
    if (typeof ethereum == "undefined") alert("Metamask is not detected");

    // Prompts Metamask to connect
    setPurchaseState({ state: "PENDING_METAMASK" });
    await ethereum.enable();

    // Create new provider from Metamask
    const provider = new providers.Web3Provider(window.ethereum);

    // Get the signer from Metamask
    const signer = provider.getSigner();

    // Create the contract instance
    const contract = new Contract(
      "0xF39422A2CEeA9f5aa5974e697D7193755B3E4E32",  //my 1st robots contract, working, then tested over-minting intentionally and crashed it, so NOT working now
      //"0x066e4b308B17e4A9719b1b69D50Fd4492e79A829",  //my robots contract deployed to test CONTRACT limitation of 2 NFTs ONLY, working
      abi,
      signer
    );

    // Call the purchase method
    setPurchaseState({ state: "PENDING_SIGNER" });
    const receipt = await contract.purchase({ value: utils.parseEther("1") });
    setPurchaseState({ state: "PENDING_CONFIRMAION" });
    const transaction = await receipt.wait();
    setPurchaseState({ state: "SUCCESS", transaction });
    setNumberMinted(numberMinted + 1);

    // Reload the Robots
    await loadRobotsData();
  };

  
  return (
    <div className="min-h-screen bg-blue-400">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
      <div className="text-black text-2xl pt-28 pb-10">DISCLAIMER: 
      This site was created for a course project, and is only put on a testnet.
      The owner of this site does not profit from it in any way.
      All copyrights for Dilbert belong to Scott Adams.</div>
      <div className="text-black text-8xl pt-28 pb-10">The NFT Marketplace</div>
      <div className="mx-auto flex items-center justify-center">
        <img src="https://cloudflare-ipfs.com/ipfs/QmbXjC7shxdpb25QzymSomqaGK5XPjeBQCphWiGZCmyDhb/dilbert%20images%20to%20use%20at%20top%20of%20page/dilbert-typing-gif.gif" 
        width="300px" className="mx-auto p-4"/>
        <div className="text-black text-6xl pt-28 pb-10">Dilbert's NFT life lessons</div>
        <img src="https://cloudflare-ipfs.com/ipfs/QmbXjC7shxdpb25QzymSomqaGK5XPjeBQCphWiGZCmyDhb/dilbert%20images%20to%20use%20at%20top%20of%20page/dilbert-giving-lessons.gif" className="mx-auto p-4"/>
      </div>
      <div className="text-black text-2xl pt-0 pb-10">Note: There are only 16 NFTs for sale, 
      so get them while stocks last!</div>
      <div className="text-black text-2xl pt-0 pb-0">NFTs minted: {numberMinted}</div>
      <div className="text-black text-2xl pt-0 pb-10">NFTs remaining: {16-numberMinted}</div>
        {mintedNftState.state === "PENDING" && (
          <div className="text-xl text-white">LOADING...</div>
        )}
        {mintedNftState.state === "SUCCESS" && (
          <div className="grid grid-cols-4 gap-4">
            {mintedNftState.data.map(
              ({ id, image, name, description, owner }) => {
                return (
                  <div key={id} className="bg-white rounded p-2">
                    <img src={image} className="mx-auto p-4" alt={name} />
                    <div className="text-xl">{name}</div>
                    <div className="">{description}</div>
                    <hr className="my-4" />
                    <div className="text-left text-sm">Owned By:</div>
                    <div className="text-left text-xs">{owner}</div>
                  </div>
                );
              }
            )}
          </div>
        )}
        <div className="mt-12">
          <button
            disabled={numberMinted >= 16}
            onClick={handlePurchase}
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Buy a life lesson from Dilbert for 1 test ether
          </button>
        </div>
        <div className="text-black text-2xl pt-28 pb-10">DISCLAIMER: 
        This site was created for a course project, and is only put on a testnet.
        The owner of this site does not profit from it in any way.
        All copyrights for Dilbert belong to Scott Adams.</div>
        <div className="text-black text-2xl pt-10 pb-10">If you would like to host your NFTs
        for sale on this site, please contact the owner at xxx@yyy.com</div>
      </div>

 
      {modalVisible === true ? (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              ​
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
              <div className="mx-auto flex items-center justify-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <svg
                    className="h-6 w-6 text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <button onClick={closeModal} type="button">X</button>
                
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {purchaseState.state === "PENDING_METAMASK" &&
                      "Connecting Metamask..."}
                    {purchaseState.state === "PENDING_SIGNER" &&
                      "Waiting for Signed Transaction"}
                    {purchaseState.state === "PENDING_CONFIRMAION" &&
                      "Waiting for Block Confirmation"}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {purchaseState.state === "PENDING_METAMASK" &&
                        "Allow Metamask to connect to this application in the extension."}
                      {purchaseState.state === "PENDING_SIGNER" &&
                        "Approve the purchase transaction within the Metamask extension"}
                      {purchaseState.state === "PENDING_CONFIRMAION" &&
                        "Transaction has been sent to the blockchain. Please wait while the transaction is being confirmed."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

  
