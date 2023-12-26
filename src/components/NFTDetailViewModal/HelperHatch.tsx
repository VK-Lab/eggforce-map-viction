import Balancer from 'react-wrap-balancer';
import { InfoCircle } from 'react-bootstrap-icons';

const HelperHatch = () => (
  <div className="helper-wrapper">
    <p className="helper">
      <Balancer ratio={0.125}>
        <InfoCircle className="icon--helper" />
        Want to <strong>change validator</strong>, but your is egg already
        incubating? Simply <strong>Stop Incubating & Undelegate</strong>, then{' '}
        <strong>start incubating again with the other validator</strong>. Please
        note that this process{' '}
        <strong>will take up approximately 14 hours (7 era)</strong>.
      </Balancer>
    </p>
  </div>
);

export default HelperHatch;
