import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../hooks/useSelector';
import { buyCubes } from '../../store/ducks/cubesDuck';
import { AddressType } from '../../types/user';
import Addresses from '../Address/Addresses';
import Button from '../shared/Button';
import PaymentMethod from '../shared/PaymentMethod';
import SwitchBox from '../shared/SwitchBox';
import TextArea from '../shared/TextArea';
import TextField from '../shared/TextField';

const CubesCartRightSide = () => {
  const dispatch = useDispatch();
  const selectedCubes = useSelector((state) => state.cubesReducer.selectedCubes);
  const addresses = useSelector((state) => state.userReducer.addresses);
  const [comment, setComment] = useState<{enabled:boolean, value: string}>({
    enabled: false,
    value: '',
  });
  const [link, setLink] = useState<{enabled:boolean, value: string}>({
    enabled: false,
    value: '',
  });
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const handleBuy = () => {
    if (selectedAddress) {
      dispatch(buyCubes({
        data: {
          comment: comment.value,
          hasComment: comment.enabled,
          RedirectLink: comment.value,
          hasRedirectLink: comment.enabled,
          UserAddressId: selectedAddress,
          PurchaseDetails: selectedCubes,
        },
        file: 'test',
      }));
    }
  };

  useEffect(() => {
    if (addresses && addresses?.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0].id);
    }
  }, [addresses, selectedAddress]);

  return (
    <>
      <div className="panel--content">
        <div className="cart-switcher">
          <div className="form__group switcher">
            <div>
              <h4 className="panel--title">კომენტარის დამატება</h4>
              <span>ღირებულება შეადგენს 15 ლარს</span>
            </div>
            <SwitchBox name="comment-switch" checked={comment.enabled} handleChange={() => setComment({ ...comment, enabled: !comment.enabled })} />
          </div>
          <TextArea value={comment.value} handleChange={(val) => setComment({ ...comment, value: val })} />
        </div>
        <div className="cart-switcher">
          <div className="form__group switcher">
            <div>
              <h4 className="panel--title">ლინკის დამატება</h4>
              <span>ღირებულება შეადგენს 25 ლარს</span>
            </div>
            <SwitchBox name="link-switch" checked={link.enabled} handleChange={() => setLink({ ...link, enabled: !link.enabled })} />
          </div>
          <TextField inputName="link" value={link.value} handleChange={(val) => setLink({ ...link, value: val })} />
        </div>
        <div className="cart-switcher" style={{ marginTop: '24px' }}>
          <Addresses
            selectedAddress={selectedAddress}
            setSelectedAddress={(data: AddressType) => setSelectedAddress(data.id)}
          />
        </div>
        <div className="cart-switcher" style={{ marginTop: '24px' }}>
          <PaymentMethod />
        </div>
      </div>
      <div className="panel--footer">
        <div className="cart-details">
          <h4 className="cart-details--title">შეკვეთის დეტალები</h4>
          <div className="cart-details--item">
            <span className="cart-details--name">პროდუქტის ღირებულება</span>
            <span className="cart-details--value">1050.00₾</span>
          </div>
          <div className="cart-details--item">
            <span className="cart-details--name">პროდუქტის ღირებულება</span>
            <span className="cart-details--value">1050.00₾</span>
          </div>
          <div className="cart-details--sum">
            <span className="cart-details--sum__name">ჯამი</span>
            <span className="cart-details--sum__value">1050.00₾</span>
          </div>
          <Button handleClick={handleBuy}>შეკვეთის გაფორმება</Button>
        </div>
      </div>
    </>
  );
};

export default CubesCartRightSide;
