// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftMarket is ERC721URIStorage, Ownable {
using Counters for Counters.Counter;
//Allow me to create a list of items that are type of Counter
//I can increase or decrease and get the value of the listed items
//Example How many items are listed for sale?

uint public listingPrice = 0.025 ether;// Starting Price to list an Nft in ethereum
Counters.Counter private _listedItems; //How many NFTs are listed in the Marketplace
Counters.Counter private _tokenIds; //How many NFTs in Total i have created for the smart Contract
uint256[] private _allNfts; //All tokenIds in the array

mapping(string => bool) private _usedTokenURIs; //Mapping between URIs
mapping(uint => NftItem) private _idToNftItem; // Mapping between token id and Nftitem

mapping(uint => uint) private _idToNftIndex;

 mapping(address => mapping(uint => uint)) private _ownedTokens; //Mapping between owner(address) and index (TokenId)
  mapping(uint => uint) private _idToOwnedIndex;

  

  struct NftItem {
    uint tokenId;
    uint price;
    address creator; //Whats the adress of the creator?
    bool isListed;
  }
  // for front end implemantation
  event NftItemCreated ( 
    uint tokenId,
    uint price,
    address creator,
    bool isListed
  );

  constructor() ERC721("CircularNft", "CRNFT") {}

   //Function so we can change the listing price external by the Conract Owner
   function setListingPrice(uint newPrice) external onlyOwner { 
    require(newPrice > 0, "Price must be at least 1 wei");
    listingPrice = newPrice;
  }
  //Miniting Function

  function burnToken(uint tokenId) public {
    _burn(tokenId);
  }

  //Creating New Nft function and stored in Pinata 
  function mintToken (string memory tokenURI, uint price)public payable returns(uint){
    require(!tokenURIExists(tokenURI), "Token URI already exists"); // we are looking in to the mapping for the existing URI and error if it exists
    require(msg.value == listingPrice, "Price must be equal to listing price");
    _tokenIds.increment(); //We create a new token
    _listedItems.increment(); //We List the new token


    uint newTokenId = _tokenIds.current();// Store new value to newTokenId
       //ERC721 functions to actually Mint the token
    _safeMint(msg.sender,newTokenId);
    _setTokenURI(newTokenId,tokenURI);
    _usedTokenURIs[tokenURI] = true; // we are looking in to the mapping for the existing URI
    _createNftItem(newTokenId, price);

    return newTokenId;
   

  } 
  // We need info to buy an NFT (TokenId(which Nft we buy))
  //we need The owner of the NFT
  //The buyer Is providing the correct price to buy it 
  //Unlist from sale ,set to false
  //Transfer Token to the new owner and money(ethereum)

  function buyNft(uint tokenId ) public payable {
    
    uint price = _idToNftItem[tokenId].price;
    address owner = ERC721.ownerOf(tokenId);

    require(msg.sender != owner, "You already own this NFT");
    require(msg.value == price, "Please submit the asking price");

    _idToNftItem[tokenId].isListed = false; //When you buy an NFT it gets delisted
    _listedItems.decrement();

    _transfer(owner, msg.sender, tokenId);
    payable(owner).transfer(msg.value);
  }

   function placeNftOnSale(uint tokenId, uint newPrice) public payable {
    require(ERC721.ownerOf(tokenId) == msg.sender, "You are not owner of this nft");
    require(_idToNftItem[tokenId].isListed == false, "Item is already on sale");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _idToNftItem[tokenId].isListed = true;
    _idToNftItem[tokenId].price = newPrice;
    _listedItems.increment();
  }

   function _createNftItem(
    uint tokenId,
    uint price
  ) private {
    require(price > 0, "Price must be at least 1 wei");

    _idToNftItem[tokenId] = NftItem( // Mapping between Token Id and {Id,its Price,iTs owner(adress),true}
      tokenId,
      price,
      msg.sender,
      true
    );

    emit NftItemCreated(tokenId, price, msg.sender, true);
  }

   function getNftItem(uint tokenId) public view returns (NftItem memory) {
    return _idToNftItem[tokenId];
  }

  // How many listed items we have

  function listedItemsCount() public view returns (uint) {
    return _listedItems.current();
  }


   function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }

   function totalSupply() public view returns (uint) { //All nfts in the array
    return _allNfts.length;
  }

  function tokenByIndex(uint index) public view returns (uint) {
    require(index < totalSupply(), "Index out of bounds");
    return _allNfts[index];
  }

   function tokenOfOwnerByIndex(address owner, uint index) public view returns (uint) {
    require(index < ERC721.balanceOf(owner), "Index out of bounds");
    return _ownedTokens[owner][index];
  }

  function getAllNftsOnSale() public view returns(NftItem[]memory){ //Nfts in total
    uint allItemsCounts = totalSupply();
    uint currentIndex = 0;
    NftItem[] memory items = new NftItem[](_listedItems.current());
    for (uint i = 0; i < allItemsCounts; i++){
      uint tokenId = tokenByIndex(i);
      NftItem storage item = _idToNftItem[tokenId];

      if (item.isListed == true){
        items[currentIndex] = item;
        currentIndex +=1;
      }
    }
    return items;
  }

  function getOwnedNfts() public view returns (NftItem[] memory) {
    uint ownedItemsCount = ERC721.balanceOf(msg.sender);
    NftItem[] memory items = new NftItem[](ownedItemsCount);

    for (uint i = 0; i < ownedItemsCount; i++) {
      uint tokenId = tokenOfOwnerByIndex(msg.sender, i);
      NftItem storage item = _idToNftItem[tokenId];
      items[i] = item;
    }

    return items;
  }


    function _beforeTokenTransfer(
    address from, //0 adress
    address to,
    uint tokenId,
    uint256 batchSize
)    internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);

    // minting token
    if (from == address(0)) {
      _addTokenToAllTokensEnumeration(tokenId);
    } else if (from != to) {
      _removeTokenFromOwnerEnumeration(from, tokenId); //Remove token from one owner and **
    }

    if (to == address(0)) {
      _removeTokenFromAllTokensEnumeration(tokenId);
    } else if (to != from) {
      _addTokenToOwnerEnumeration(to, tokenId); //**Add token to another one
    }
  }

  function _addTokenToAllTokensEnumeration(uint tokenId) private {
    _idToNftIndex[tokenId] = _allNfts.length;// Create Mapping tokenId and allNfts(array)
    _allNfts.push(tokenId);//Pushing into the array
  }

  function _addTokenToOwnerEnumeration(address to, uint tokenId) private { // when we want to see all tokens under one owner
    uint length = ERC721.balanceOf(to);
    _ownedTokens[to][length] = tokenId;//Mapping between adress and tokenId
    _idToOwnedIndex[tokenId] = length;//Mapping tokenId and length
  }

  function _removeTokenFromOwnerEnumeration(address from, uint tokenId) private {
    uint lastTokenIndex = ERC721.balanceOf(from) - 1;
    uint tokenIndex = _idToOwnedIndex[tokenId];

    if (tokenIndex != lastTokenIndex) {
      uint lastTokenId = _ownedTokens[from][lastTokenIndex];

      _ownedTokens[from][tokenIndex] = lastTokenId;
      _idToOwnedIndex[lastTokenId] = tokenIndex;
    }

    delete _idToOwnedIndex[tokenId];
    delete _ownedTokens[from][lastTokenIndex];
  }

  function _removeTokenFromAllTokensEnumeration(uint tokenId) private {
    uint lastTokenIndex = _allNfts.length - 1;
    uint tokenIndex = _idToNftIndex[tokenId];
    uint lastTokenId = _allNfts[lastTokenIndex];

    _allNfts[tokenIndex] = lastTokenId;
    _idToNftIndex[lastTokenId] = tokenIndex;

    delete _idToNftIndex[tokenId];
    _allNfts.pop();
  }

}

