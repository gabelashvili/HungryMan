import ClearIcon from '../../../Icons/ClearIcon';
import Button from '../../shared/Button';

const CartProducts = () => {
  return (
    <ul className="product--list">
      <li className="product--item">
        <picture className="product--image">
          <img src="" alt="item" />
        </picture>

        <div className="product--details">
          <h4>ჰანგრიმენის ჰუდი</h4>
          <p>საჩუქარი 300 ლარიან შენაძენზე</p>
          <span>45₾</span>
        </div>

        <div className="product--options">
          <Button type="text" classes="button--icon button-pull-right is-rounded">
            <ClearIcon />
          </Button>
        </div>
      </li>
      <li className="product--item">
        <picture className="product--image">
          <img src="" alt="item" />
        </picture>
        <div className="product--details">
          <h4>ჰანგრიმენის ჰუდი</h4>
          <p>საჩუქარი 300 ლარიან შენაძენზე</p>
          <span>45₾</span>
        </div>
      </li>
      <li className="product--item">
        <picture className="product--image">
          <img src="" alt="item" />
        </picture>
        <div className="product--details">
          <h4>ჰანგრიმენის ჰუდი</h4>
          <p>საჩუქარი 300 ლარიან შენაძენზე</p>
          <span>45₾</span>
        </div>
      </li>
    </ul>
  );
};

export default CartProducts;
