import type { NFTMetaData } from "@/types/NFTItem";

const NFTCreationYear = ({ yearOfCreation } : { yearOfCreation: NFTMetaData }) => {
  return (
    <div className="nft-metadata--yearCreation">
      <span className="label">Creation Year</span>
      <span className="value">{yearOfCreation.value}</span>
    </div>
  )
}

export default NFTCreationYear;
