# RecipeNFT
A fun full stack project based in Web3, Vyper, Avalanche Blockchain, React (Frontend) and Express.js (Backend).

## Basic Concept
An ERC721 contract with a custom chargable mint function (see /contracts/ERC721-Chargable.vy smart contract). Site was originally built as an example of allowing users to mint tokens of their favorite family recipes. Users can/could attach a photo along with text for a title and description. Site will generate the IPFS hash for the photo and text, build the metadata for the ERC721 mint and custom mint their recipe for a fee that is attached to the mint and sent to the owner's wallet address.

## Implementation
While the code was originally implemented for RecipeNFT.io, C1im4cu5 took it down after a couple of months. It ran via GCP Cloud Run with a link to Github for CI/CD.

User will need to alter the following:

- [ ] Infura API and Secret
- [ ] Contract is currently linked to deployed contract @ 0xf0B21A507774a85316e908e7669338Ab5b8A10eE
- [ ] Web3 references to Avalanche Mainnet

## Contributing
Please ask if you'd like to contribute. I will NOT be adding to the repository.