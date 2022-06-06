import RemoveIcon from '../../../Icons/RemoveIcon';
import Button from '../../shared/Button';

const CartCoubs = () => {
  return (
    <>
      <div className="panel without-header coubs-quantity">
        <div className="panel--content">
          <div className="coubs-quantity--display">
            <img src="" alt="coubs selected" />
          </div>
        </div>
        <div className="panel--footer coubs-quantity--details">
          <div className="coubs-quantity--value">
            <div>
              უჯრების რაოდენობა :
              <span>46</span>
            </div>
            <div>
              1x -
              <span> 25</span>
            </div>
          </div>
          <Button type="icon" classes="is-medium button--secondary">
            <RemoveIcon />
          </Button>
        </div>
      </div>
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
    </>
  // <app-gift-panel></app-gift-panel>
  );
};

export default CartCoubs;
