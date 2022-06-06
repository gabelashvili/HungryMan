import moment from 'moment';
import 'moment/locale/ka';
import { generatePath } from '../../helpers';
import InfoIcon from '../../Icons/InfoIcon';
import { ProductsOrderHistoryRes } from '../../types/user';
import Button from '../shared/Button';

const ProductsOrderHistoryList = ({ data, handleItemInfoClick }: PropsType) => {
  return (
    <ul className="product--list large">
      {data && data.items.map((el) => (
        <li className="product--item" key={el.id}>
          <picture className="product--image">
            <img src={generatePath(el.item.medias[0].url || '')} alt="item" />
          </picture>
          <div className="product--details">
            <div className="product--date">{moment(el.itemPurchase.createdAt).format('DD MMM. YYYY, hh:mm')}</div>
            <h4>{el.item.name}</h4>
            <p>
              {`ზომა: ${el.itemDetail.size}`}
              {' '}
              /
              ფერი:
              {' '}
              <span style={{
                width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%', background: el.itemDetail.color,
              }}
              />
              {` / რაოდენობა: ${el.count}`}
            </p>
          </div>
          <div className="product--options">
            <span className="product--price">
              {el.price}
              ლ
            </span>
            <Button type="icon" handleClick={() => handleItemInfoClick(el.id)}>
              <InfoIcon />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductsOrderHistoryList;

export interface OrderHistoryListItem {
  id: number;
  title: string;
  date: string;
  size: string;
  color: string,
  price: number;
  count: number,
  img: string;
}

interface PropsType {
  data: ProductsOrderHistoryRes | null,
  handleItemInfoClick: (id:number) => void
}
