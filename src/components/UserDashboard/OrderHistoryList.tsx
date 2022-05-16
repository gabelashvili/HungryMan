import moment from 'moment';
import 'moment/locale/ka';
import { generatePath } from '../../helpers';
import InfoIcon from '../../Icons/InfoIcon';
import Button from '../shared/Button';

const OrderHistoryList = ({ data, handleItemInfoClick }: PropsType) => {
  return (
    <ul className="product--list large">
      {data && data.map((el) => (
        <li className="product--item" key={el.id}>
          <picture className="product--image">
            <img src={generatePath(el.img)} alt="item" />
          </picture>
          <div className="product--details">
            <div className="product--date">{moment(el.date).format('DD MMM. YYYY, hh:mm')}</div>
            <h4>{el.title}</h4>
            <p>
              {`ზომა: ${el.size}`}
              {' '}
              /
              ფერი:
              {' '}
              <span style={{
                width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%', background: el.color,
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

export default OrderHistoryList;

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
  data?: OrderHistoryListItem[],
  handleItemInfoClick: (id:number) => void
}
