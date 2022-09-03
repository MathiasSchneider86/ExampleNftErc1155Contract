const { expect } = require("chai");
const hre = require("hardhat");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require("@nomicfoundation/hardhat-network-helpers");

describe("DeployTestMetadataErc1155", function () {
  it("Should create the TestMetadata URI storage contract", async function () {
    const NewTestMetadataErc1155 = await hre.ethers.getContractFactory("TestMetadataErc1155");
    const newTestMetadataErc1155 = await NewTestMetadataErc1155.deploy();
    await newTestMetadataErc1155.deployed();
    const newTestMetadataErc1155Address = await newTestMetadataErc1155.address;
    const newTestMetadataErc1155Owner = await newTestMetadataErc1155.contractOwner();
    const newTestMetadataErc1155Uri = await newTestMetadataErc1155.getUri();
    const newTestMetadataErc1155UriToken0 = await newTestMetadataErc1155.tokenURI(0);
    const newTestMetadataErc1155UriToken1 = await newTestMetadataErc1155.tokenURI(1);
    const newTestMetadataErc1155UriToken2 = await newTestMetadataErc1155.tokenURI(2);
    console.log("TestMetadata deployed to:", newTestMetadataErc1155Address);
    console.log("TestMetadata owner:", newTestMetadataErc1155Owner);
    console.log("TestMetadata token URI:", newTestMetadataErc1155Uri);
    console.log("TestMetadata token 0 URI:", newTestMetadataErc1155UriToken0);
    console.log("TestMetadata token 1 URI:", newTestMetadataErc1155UriToken1);
    console.log("TestMetadata token 2 URI:", newTestMetadataErc1155UriToken2);
    expect(newTestMetadataErc1155Address > 0);
    expect(newTestMetadataErc1155Owner != null);
    console.log(await readIpfsJsonErc1155(newTestMetadataErc1155UriToken0, 0));
    console.log(await readIpfsJsonErc1155(newTestMetadataErc1155UriToken1, 1));
    console.log(await readIpfsJsonErc1155(newTestMetadataErc1155UriToken2, 2));
  });
});

const readIpfsJsonErc1155 = async (_dataUrl, _id) => {
  // could be _mintAmount instead(?) i.e. 1 is just temp hardcoded
  const _gateUrl = "https://ipfs.io/ipfs/";
  let _paddedHex = (
    "0000000000000000000000000000000000000000000000000000000000000000" + _id
  ).slice(-64);
  let _cid = "";
  let _path = "";
  let _fileQuery = "";
  let _url = "";

  const _urlSplit = _dataUrl.split('/');
  _urlSplit.forEach(element => {
    if(element.includes("ipfs://"))
    {
      console.log("Remove ipfs://");
      element = "";
    }
    else
    if(element.includes("Qm"))
    {
      _cid = element + "/";
      console.log("Assign CID: " + _cid);
    }
    else
    if(element.includes(".json"))
    {
      //_fileQuery = "?filename=" + element;
      _fileQuery = _paddedHex + ".json";
      console.log("Create file query: " + _fileQuery);
    }
    else
    if((!element.includes("ipfs")) && (element.length > 0))
    {
      _path += element + "/";
      console.log("Add path: " + _path);
    }
  });
  _url = _gateUrl + _cid + _path + _fileQuery;
  console.log("Link created: " + _url);

  const response = await fetch(_url);
  const data = await response.json();
  return(data);
  //console.log(data);
};