import Table from 'react-bootstrap/Table';
import { Heading } from '@/components/Typography';
import { VICValue } from '@/components/CSPRValue';

const TablePackageSummary = ({ data }: any) => {
  return (
    <div className="table-package--wrapper">
      <Heading h={5}>Package Summary</Heading>
      <div className="table-wrapper">
        <Table className="table-result" striped hover variant="dark">
          <tbody>
            <tr>
              <td>Package</td>
              <td>{data.packageLabel}</td>
            </tr>
            <tr>
              <td>Package value</td>
              <td>
                <VICValue value={data.packagePrice} />
              </td>
            </tr>
            <tr>
              <td>Minting Fee</td>
              <td>
                <VICValue value={data.amountFee} />
              </td>
            </tr>
            <tr>
              <td>Locked amount (*)</td>
              <td>
                <VICValue value={data.amountLocked} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablePackageSummary;
