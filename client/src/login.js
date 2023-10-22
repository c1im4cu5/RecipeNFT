import React, { useState } from "react";
//import axios from "axios";
import Web3 from "web3";
import { Container, Row, Col, Modal } from "react-bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// chainId: "0xa869", -- Testnet
// chainId: "0xa86a", -- Main

const LoginForm = () => {
  const [address, setAddress] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xa86a" }],
        });
        const accounts = await web3.eth.requestAccounts();
        setAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // submit form data to server
    setShowPopup(true); // Show the pop-up
    console.log("Submitted:", { file, name, message });
    if (file && name && message) {
      const formData = new FormData();
      formData.append('file', file);
      const metadata = { name, message, address };
      formData.append("metadata", JSON.stringify(metadata));

      fetch("https://recipenft-vmkkkjyqiq-uc.a.run.app/api/mint", {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(async data => {
          console.log(data);
          console.log("URL: ", data.web3_url);
          console.log("Address: ", data.address);
          console.log("Contract: ", data.contract);

          const web3 = new Web3(new Web3.providers.HttpProvider(data.web3_url));

          // Set the account that will send the transaction
          //web3.eth.accounts.wallet.add(address);

          const contract = new web3.eth.Contract(data.abi, data.contract);
          //const nonce = await web3.eth.getTransactionCount(address);

          const txData = {
            from: data.address,
            to: data.contract,
            gas: data.gasLimit,
            gasPrice: data.gasPrice,
            value: data.value,
            data: contract.methods.mint(data.address, data.tokenURI, data.fee).encodeABI()
          };

          const signedTransaction = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [txData]
          });

          console.log("Transaction hash: ", signedTransaction);

          fetch("https://recipenft-vmkkkjyqiq-uc.a.run.app/api/hash", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({hash: signedTransaction})
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            console.log(data);
            if (data && data.contract && data.tokenId) {
              const redirectUrl = `/token/${data.contract}/${data.tokenId}`;
              setShowPopup(false); // Close the pop-up
              window.location.replace(redirectUrl);
            }
          })
          .catch(error => {
            setShowPopup(false); // Close the pop-up
            console.error('Error:', error);
          });

        })
        .catch(error => console.error(error));

    } else {
        alert("Please fill out all required fields.");
      }
  };

  return (
      <Container>
        <Row>
          <Col>
            <h1>Immortalize your loved one in seconds!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {!address && (
                <button className="btn btn-primary" onClick={handleLogin}>Connect Metamask Wallet</button>
              )}
              {address && (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="file">Picture:</label>
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                    {file && (
                      <div>
                        <p>Selected File: {fileName}</p>
                        <img src={URL.createObjectURL(file)} alt="Preview" />
                      </div>
                    )}
                  </div>
                  <br></br>
                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>
                  <br></br>
                  <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      style={{width:'600px', height:'800px'}}
                      required
                    />
                  </div>
                  <br></br>
                  <button className="btn btn-primary" type="submit">Submit</button>
                </form>
              )}
              <p></p>
            </div>
          </Col>
        </Row>
        <Row>
          <Modal show={showPopup} onHide={() => setShowPopup(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Processing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Please wait while the process runs.</p>
              <p>We will be sending a message to your wallet to confirm the transaction. After, we'll mint your token and provide you with the Token ID and contract address. This message will self destruct upon completion!</p>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>

  );
};

export default LoginForm;
