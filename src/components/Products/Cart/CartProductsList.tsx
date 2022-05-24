import { generatePath } from '../../../helpers';
import { useAppDispatch } from '../../../hooks/useSelector';
import ClearIcon from '../../../Icons/ClearIcon';
import MinusIcon from '../../../Icons/MinusIcon';
import PlusIcon from '../../../Icons/PlusIcon';
import { reqRemoveProductFromCart, updateProductCountInCart } from '../../../store/ducks/productsDuck';
import { SelectedProductType } from '../../../types/products';
import Button from '../../shared/Button';

const CartProductsList = ({ data }: {data: SelectedProductType[]}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="panel cart">
      <div className="panel--header with-border">
        <h3 className="panel--title">კალათის გვერდი</h3>
      </div>
      <div className="panel--content">
        <ul className="product--list large">
          {data.map((el) => (
            <li className="product--item" key={el.product.itemDetails[0].id}>
              {el.product.medias[0]?.mediaType === 1 ? (
                <picture className="product--image">
                  <img src={generatePath(el.product.medias[0]?.url)} alt="item" />
                </picture>
              ) : (
                <video className="product--image">
                  <source src={generatePath(el.product.medias[0]?.url)} type="video/mp4" />
                </video>
              )}
              <div className="product--details">
                <h4>{el.product.name}</h4>
                <p>
                  {el.product.description}
                </p>
                <span>
                  {el.product.newPrice}
                  ლ
                </span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button
                    className="count-selector--button"
                    onClick={() => el.count - 1 >= 0
                      && dispatch(updateProductCountInCart(el.product.itemDetails[0].id, el.count - 1))}
                  >
                    <MinusIcon />
                  </button>
                  <span className="count-selector--value">{el.count}</span>
                  <button
                    className="count-selector--button"
                    onClick={() => dispatch(updateProductCountInCart(el.product.itemDetails[0].id, el.count + 1))}
                  >
                    <PlusIcon />
                  </button>
                </div>
                <Button handleClick={() => dispatch(reqRemoveProductFromCart(el.product.itemDetails[0].id))} type="icon"><ClearIcon /></Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartProductsList;
