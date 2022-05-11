import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import Loader from '../../Icons/Loader';
import PlusIcon from '../../Icons/PlusIcon';
import { toggleModal } from '../../store/ducks/modalsDuck';
import AddressLabel from '../Address/AddressLabel';
import Button from '../shared/Button';

const Addresses = ({ selectedAddress, setSelectedAddress }:
  {selectedAddress: number | null, setSelectedAddress: (data: any) => void}) => {
  const dispatch = useAppDispatch();
  const addresses = useSelector((state) => state.userReducer.addresses);
  return (
    <>
      <h4 className="panel--title">აირჩიე მისამართი</h4>

      {addresses ? (
        <div className="radio-list">
          {addresses.map((el) => (
            <AddressLabel
              key={el.id}
              data={el}
              checked={selectedAddress === el.id}
              handleClick={(data) => setSelectedAddress(data)}
              name={el.name}
            />
          ))}
        </div>
      ) : <Loader styles={{ margin: 'auto', width: 50 }} />}
      <Button handleClick={() => dispatch(toggleModal('addAddress'))} type="secondary" classes="button--icon-left ">
        <PlusIcon />
        მისამართის დამატება
      </Button>
    </>
  );
};

export default Addresses;
