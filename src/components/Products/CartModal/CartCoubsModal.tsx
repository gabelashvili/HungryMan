import { useRef } from 'react';
import { generatePath } from '../../../helpers';
import { useAppDispatch, useSelector } from '../../../hooks/useSelector';
import RemoveIcon from '../../../Icons/RemoveIcon';
import { setSelectedCubesInfo } from '../../../store/ducks/cubesDuck';
import DrawInitialGrid from '../../Cubes/DrawGrid/DrawInitialGrid';
import Button from '../../shared/Button';
import EmptyCard from './EmptyCard';

const CartCoubs = () => {
  const dispatch = useAppDispatch();
  const imgRef = useRef<HTMLImageElement>(null);
  const data = useSelector((state) => state.cubesReducer);
  return (
    data.selectedCubesInfo?.cubesId && data.selectedCubesInfo.cubesId.length > 0 ? (
      <>
        <div className="panel without-header coubs-quantity">
          <div className="panel--content">
            <div className="coubs-quantity--display">
              {data.selectedCubesInfo?.base64 ? <img src={data.selectedCubesInfo?.base64 || ''} ref={imgRef} alt="coubs selected" /> : <DrawInitialGrid />}
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
            <Button
              type="icon"
              classes="is-medium button--secondary"
              handleClick={() => {
                dispatch(setSelectedCubesInfo({ key: 'cubesId', value: [] }));
                dispatch(setSelectedCubesInfo({ key: 'totalPrice', value: 0 }));
              }}
            >
              <RemoveIcon />
            </Button>
          </div>
        </div>
        {data.initialData && data?.selectedCubesInfo?.totalPrice && data.selectedCubesInfo.totalPrice >= 50 && (
          <div className="gift-panel">
            <div className="gift-panel--wrapper">
              <p className="gift-panel--description">
                მიიღე საჩუქრები 300 - 500 ლარამდე შენაძენის შემთხვევაში. საჩუქრები იქნება
                მხოლოდ იმ მომხმარებლებისთვის ვისი შეკვეთაც აღემატება აღნიშნულ თანხას
              </p>

              <ul className="product--list">
                <li className="product--item">
                  <picture className="product--image">
                    <img src={generatePath(data.initialData.gifts[0].url)} alt="item" />
                  </picture>
                  <div className="product--details">
                    <h4>{data.initialData.gifts[0].title}</h4>
                    <p>{data.initialData.gifts[0].description}</p>
                  </div>
                </li>
                {data.selectedCubesInfo.totalPrice > 100 && (
                <li className="product--item">
                  <picture className="product--image">
                    <img src={generatePath(data.initialData.gifts[1].url)} alt="item" />
                  </picture>
                  <div className="product--details">
                    <h4>{data.initialData.gifts[1].title}</h4>
                    <p>{data.initialData.gifts[1].description}</p>
                  </div>
                </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </>
    ) : <EmptyCard />

  );
};

export default CartCoubs;
