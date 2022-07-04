import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import Loader from '../../Icons/Loader';
import PlusIcon from '../../Icons/PlusIcon';
import { toggleModal } from '../../store/ducks/modalsDuck';
import AddressLabel from './AddressLabel';
import Button from '../shared/Button';
import { AddressType } from '../../types/user';

const Addresses = () => {
  const dispatch = useAppDispatch();
  const addresses = useSelector((state) => state.userReducer.addresses);
  const selectedAddress = useSelector((state) => state.modalsReducer.myAddressList.payload) as AddressType | null;
  return (
    <>
      <h4 className="panel--title">აირჩიე მისამართი</h4>

      {addresses ? (
        <div className="radio-list">

          <AddressLabel
            data={selectedAddress || addresses[0]}
            name={selectedAddress?.name || addresses[0]?.name}
            disableSelect
          />
        </div>
      ) : <Loader styles={{ margin: 'auto', width: 50 }} />}
      <Button
        handleClick={() => dispatch(toggleModal({ key: 'myAddressList', open: true }))}
        type="secondary"
        classes="button--icon-left "
      >
        <PlusIcon />
        მისამართები
      </Button>
    </>
  );
};

export default Addresses;
