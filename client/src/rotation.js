import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { abi, contractAddress, pinataStart, pinataEnd} from './appConfig';

const WEB3_URL = 'https://api.avax.network/ext/bc/C/rpc';
const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_URL));
const contract = new web3.eth.Contract(abi, contractAddress);

const ImageRotation = () => {
  const [currentTokenURI, setCurrentTokenURI] = useState('');
  const [currentImageURL, setCurrentImageURL] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [tokenID, setTokenID] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const supply = await contract.methods.totalSupply().call();
      setTokenID(supply)
      if (supply > 0) {
        const tokenURI = await contract.methods.tokenURI(supply).call();
        setCurrentTokenURI(tokenURI.replace('ipfs://', ''));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (currentTokenURI !== '') {
        try {
          const hashURL = `${pinataStart}${currentTokenURI}${pinataEnd}`;
          const response = await fetch(hashURL);
          const jsonTokenData = await response.json();
          const MAX_TEXT_LENGTH = 500;
          let displayedText = jsonTokenData.description;

          if (jsonTokenData.description.length > MAX_TEXT_LENGTH) {
            displayedText = jsonTokenData.description.slice(0, MAX_TEXT_LENGTH) + "...";
          }

          setCurrentImageURL(`${pinataStart}${jsonTokenData.image.replace('ipfs://', '')}${pinataEnd}`);
          setCurrentText(displayedText);
          setCurrentName(jsonTokenData.name);
        } catch (error) {
          console.log('Error fetching token data:', error);
        }
      }
    };
    fetchTokenData();
  }, [currentTokenURI]);

  return (
    <div className="header-box">
      <img src={currentImageURL} alt="" />
      <p>Token ID: {tokenID}</p>
      <p>{currentName} </p>
      <p>{currentText}</p>
    </div>
  );
};

export default ImageRotation;
