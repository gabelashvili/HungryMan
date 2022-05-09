import Modal from '../Modal';

const UserDashboardModal = ({ selectedTab, open, handleClose }: PropsType) => {
  return (
    <Modal open={open} handleClose={handleClose} modalTitle="ინფორმაცია პროდუქტზე">
      <ul className="product-info">
        {selectedTab === 0 ? (
          <>
            <li className="product-info--item">
              <span className="product-info--title">სტატუსი:</span>
              <span className="product-info--calue">შეკვეთა ჩაბარებულია</span>
            </li>
            <li className="product-info--item">
              <span className="product-info--title">სტატუსი:</span>
              <span className="product-info--calue">შეკვეთა ჩაბარებულია</span>
            </li>
            <li className="product-info--item">
              <span className="product-info--title">სტატუსი:</span>
              <span className="product-info--calue">შეკვეთა ჩაბარებულია</span>
            </li>
          </>
        ) : (
          <>
            <li className="product-info--item">
              <picture className="product-info--image">
                <img src="" alt="t" />
              </picture>
            </li>
            <li className="product-info--item">
              <span className="product-info--title">სტატუსი:</span>
              <span className="product-info--calue">შეკვეთა ჩაბარებულია</span>
            </li>
            <li className="product-info--item">
              <span className="product-info--title">სტატუსი:</span>
              <span className="product-info--calue">შეკვეთა ჩაბარებულია</span>
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
  open: boolean, handleClose: () => void
}
