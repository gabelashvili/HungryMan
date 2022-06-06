import { generatePath } from '../../helpers';
import Modal from '../Modal';

const UserDashboardModal = ({
  selectedTab, open, handleClose, data,
}: PropsType) => {
  console.log(data);
  return (
    <Modal open={open} handleClose={handleClose} modalTitle="ინფორმაცია პროდუქტზე">
      <ul className="product-info">
        {selectedTab === 0 ? (
          <li className="product-info--item">
            <picture className="product-info--image">
              <img src={generatePath(data?.imageUrl || '')} alt="t" />
            </picture>
          </li>
        ) : (
          <>
            <li className="product-info--item">
              <picture className="product-info--image">
                <img src={generatePath(data?.item?.medias[0]?.url || '')} alt="t" />
              </picture>
            </li>
            <li className="product-info--item">
              <span className="product-info--title">სტატუსი:</span>
              <span className="product-info--calue">{generateSentStatusLabel(data?.itemPurchase.itemSendStatus)}</span>
            </li>
          </>
        )}
      </ul>
    </Modal>
  );
};

export default UserDashboardModal;

interface PropsType {
  selectedTab: number,
  open: boolean, handleClose: () => void,
  data: any | null
}

const generateSentStatusLabel = (val?: 1|2|3|4) => {
  if (val === 1 || val === 3) {
    return 'შეკვეთა მალე გამოიგზვანება';
  }
  if (val === 2) {
    return 'შეკვეთა გამოიგზავნა';
  }
  if (val === 4) {
    return 'შეკვეთა ჩაბარებულია';
  }
  return '';
};
