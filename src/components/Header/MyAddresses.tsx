import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import ClearIcon from '../../Icons/ClearIcon';
import Loader from '../../Icons/Loader';
import PlusIcon from '../../Icons/PlusIcon';
import { getUserAddresses } from '../../store/ducks/userDuck';
import AddAddress from '../shared/AddAddress';
import AddressForm from '../shared/AddressForm';
import Button from '../shared/Button';

const MyAddresses = ({ show, setShow }: {show: boolean, setShow: Dispatch<SetStateAction<boolean>>}) => {
  const dispatch = useAppDispatch();
  const addresses = useSelector((state) => state.userReducer.addresses);
  const authedUserId = useSelector((state) => state.userReducer.user?.id);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState<boolean>(false);

  useEffect(() => {
    if (authedUserId) {
      dispatch(getUserAddresses(authedUserId));
    }
  }, [authedUserId]);
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
            {addresses ? (
              <>
                <div className="radio-list">
                  {addresses.map((el) => <AddressForm data={el} key={el.id} />)}
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
              </>
            ) : <Loader styles={{ margin: 'auto', width: 50 }} />}
          </div>
        </div>
        <div className="overlay" />
      </>
      )}
    </>
  );
};

export default MyAddresses;
