import { Dispatch, SetStateAction } from 'react';
import { generatePath } from '../../helpers';
import { useSelector } from '../../hooks/useSelector';
import PlusIcon from '../../Icons/PlusIcon';
import Button from '../shared/Button';
import PropsSelector from '../Products/PropsSelector';

const CubesGift = ({
  totalPrice, setGiftOneProp, setGiftTwoProp, giftOneProp, giftTwoProp,
}: PropsTypes) => {
  const gifts = useSelector((state) => state.cubesReducer.initialData)?.gifts;
  const giftsByPrice = gifts && totalPrice <= 100 ? [gifts[0]] : gifts;
  return (
    <div className="cart-gifts">
      {totalPrice > 100 && (
      <Button type="icon" classes="button--primary is-large is-rounded">
        <PlusIcon styles={{ height: '21px' }} />
      </Button>
      )}
      {giftsByPrice?.map((el, i) => (
        <div className="products-item" key={el.id}>
          <picture className="products-item--image">
            <img src={generatePath(el.url)} alt="Product item" />
          </picture>
          <h6 className="products-item--title">{el.title}</h6>
          <p className="products-item--description">
            {el.description}
          </p>
          <form className="product-details--form">
            <h5 className="product-details--label">{el.displayName}</h5>
            <div className="size-selector">
              <label htmlFor="size" className="size-selector--label">
                <input id="size" type="radio" name="sizes" value="xs" />
                <span className="size-selector--box"> xs </span>
              </label>
              {el.options.map((option) => (
                <PropsSelector
                  value={option}
                  selectedValue={i === 0 ? giftOneProp?.value || '' : giftTwoProp?.value || ''}
                  handleChange={() => (i === 0 ? setGiftOneProp({ value: option, id: el.id })
                    : setGiftTwoProp({ value: option, id: el.id }))}
                />
              ))}
              <label htmlFor="size" className="size-selector--label">
                <input id="size" type="radio" name="sizes" value="s" />
                <span className="size-selector--box"> s </span>
              </label>
            </div>
          </form>
        </div>
      ))}
    </div>

  );
};

export default CubesGift;

interface PropsTypes {
  totalPrice:number,
  setGiftOneProp: Dispatch<SetStateAction<{value: string, id:number} | null>>,
  setGiftTwoProp: Dispatch<SetStateAction<{value: string, id:number} | null>>,
  giftOneProp:{value: string, id:number} | null,
  giftTwoProp: {value: string, id:number} | null
}
