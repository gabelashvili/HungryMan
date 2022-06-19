import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { base64ToFile } from '../../helpers';
import { useSelector } from '../../hooks/useSelector';
import { buyCubes, setSelectedCubesInfo } from '../../store/ducks/cubesDuck';
import { AddressType } from '../../types/user';
import Addresses from '../Address/Addresses';
import Button from '../shared/Button';
import PaymentMethod from '../shared/PaymentMethod';
import SwitchBox from '../shared/SwitchBox';
import TextArea from '../shared/TextArea';
import TextField from '../shared/TextField';

const CubesCartRightSide = ({
  selectedCubes, giftOneProp, giftTwoProp,
}: PropsTypes) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const base64 = useSelector((state) => state.cubesReducer.selectedCubesInfo?.base64);
  const cubesParams = useSelector((state) => state.cubesReducer.initialData);
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

  const totalPrice = () => {
    let price = 0;
    if (cubesParams && selectedCubes) {
      price += selectedCubes.length * cubesParams.squarePrice;
      if (comment.enabled) {
        price += cubesParams.commentPrice;
      }
      if (link.enabled) {
        price += selectedCubes.length * cubesParams.squarePrice * (cubesParams.redirectUrlAdditionalPercent / 100);
      }
    }
    return Number(price.toFixed(2));
  };

  const handleBuy = async () => {
    if (((totalPrice()) > 50 && (totalPrice()) < 100 && !giftOneProp)
     || ((totalPrice()) >= 100 && (!giftOneProp || !giftTwoProp))) {
      toast.error('აირჩიეთ საჩუქრის პარამეტრები');
    } else if (selectedAddress && base64) {
      setLoading(true);
      const file = await base64ToFile(base64);
      const gifts = [];
      if (giftOneProp) {
        gifts.push({
          GiftId: giftOneProp.id,
          size: giftOneProp.value,
        });
      }
      if (giftTwoProp) {
        gifts.push({
          GiftId: giftTwoProp.id,
          size: giftTwoProp.value,
        });
      }
      dispatch(buyCubes({
        data: {
          comment: comment.value,
          hasComment: comment.enabled,
          RedirectLink: comment.value,
          hasRedirectLink: comment.enabled,
          UserAddressId: selectedAddress,
          PurchaseDetails: selectedCubes,
          FullAmount: Number(totalPrice()),
          PurchaseGiftDetails: gifts,
        },
        file,
      }, {
        success: (url: string) => {
          window.location.href = url;
          // setLoading(false);
        },
        error: () => setLoading(false),
      }));
    }
  };

  useEffect(() => {
    if (addresses && addresses?.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0].id);
    }
  }, [addresses, selectedAddress]);

  useEffect(() => {
    const res = totalPrice();
    dispatch(setSelectedCubesInfo({ key: 'totalPrice', value: Number(res) }));
  }, [cubesParams, comment, link]);

  return (
    <>
      <div className="panel--content">
        <div className="cart-switcher">
          <div className="form__group switcher">
            <div>
              <h4 className="panel--title">კომენტარის დამატება</h4>
              <span>
                ღირებულება შეადგენს
                {' '}
                {cubesParams?.commentPrice || 0}
                {' '}
                ლარს
              </span>
            </div>
            <SwitchBox name="comment-switch" checked={comment.enabled} handleChange={() => setComment({ ...comment, enabled: !comment.enabled })} />
          </div>
          <TextArea value={comment.value} handleChange={(val) => setComment({ ...comment, value: val })} />
        </div>
        <div className="cart-switcher">
          <div className="form__group switcher">
            <div>
              <h4 className="panel--title">ლინკის დამატება</h4>
              <span>
                ღირებულება გაიზრდება
                {' '}
                {cubesParams?.redirectUrlAdditionalPercent}
                -ი პროცენტით
              </span>
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
            <span className="cart-details--value">
              {totalPrice()}
              ლ
            </span>
          </div>
          <div className="cart-details--sum">
            <span className="cart-details--sum__name">ჯამი</span>
            <span className="cart-details--sum__value">
              {totalPrice()}
              ლ
            </span>
          </div>
          <Button handleClick={handleBuy} loading={loading}>შეკვეთის გაფორმება</Button>
        </div>
      </div>
    </>
  );
};

export default CubesCartRightSide;

interface PropsTypes {
  selectedCubes:number[],
  giftOneProp: {value: string, id:number} | null,
  giftTwoProp:{value: string, id:number} | null
}
