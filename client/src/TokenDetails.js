import { useParams } from "react-router-dom";

function TokenDetails() {
  const { contract, tokenId } = useParams();
  let error = null;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Token Details</h1>
      <p>Contract Address: {contract}</p>
      <p>Token ID: {tokenId}</p>
    </div>
  );
}

export default TokenDetails;
