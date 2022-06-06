import { useEffect, useRef } from 'react';
import { generateFile } from '../../../helpers';
import { useSelector } from '../../../hooks/useSelector';
import RemoveIcon from '../../../Icons/RemoveIcon';
import Button from '../../shared/Button';

const CartCoubs = ({ show }:{show:boolean}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const data = useSelector((state) => state.cubesReducer);
  const updateFile = async () => {
    const el = document.getElementById('root-svg');
    if (el && imgRef.current) {
      const file = await generateFile(el);
      imgRef.current.setAttribute('src', URL.createObjectURL(file));
    }
  };

  // temp solution to draw image in cart
  useEffect(() => {
    if (show) {
      updateFile();
    }
  }, [show]);

  return (
    <>
      <div className="panel without-header coubs-quantity">
        <div className="panel--content">
          <div className="coubs-quantity--display">
            <img ref={imgRef} alt="coubs selected" />
          </div>
        </div>
        <div className="panel--footer coubs-quantity--details">
          <div className="coubs-quantity--value">
            <div>
              უჯრების რაოდენობა :
              <span>
                {' '}
                {data?.selectedCubesInfo?.cubesId?.length || 0}
              </span>
            </div>
            <div>
              1x -
              <span>
                {' '}
                {data.initialData?.squarePrice}
              </span>
            </div>
          </div>
          <Button type="icon" classes="is-medium button--secondary">
            <RemoveIcon />
          </Button>
        </div>
      </div>
      {data?.selectedCubesInfo?.totalPrice && data.selectedCubesInfo.totalPrice >= 50 && (
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
      )}
    </>
  );
};

export default CartCoubs;
