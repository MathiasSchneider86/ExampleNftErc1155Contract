// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestMetadataErc1155 is ERC1155, Ownable {

    //Owner specification
    address public contractOwner; // <-- game dev/studio wallet address

    //ERC1155 dice token contract

    uint256[5] private _ids = [0, 1, 2];

    //Items definition

    uint256 public constant Token_0 = 0;
    uint256 public constant Token_1 = 1;
    uint256 public constant Token_2 = 2;

    //ModifierSection
    //Modifier -> Is limited dice token holder


    //Views
    //Read main uri
    //URI update -> Owner
    function getUri() public view returns(IERC1155MetadataURI) {
        return IERC1155MetadataURI(this);
    }

    function tokenURI(uint256 qId) public view returns(string memory) {
        return IERC1155MetadataURI(this).uri(qId);
    }


    //Supply functions
    //Mint -> Owner
    function mintByOwner(uint256 id, uint256 amount) public onlyOwner{
        _mint(msg.sender, id, amount, "");
    }

    //Burn -> Token holder
    function burn( address from, uint256 id, uint256 amount) public {
        require(msg.sender == from);
        _burn(from, id, amount);
    }

    //Maintenance functions
    //URI update -> Owner
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    //
    constructor() ERC1155("ipfs://QmTWrkSND3Ckxm8sNcp8tH2cugA3gWG4Pa1rrmC8Effs8n/ExampleMetadataErc1155/{id}.json") {
        contractOwner = msg.sender;
        _mint(msg.sender, Token_0, 1000, "");
        _mint(msg.sender, Token_1, 1000, "");
        _mint(msg.sender, Token_2, 1000, "");
        //_setURI("ipfs://QmTWrkSND3Ckxm8sNcp8tH2cugA3gWG4Pa1rrmC8Effs8n/ExampleMetadataErc1155/{id}.json");
    }

}