import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { base64ToFile } from '../../helpers';
import { useSelector } from '../../hooks/useSelector';
import { buyCubes, setSelectedCubesInfo } from '../../store/ducks/cubesDuck';
import Addresses from '../Address/Addresses';
import Button from '../shared/Button';
import PaymentMethod from '../shared/PaymentMethod';
import SwitchBox from '../shared/SwitchBox';
import TextArea from '../shared/TextArea';
import TextField from '../shared/TextField';
import { AddressType } from '../../types/user';

const CubesCartRightSide = ({
  selectedCubes, giftOneProp, giftTwoProp,
}: PropsTypes) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state) => state.modalsReducer.myAddressList.payload) as AddressType | null;
  const [loading, setLoading] = useState<boolean>(false);
  const [mustGenerateInvoice, setMustGenerateInvoice] = useState<boolean>(false);
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
    if (addresses?.length === 0) {
      toast.error('???????????????????????? ???????????????????????????');
      return;
    }
    if (((totalPrice()) > 50 && (totalPrice()) < 100 && !giftOneProp)
     || ((totalPrice()) >= 100 && (!giftOneProp || !giftTwoProp))) {
      toast.error('????????????????????? ???????????????????????? ?????????????????????????????????');
    } else if (addresses && addresses?.length > 0 && base64) {
      setLoading(true);
      const file = await base64ToFile(base64);
      saveAs(file, 'image');
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
          RedirectLink: link.value,
          hasRedirectLink: link.enabled,
          UserAddressId: selectedAddress?.id || addresses[0].id,
          PurchaseDetails: selectedCubes,
          FullAmount: Number(totalPrice()),
          PurchaseGiftDetails: gifts,
          MustGenerateInvoice: mustGenerateInvoice,
        },
        file,
      }, {
        success: (url: string) => {
          if (!mustGenerateInvoice) {
            window.location.href = url;
          } else {
            navigate('/invoice');
          }
          // setLoading(false);
        },
        error: () => setLoading(false),
      }));
    }
  };

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
              <h4 className="panel--title">?????????????????????????????? ????????????????????????</h4>
              <span>
                ?????????????????????????????? ????????????????????????
                {' '}
                {cubesParams?.commentPrice || 0}
                {' '}
                ????????????
              </span>
            </div>
            <SwitchBox name="comment-switch" checked={comment.enabled} handleChange={() => setComment({ ...comment, enabled: !comment.enabled })} />
          </div>
          <TextArea value={comment.value} handleChange={(val) => setComment({ ...comment, value: val })} />
        </div>
        <div className="cart-switcher">
          <div className="form__group switcher">
            <div>
              <h4 className="panel--title">?????????????????? ????????????????????????</h4>
              <span>
                ?????????????????????????????? ???????????????????????????
                {' '}
                {cubesParams?.redirectUrlAdditionalPercent}
                -??? ???????????????????????????
              </span>
            </div>
            <SwitchBox name="link-switch" checked={link.enabled} handleChange={() => setLink({ ...link, enabled: !link.enabled })} />
          </div>
          <TextField inputName="link" value={link.value} handleChange={(val) => setLink({ ...link, value: val })} />
        </div>
        <div className="cart-switcher" style={{ marginTop: '24px' }}>
          <Addresses />
        </div>
        <div className="cart-switcher" style={{ marginTop: '24px' }}>
          <PaymentMethod
            mustGenerateInvoice={mustGenerateInvoice}
            setMustGenerateInvoice={setMustGenerateInvoice}
          />
        </div>
      </div>
      <div className="panel--footer">
        <div className="cart-details">
          <h4 className="cart-details--title">???????????????????????? ????????????????????????</h4>
          <div className="cart-details--item">
            <span className="cart-details--name">??????????????????????????? ??????????????????????????????</span>
            <span className="cart-details--value">
              {totalPrice()}
              ???
            </span>
          </div>
          <div className="cart-details--sum">
            <span className="cart-details--sum__name">????????????</span>
            <span className="cart-details--sum__value">
              {totalPrice()}
              ???
            </span>
          </div>
          <Button handleClick={handleBuy} loading={loading}>???????????????????????? ???????????????????????????</Button>
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
