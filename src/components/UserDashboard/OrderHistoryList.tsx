import InfoIcon from '../../Icons/InfoIcon';
import Button from '../shared/Button';

const OrderHistoryList = ({ data, handleItemInfoClick }: PropsType) => {
  return (
    <ul className="product--list large">
      {data && data.map((el) => (
        <li className="product--item" key={el.id}>
          <picture className="product--image">
            <img src={el.img} alt="item" />
          </picture>
          <div className="product--details">
            <div className="product--date">{el.date}</div>
            <h4>{el.title}</h4>
            <p>{el.desc}</p>
          </div>
          <div className="product--options">
            <span className="product--price">{el.price}</span>
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
  desc: string;
  price: string;
  img: string;
}

interface PropsType {
  data: OrderHistoryListItem[],
  handleItemInfoClick: (id:number) => void
}
