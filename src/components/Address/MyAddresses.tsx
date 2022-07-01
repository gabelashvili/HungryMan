import {
  useEffect,
} from 'react';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import ClearIcon from '../../Icons/ClearIcon';
import Loader from '../../Icons/Loader';
import PlusIcon from '../../Icons/PlusIcon';
import { toggleModal } from '../../store/ducks/modalsDuck';
import { getUserAddresses } from '../../store/ducks/userDuck';
import Button from '../shared/Button';
import AddressLabel from './AddressLabel';

const MyAddresses = () => {
  const dispatch = useAppDispatch();
  const addresses = useSelector((state) => state.userReducer.addresses);
  const authedUserId = useSelector((state) => state.userReducer.user?.id);

  useEffect(() => {
    if (authedUserId && !addresses) {
      dispatch(getUserAddresses(authedUserId));
    }
  }, [authedUserId, addresses]);
  return (
    <>
      <div className="modal modal--small">
        <div className="modal--header">
          <h3 className="modal--title">ჩემი მისამართები</h3>
          <Button
            handleClick={() => dispatch(toggleModal({ key: 'myAddressList', open: false }))}
            type="text"
            classes="button--icon is-rounded button-pull-right"
          >
            <ClearIcon />

          </Button>
        </div>
        <div className="modal--content">
          {addresses ? (
            <>
              <div className="radio-list">
                {addresses.map((el, i) => <AddressLabel data={el} key={el.id} name={el.name + el.id + i} removable />)}
              </div>
              <Button
                type="secondary"
                classes=" button--icon-left button--secondary"
                handleClick={() => {
                  dispatch(toggleModal({ key: 'addAddress', open: true }));
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
  );
};

export default MyAddresses;
