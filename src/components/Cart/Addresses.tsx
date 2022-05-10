import { useState } from 'react';
import { useSelector } from '../../hooks/useSelector';
import Loader from '../../Icons/Loader';
import PlusIcon from '../../Icons/PlusIcon';
import AddAddress from '../shared/AddAddress';
import AddressForm from '../shared/AddressForm';
import Button from '../shared/Button';

const Addresses = ({ selectedAddress, setSelectedAddress }:
  {selectedAddress: number | null, setSelectedAddress: (data: any) => void}) => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const addresses = useSelector((state) => state.userReducer.addresses);
  return (
    <>
      <AddAddress show={showAdd} setShow={setShowAdd} />
      <h4 className="panel--title">აირჩიე მისამართი</h4>

      {addresses ? (
        <div className="radio-list">
          {addresses.map((el) => (
            <AddressForm
              key={el.id}
              data={el}
              checked={selectedAddress === el.id}
              handleClick={(data) => setSelectedAddress(data)}
              name={el.name}
            />
          ))}
        </div>
      ) : <Loader styles={{ margin: 'auto', width: 50 }} />}
      <Button handleClick={() => setShowAdd(true)} type="secondary" classes="button--icon-left ">
        <PlusIcon />
        მისამართის დამატება
      </Button>
    </>
  );
};

export default Addresses;
