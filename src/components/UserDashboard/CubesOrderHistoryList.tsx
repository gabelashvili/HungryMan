import moment from 'moment';
import { useSelector } from '../../hooks/useSelector';
import 'moment/locale/ka';
import Button from '../shared/Button';
import InfoIcon from '../../Icons/InfoIcon';
import Loader from '../../Icons/Loader';

const CubesOrderHistoryList = ({ handleItemInfoClick }: { handleItemInfoClick: (id:number) => void}) => {
  const data = useSelector((state) => state.cubesReducer.purchaseHistory);
  console.log(data);
  return (
    data ? (
      <ul className="product--list large">
        {data?.map((el) => (
          <li className="product--item">
            <picture className="product--image">
              <svg fill="none" viewBox="0 0 48 48">
                <path
                  fill="#55687A"
                  d="M38.74 9.78 27.02 4.56c-1.72-.76-4.32-.76-6.04 0L9.26 9.78c-2.96 1.32-3.4 3.12-3.4 4.08s.44 2.76 3.4 4.08l11.72 5.22c.86.38 1.94.58 3.02.58s2.16-.2 3.02-.58l11.72-5.22c2.96-1.32 3.4-3.12 3.4-4.08s-.42-2.76-3.4-4.08Z"
                />
                <path
                  fill="#55687A"
                  d="M24 34.08c-.76 0-1.52-.16-2.22-.46l-13.48-6c-2.06-.92-3.66-3.38-3.66-5.64 0-.82.66-1.48 1.48-1.48s1.48.66 1.48 1.48c0 1.08.9 2.48 1.9 2.92l13.48 6c.64.28 1.38.28 2.02 0l13.48-6c1-.44 1.9-1.82 1.9-2.92 0-.82.66-1.48 1.48-1.48s1.48.66 1.48 1.48c0 2.24-1.6 4.72-3.66 5.64l-13.48 6c-.68.3-1.44.46-2.2.46Z"
                />
                <path
                  fill="#55687A"
                  d="M24 44c-.76 0-1.52-.16-2.22-.46l-13.48-6a6.17 6.17 0 0 1-3.66-5.64c0-.82.66-1.48 1.48-1.48s1.48.66 1.48 1.48c0 1.26.74 2.4 1.9 2.92l13.48 6c.64.28 1.38.28 2.02 0l13.48-6a3.21 3.21 0 0 0 1.9-2.92c0-.82.66-1.48 1.48-1.48s1.48.66 1.48 1.48a6.19 6.19 0 0 1-3.66 5.64l-13.48 6c-.68.3-1.44.46-2.2.46Z"
                />
              </svg>
            </picture>
            <div className="product--details">
              <div className="product--date">{moment.utc(el.createdAt).local().format('DD MMM. YYYY, hh:mm')}</div>
            </div>
            <div className="product--options">
              <span className="product--price">
                {' '}
                {el.fullAmount}
                ₾
                {' '}
              </span>
              <Button type="icon" handleClick={() => handleItemInfoClick(el.id)}>
                <InfoIcon />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    ) : <Loader styles={{ width: '70px', margin: 'auto' }} />
  );
};

export default CubesOrderHistoryList;
