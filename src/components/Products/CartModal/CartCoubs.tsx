import { useEffect } from 'react';
import { generateFile, getBase64Test } from '../../../helpers';
import { useAppDispatch, useSelector } from '../../../hooks/useSelector';
import RemoveIcon from '../../../Icons/RemoveIcon';
import { setBase64 } from '../../../store/ducks/cubesDuck';
import Button from '../../shared/Button';

const CartCoubs = ({ show }:{show:boolean}) => {
  const dispatch = useAppDispatch();
  const data = useSelector((state) => state.cubesReducer.selectedCubesInfo);
  const updateImageBase64 = async () => {
    const el = document.getElementById('root-svg');
    if (el) {
      const file = await generateFile(el);
      const base64 = await getBase64Test(file) as string;
      dispatch(setBase64(base64));
    }
  };

  // temp solution to draw image in cart
  useEffect(() => {
    if (show) {
      updateImageBase64();
    }
  }, [show]);

  return (
    <>
      <div className="panel without-header coubs-quantity">
        <div className="panel--content">
          <div className="coubs-quantity--display">
            <img src={data?.base64} alt="coubs selected" />
          </div>
        </div>
        <div className="panel--footer coubs-quantity--details">
          <div className="coubs-quantity--value">
            <div>
              უჯრების რაოდენობა :
              <span>46</span>
            </div>
            <div>
              1x -
              <span> 25</span>
            </div>
          </div>
          <Button type="icon" classes="is-medium button--secondary">
            <RemoveIcon />
          </Button>
        </div>
      </div>
      <div className="gift-panel">
        <div className="gift-panel--wrapper">
          <p className="gift-panel--description">
            მიიღე საჩუქრები 300 - 500 ლარამდე შენაძენის შემთხვევაში. საჩუქრები იქნება
            მხოლოდ იმ მომხმარებლებისთვის ვისი შეკვეთაც აღემატება აღნიშნულ თანხას
          </p>

          <ul className="product--list">
            <li className="product--item">
              <picture className="product--image">
                <img src="" alt="item" />
              </picture>
              <div className="product--details">
                <h4>ჰანგრიმენის ჰუდი</h4>
                <p>საჩუქარი 300 ლარიან შენაძენზე</p>
              </div>
            </li>
            <li className="product--item">
              <picture className="product--image">
                <img src="" alt="item" />
              </picture>
              <div className="product--details">
                <h4>ჰანგრიმენის ჰუდი</h4>
                <p>საჩუქარი 300 ლარიან შენაძენზე</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  // <app-gift-panel></app-gift-panel>
  );
};

export default CartCoubs;
