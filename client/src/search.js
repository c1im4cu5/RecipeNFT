import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Web3 from 'web3';
import { abi, contractAddress, pinataStart, pinataEnd} from './appConfig';


const web3 = new Web3('https://api.avax.network/ext/bc/C/rpc');
const contract = new web3.eth.Contract(abi, contractAddress);

const Search = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenId, setTokenId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoad, setErrorLoad] = useState('');
  const [name, setName] = useState('');

  const supply = async () =>{
    const tSupply = await contract.methods.totalSupply().call();
    setTotalSupply(tSupply);
  };
  supply();

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const uri = await contract.methods.tokenURI(tokenId).call();
      const tokenURI = uri.replace('ipfs://', '');
      const hashURL = `${pinataStart}${tokenURI}${pinataEnd}`;
      const response = await fetch(hashURL);
      const metadata = await response.json();

      setImageUrl(`${pinataStart}${metadata.image.replace('ipfs://', '')}${pinataEnd}`);
      setDescription(metadata.description);
      setName(metadata.name);
    } catch (error) {
      console.error(error);
      setErrorLoad("We could not find the obituary. Please try again or contact us for assistancce.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container"> {/* Wrap the entire component in a container div */}
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Welcome to the recipe search!</h1>
            <p className="search-description lead">Here you can learn another recipe, culture and family legacy. Our database currently holds {totalSupply} recipes, and we're constantly adding more. Simply enter the token ID of the recipe you wish to search for and click the "Search" button. Our system will retrieve the recipe and display the image and description associated with it. Take a moment to explore and discover.</p>
            <div className="search-form"> {/* Wrap the input and button elements in a div */}
              <input type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
              <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Search'}
              </button>
            </div>
            {imageUrl && (
              <div className="search-results"> {/* Wrap the image and description in a div */}
                <img src={imageUrl} alt="" />
                <p>{name}</p>
                <p>{description}</p>
                <p>{errorLoad}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Search;
