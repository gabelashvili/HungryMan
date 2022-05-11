import { useEffect } from 'react';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import { toggleModal } from '../../store/ducks/modalsDuck';
import AddAddress from './AddAddress';
import MyAddresses from './MyAddresses';

const Address = () => {
  const dispatch = useAppDispatch();
  const { addAddress, myAddressList } = useSelector((state) => state.modalsReducer);

  useEffect(() => {
    if (addAddress && myAddressList) {
      dispatch(toggleModal('myAddressList'));
    }
  }, [addAddress, myAddressList]);
  return (
    <>
      {addAddress && <AddAddress />}
      {myAddressList && <MyAddresses />}
    </>
  );
};

export default Address;
