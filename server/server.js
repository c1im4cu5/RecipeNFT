const express = require('express');
const path = require('path');
const axios = require('axios');
const axiosRetry = require("axios-retry");
const qs = require('qs');
const querystring = require('querystring');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const IPFSClient = require('ipfs-http-client');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const FormData = require('form-data');
const fetch = require('node-fetch');
const multer = require('multer');
const cors = require('cors');
const { Buffer } = require('buffer');
//const { abi } = require('./abi.json');
const port = parseInt(process.env.PORT) || 8080;

//INFURA
const infuraApiKey = 'InfuraIPFSKey'
const infuraApiSecret = 'InfuraAPISecret'

//Currently active contract address, but should be switched
//your posted ERC721 contract address
const contractAddress = '0xf0B21A507774a85316e908e7669338Ab5b8A10eE';

//ABI for ERC721-Chargable.vy in ../contracts
const abi = [{"name":"Transfer","inputs":[{"name":"sender","type":"address","indexed":true},{"name":"receiver","type":"address","indexed":true},{"name":"tokenId","type":"uint256","indexed":true}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true},{"name":"approved","type":"address","indexed":true},{"name":"tokenId","type":"uint256","indexed":true}],"anonymous":false,"type":"event"},{"name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true},{"name":"operator","type":"address","indexed":true},{"name":"approved","type":"bool","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_baseURI","type":"string"},{"name":"_minter","type":"address"},{"name":"_beneficiary","type":"address"},{"name":"maintenance_wallet","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"supportsInterface","inputs":[{"name":"_interfaceID","type":"bytes32"}],"outputs":[{"name":"","type":"bool"}]},{"stateMutability":"payable","type":"fallback"},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"_owner","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"ownerOf","inputs":[{"name":"_tokenId","type":"uint256"}],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"getApproved","inputs":[{"name":"_tokenId","type":"uint256"}],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"isApprovedForAll","inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"outputs":[{"name":"","type":"bool"}]},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}]},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}]},{"stateMutability":"view","type":"function","name":"tokenURI","inputs":[{"name":"_tokenId","type":"uint256"}],"outputs":[{"name":"","type":"string"}]},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"tokenByIndex","inputs":[{"name":"_index","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"tokenOfOwnerByIndex","inputs":[{"name":"_owner","type":"address"},{"name":"_index","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"baseURI","inputs":[],"outputs":[{"name":"","type":"string"}]},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"safeTransferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"safeTransferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"changeMaintenanceWallet","inputs":[{"name":"to","type":"address"}],"outputs":[{"name":"","type":"bool"}]},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_approved","type":"address"},{"name":"_tokenId","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"setApprovalForAll","inputs":[{"name":"_operator","type":"address"},{"name":"_approved","type":"bool"}],"outputs":[]},{"stateMutability":"payable","type":"function","name":"mint","inputs":[{"name":"_to","type":"address"},{"name":"_tokenURI","type":"string"},{"name":"maintenance_fee","type":"uint256"}],"outputs":[{"name":"","type":"bool"}]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"burn","inputs":[{"name":"_tokenId","type":"uint256"}],"outputs":[]}]

//Avalanche URL for WEB3 - MAIN NET
const WEB3_URL = 'https://api.avax.network/ext/bc/C/rpc';

// Instantiate Web3 client
const PRICE_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18';

const METADATA_TEMPLATE = {
  name: '',
  description: '',
  image: '',
};

// Instantiate IPFS client
const ipfsInfura = IPFSClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // The uploads directory must exist
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create upload middleware using the storage configuration
const upload = multer({ storage: storage });

async function getMaintenanceFee() {
  const response = await fetch(PRICE_URL);
  const data = await response.json();
  const avaxPrice = data['avalanche-2']['usd'];
  const maintenanceFeeUSD = 5;
  const maintenanceFeeAVAX = (5 / avaxPrice).toFixed(2);
  return maintenanceFeeAVAX;
}

async function getTransactionTokenId(hash) {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_URL));
    const transaction = await web3.eth.getTransaction(hash);
    const contract = new web3.eth.Contract(abi, contractAddress);
    const events = await contract.getPastEvents('Transfer', {
      fromBlock: transaction.blockNumber,
      toBlock: transaction.blockNumber,
      filter: { from: transaction.from }
    });

    if (events.length > 0) {
      const tokenId = events[0].returnValues.tokenId;
      console.log("Token ID: ", tokenId);
      return tokenId;
    } else {
      console.log("No Transfer events found");
    }

  } catch (error) {
    console.error("Error getting transaction: ", error);
    throw error;
  }
}

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
app.use(cors());

// Serve the static files from the uploads folder
app.use('/uploads', express.static('uploads'));

// Add middleware to add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://recipenft.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/hash', async (req, res) => {
  try{
    const {hash} = req.body;
    setTimeout(async () => {
      const tokenId = await getTransactionTokenId(hash);
      res.status(200).json({contract: contractAddress, tokenId: tokenId});
    }, 20000);
    //const tokenId = setTimeout(await getTransactionTokenId(hash)
  }catch(error){
    console.error(error)
    res.status(400).json({error: 'Unable to acquire Token ID from Avalanche. Please contact us for assistance!'})
  }
});

// Mint NFT
app.post('/api/mint', upload.single("file"), async (req, res) => {

  console.log("MINT INITIATED");
  try {
    const formData = new FormData();
    const { file, body } = req;
    const data = JSON.parse(body.metadata);

    const { name, message, address} = data

    // validate form fields
    if (!file || !name || !message) {
      return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    const axiosFile = fs.createReadStream(`./uploads/${file.filename}`);

    const url = 'https://ipfs.infura.io:5001/api/v0/add';
    //const formData = new FormData();
    formData.append('file', axiosFile);

    const auth = `${infuraApiKey}:${infuraApiSecret}`;
    let headers = {
      Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
      ...formData.getHeaders(),
    };

    axiosRes = await axios.post(url, formData, { headers });
    const { Hash } = axiosRes.data;

    // Generate tokenURI
    //console.log("Generating Image URL");
    const imageURL = `ipfs://${Hash}`;
    console.log("Image URL: ", imageURL);

    console.log("Building metadata")
    // Upload metadata to IPFS
    const metadata = { ...METADATA_TEMPLATE, name: name, description: message, image: imageURL };
    console.log("Metadata: ", metadata);
    const metadataString = JSON.stringify(metadata);

    //USE BUFFER IF YOU"RE PASSING LARGE AMOUNTS OF DATA -- NOT NEEDED
    //const buffer = Buffer.from(JSON.stringify(metadata));
    const metadataForm = new FormData();
    metadataForm.append('file', metadataString);

    headers = {
      Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
      ...metadataForm.getHeaders(),
    };

    const metadataResponse = await axios.post(url, metadataForm, { headers });
    const metaHash = metadataResponse.data.Hash;
    //const tokenURI = `ipfs://${metaHash}`;
    const tokenURI = metaHash;
    console.log("TOKEN URI: ", tokenURI);
    const maintenanceFee = await getMaintenanceFee();
    console.log("FEE: ", maintenanceFee);
    console.log("Fee Type: ", typeof maintenanceFee);
    const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_URL));

    // Set the account that will send the transaction
    const contract = new web3.eth.Contract(abi, contractAddress);
    const nonce = await web3.eth.getTransactionCount(address);
    const currentGasPrice = await web3.eth.getGasPrice();
    const weiMaintenanceFee = parseInt(web3.utils.toWei(maintenanceFee, 'ether'));
    const bgMaintenanceFee = new BigNumber(weiMaintenanceFee);

    const symbol = await contract.methods.symbol().call();
    console.log("SYMBOL: ", symbol);


    // Estimate the gas limit for the transaction
    const estimatedGas = await contract.methods.mint(address, tokenURI, bgMaintenanceFee).estimateGas({ from: address, value: web3.utils.toHex(web3.utils.toWei(maintenanceFee, "ether"))});
    console.log("ESTIMATED GAS: ", estimatedGas);

    // Set the gas limit to be 30% more than the estimated gas for minting purposes (10% is generally fine)
    const gasLimit = Math.round(estimatedGas * 1.2);
    console.log("GAS LIMIT: ", gasLimit);

    // Set the gas price to the current gas price
    const gasPrice = currentGasPrice;
    console.log("GAS PRICE: ", gasPrice);

    fs.unlink(`./uploads/${file.filename}`, (error) => {
      if (error) {
        console.log('Error deleting file:', error);
      } else {
        console.log('File deleted successfully.');
      }
    });

    res.status(200).json({
      Success: true,
      address: address,
      contract: contractAddress,
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      value: web3.utils.toHex(web3.utils.toWei(maintenanceFee, "ether")),
      tokenURI: tokenURI,
      abi: abi,
      web3_url: WEB3_URL,
      fee: bgMaintenanceFee
      });
    } catch (error) {
      console.error(error);
      console.log(error.data)
      res.status(500).json({ error: 'An error occurred while minting the NFT.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
