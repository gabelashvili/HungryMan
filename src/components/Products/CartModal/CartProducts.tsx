import { generatePath } from '../../../helpers';
import { useAppDispatch } from '../../../hooks/useSelector';
import ClearIcon from '../../../Icons/ClearIcon';
import { reqRemoveProductFromCart } from '../../../store/ducks/productsDuck';
import { SelectedProductType } from '../../../types/products';
import Button from '../../shared/Button';
import EmptyCard from './EmptyCard';

const CartProducts = ({ data }: {data: SelectedProductType[]}) => {
  const dispatch = useAppDispatch();
  return (
    data.length === 0 ? <EmptyCard /> : (
      <ul className="product--list">
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
              <h4>
                {el.product.name}
                {' - '}
                {el.product.itemDetails[0].size}
                <span style={{
                  width: '10px', height: '10px', background: el.product.itemDetails[0].color, display: 'inline-block', borderRadius: '50%', marginLeft: '10px',
                }}
                />
              </h4>
              <p>{el.product.description}</p>
              <span>
                {el.product.newPrice}
                ₾
              </span>
            </div>
            <div className="product--options">
              <Button
                handleClick={() => dispatch(reqRemoveProductFromCart(el.product.itemDetails[0].id))}
                type="text"
                classes="button--icon button-pull-right is-rounded"
              >
                <ClearIcon />
              </Button>
            </div>
          </li>
        ))}

      </ul>
    )
  );
};

export default CartProducts;
