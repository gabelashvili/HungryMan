import { Dispatch, SetStateAction, useState } from 'react';
import ClearIcon from '../../Icons/ClearIcon';
import PlusIcon from '../../Icons/PlusIcon';
import AddAddress from '../shared/AddAddress';
import AddressForm from '../shared/AddressForm';
import Button from '../shared/Button';

const MyAddresses = ({ show, setShow }: {show: boolean, setShow: Dispatch<SetStateAction<boolean>>}) => {
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState<boolean>(false);
  return (
    <>
      <AddAddress show={showAddNewAddressModal} setShow={setShowAddNewAddressModal} />
      { show && (
      <>
        <div className="modal modal--small">
          <div className="modal--header">
            <h3 className="modal--title">ჩემი მისამართები</h3>
            <Button handleClick={() => setShow(false)} type="text" classes="button--icon is-rounded button-pull-right"><ClearIcon /></Button>
          </div>
          <div className="modal--content">
            <div className="radio-list">
              <AddressForm />
            </div>
            <Button
              type="secondary"
              classes=" button--icon-left button--secondary"
              handleClick={() => {
                setShow(false);
                setShowAddNewAddressModal(true);
              }}
            >
              <PlusIcon />
              მისამართის დამატება
            </Button>
          </div>
        </div>
        <div className="overlay" />
      </>
      )}
    </>
  );
};

export default MyAddresses;
