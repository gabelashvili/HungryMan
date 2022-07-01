import { useEffect } from 'react';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import { toggleModal } from '../../store/ducks/modalsDuck';
import { getUserAddresses } from '../../store/ducks/userDuck';
import AddAddress from './AddAddress';
import MyAddresses from './MyAddresses';

const Address = () => {
  const dispatch = useAppDispatch();
  const authedUserId = useSelector((state) => state.userReducer.user?.id);
  const { addAddress, myAddressList } = useSelector((state) => state.modalsReducer);
  const addresses = useSelector((state) => state.userReducer.addresses);

  useEffect(() => {
    if (addAddress.open && myAddressList.open) {
      dispatch(toggleModal({ key: 'myAddressList', open: false }));
    }
  }, [addAddress, myAddressList]);

  useEffect(() => {
    if (!addresses && authedUserId) {
      dispatch(getUserAddresses(authedUserId));
    }
  }, [addresses, authedUserId]);

  return (
    <>
      {addAddress.open && <AddAddress />}
      {myAddressList.open && <MyAddresses />}
    </>
  );
};

export default Address;
