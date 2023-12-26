import { useState, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import NFTDragonImage from '@/assets/images/img--nft-benefits.webp';

export function NFTBenefitMobileModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="nft-utility--mobile-modal"
    >
      <Modal.Header closeVariant="white" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          NFT Benefit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.copy}</p>
      </Modal.Body>
    </Modal>
  );
}

const NFTBenefit = () => {
  const [modalShow, setModalShow] = useState(false);
  const [currPoint, setCurrentPoint] = useState(0);
  const onClickHandler = useCallback((index: number) => {
    setCurrentPoint(index);
    setModalShow(true);
  }, []);
  const data = [
    {
      copy: `Extra Rewards from Validators`,
    },
    {
      copy: `Premium Pass to Metaverse`,
    },
    {
      copy: `Exclusive benefits from EggForce and Brands`,
    },
    {
      copy: `Name label on the NFT - Unique privilege for early EggForce investors`,
    },
  ];

  return (
    <Row>
      <Col md={12}>
        <div className="nft-utility--primary-wrapper dragon-wrapper">
          <NFTBenefitMobileModal
            size="sm"
            show={modalShow}
            onHide={() => setModalShow(false)}
            copy={data[currPoint].copy}
          />
          <div className="nft-utility--primary-image dragon-image">
            <img
              alt="EggForce NFT Benefit"
              className="nft-utility--big-dragon"
              src={NFTDragonImage}
            />
            {data.map(({ copy }, index) => (
              <div
                key={`benefit-${index}`}
                className={`nft-benefit--point point-${index + 1}`}
              >
                <span className="text">{copy}</span>
                <span className="pointer">
                  <div className="btn-pulse point-pulse desktop" />
                </span>
                <button
                  onClick={() => onClickHandler(index)}
                  className="btn-pulse point-pulse mobile"
                >
                  <span />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default NFTBenefit;
