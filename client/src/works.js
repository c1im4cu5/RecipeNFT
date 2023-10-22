import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

function HowItWorks() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2 className="display-4">Blockchain, Avalanche and ERC721</h2>
            <p className="lead">At RecipeNFT, we take pride in providing a secure and reliable storage solution for your family treasures. To achieve this, we deploy our contract on the highly trusted and decentralized Avalanche blockchain. </p>
            <p className="lead">Our ERC721 contract offers seamless integration with Metamask, a very popular cryptocurrency wallet. You can add Avalanche to Metamask using the instructions available on <a href="https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche" target="_blank" rel="noopener noreferrer">Avalanche/Metamask Setup</a>. Upon successful addition of Avalanche to your Metamask wallet, you'll be able to freely mint your obituary on the blockchain!</p>
            <p className="text-center">Contract Address: <code>&0xf0B21A507774a85316e908e7669338Ab5b8A10eE&gt;</code></p>
            <p className="text-center">Contract Name: <code>&Recipes&gt;</code></p>
            <p className="text-center">Contract Symbol: <code>&RECIPE&gt;</code></p>
            <p className="lead">After successful minting of your recipe NFT, you'll receive a unique token ID. This token ID, in combination with the ERC721 contract address, will enable you to import the token to your Metamask wallet with ease. </p>
            <p className="lead">As part of our commitment to maintaining pinned hashes and general site maintenance, a charge of $5 USD in AVAX will be applied to each mint; which is subject to change based on the current AVAX to USD exchange rate and maintenance storage rates. Owners of the ParcaeArchetypes NFT collection (<a href="https://opensea.io/collection/parcaearchetypes" target="_blank" rel="noopener noreferrer">https://opensea.io/collection/parcaearchetypes</a>) that possess a rank of 1 or 2 will be exempted from paying the maintenance fee. So, get your hands on a ParcaeArchetypes NFT today and enjoy minting at no additional cost!</p>
            <p className="lead">At RecipeNFT, we believe in staying connected with our customers. If you have any questions, concerns or inquiries, feel free to reach out to us at <a href="mailto:info@parcae.io">info@parcae.io</a>.</p>

            <h2 className="display-4">How Our IPFS Integration Works</h2>
            <p className="lead">As part of our commitment to providing a comprehensive storage solution, we utilize IPFS to store the image and text of your recipe. We understand that the image of your recipe is precious and priceless, which is why we use IPFS to ensure its safety and security.</p>
            <p className="lead">When you upload an image to our platform, we automatically generate a hash for it, which we then add to a JSON parameter called "image". This JSON file also contains the recipe text and is sent to IPFS. The IPFS hash of the JSON file is then associated with a unique block from the Avalanche blockchain to create your recipe NFT.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HowItWorks;
