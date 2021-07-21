import React, { useState, useEffect } from "react";


const MOCK_DATA = [
  {
    id: 0,
    name: "Life Lesson #1",
    description: "The safest way to survive a zoom meeting is to shut up and disappear.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/0.gif",
    owner: "0xTEST",
  },
  {
    id: 1,
    name: "Life Lesson #2",
    description: "Most things can be done, but that doesn’t mean that they should be done.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/1.gif",
    owner: "0xTEST",
  },
  {
    id: 2,
    name: "Life Lesson #3",
    description: "Whenever you point at others, 3 of your fingers are pointing back at yourself.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/2.jpg",
    owner: "0xTEST",
  },
  {
    id: 3,
    name: "Life Lesson #4",
    description: "The best way to overwork employees is to catch them in a vicious cycle.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/3.gif",
    owner: "0xTEST",
  },
  {
    id: 5,
    name: "Life Lesson #6",
    description: "The pen is mightier than the word.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/5.gif",
    owner: "0xTEST",
  },
  {
    id: 6,
    name: "Life Lesson #7",
    description: "If you don’t like your new colleague and want to make him quit, obfuscate, befuddle, and bamboozle him.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/6.gif",
    owner: "0xTEST",
  },
  {
    id: 7,
    name: "Life Lesson #8",
    description: "When nobody else is in the office, it’s time to p-a-r-t-y.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/7.gif",
    owner: "0xTEST",
  },
  {
    id: 8,
    name: "Life Lesson #9",
    description: "Stupid bosses base performance appraisals on stupid factors.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/8.gif",
    owner: "0xTEST",
  },
  {
    id: 9,
    name: "Life Lesson #10",
    description: "Never ask a question that you don’t actually want to know the answer to.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/9.jpg",
    owner: "0xTEST",
  },
  {
    id: 10,
    name: "Life Lesson #11",
    description: "The deep emptiness of one’s soul is sometimes the result of the deep emptiness of his belly.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/10.gif",
    owner: "0xTEST",
  },
  {
    id: 11,
    name: "Life Lesson #12",
    description: "Just use zoom filters.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/11.gif",
    owner: "0xTEST",
  },
  {
    id: 12,
    name: "Life Lesson #13",
    description: "Women never forget. Offend one at your own risk. Offend more than one for certain death.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/12.gif",
    owner: "0xTEST",
  },
  {
    id: 13,
    name: "Life Lesson #14",
    description: "Read the fine print.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/13.jpg",
    owner: "0xTEST",
  },
  {
    id: 14,
    name: "Life Lesson #15",
    description: "Never outshine the master.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/14.gif",
    owner: "0xTEST",
  },
  {
    id: 15,
    name: "Life Lesson #16",
    description: "Get the meaning of “workplace transformation” right.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/15.gif",
    owner: "0xTEST",
  },
  {
    id: 16,
    name: "Life Lesson #17",
    description: "You just bought this for 1 test ether, now go sell it for 200 test ethers.",
    image:
      "https://cloudflare-ipfs.com/ipfs/QmW66G7P7EMfTkyhXsdhGAoka6CTUvLxi7AYpKY2EpnHTJ/dilbert%20images/16.png",
    owner: "0xTEST",
  },
];
  

export const MockData = () => {
    const handlePurchase = () => {
        alert("Purchasing...");
    };
    
    const [arrayLength, setArrayLength] = useState(MOCK_DATA.length);

  return (
    <div className="min-h-screen bg-blue-400">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
      <div className="text-black text-2xl pt-28 pb-10">Test page</div>  
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
      <div className="text-black text-2xl pt-0 pb-0">NFTs minted: {arrayLength}</div>
      <div className="text-black text-2xl pt-0 pb-10">NFTs remaining: {16-arrayLength}</div>
        <div className="grid grid-cols-2 gap-8">
          {MOCK_DATA.map(({ id, image, name, description, owner }) => {
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
          })}
        </div>
        <div className="mt-12">
          <button
            id="BuyButton"
            disabled={arrayLength >= 16}
            onClick={handlePurchase}
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium 
            rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
        <div className="text-black text-2xl pt-28 pb-10">Test page</div>
      </div>
    </div>
  );
}


