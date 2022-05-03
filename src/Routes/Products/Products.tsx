import ArrowIcon from '../../Icons/ArrowIcon';
import SortIcon from '../../Icons/SortIcon';
import './products.scss';

const Products = () => {
  return (
    <div className="wrapper">
      <div className="products">
        <div className="products--filter">
          <div className="products--sort">
            <SortIcon className="products--sort-icon" />
            ფასის კლებადობით
            <ArrowIcon className="products--sort-arrow" />
          </div>
        </div>

        <div className="products-list">
          <div className="products-item">
            <picture className="products-item--image">
              <img src="../../../assets/images/hat.png" alt="Product item" />
            </picture>

            <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
            <p className="products-item--description">
              საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
            </p>
            <span className="products-item--price"> 250.00₾ </span>
          </div>

          <div className="products-item">
            <picture className="products-item--image">
              <img src="../../../assets/images/hat.png" alt="Product item" />
            </picture>

            <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
            <p className="products-item--description">
              საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
            </p>
            <span className="products-item--price"> 250.00₾ </span>
          </div>

          <div className="products-item">
            <picture className="products-item--image">
              <img src="../../../assets/images/hat.png" alt="Product item" />
            </picture>

            <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
            <p className="products-item--description">
              საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
            </p>
            <span className="products-item--price"> 250.00₾ </span>
          </div>

          <div className="products-item">
            <picture className="products-item--image">
              <img src="../../../assets/images/hat.png" alt="Product item" />
            </picture>

            <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
            <p className="products-item--description">
              საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
            </p>
            <span className="products-item--price"> 250.00₾ </span>
          </div>

          <div className="products-item">
            <picture className="products-item--image">
              <img src="../../../assets/images/hat.png" alt="Product item" />
            </picture>

            <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
            <p className="products-item--description">
              საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
            </p>
            <span className="products-item--price"> 250.00₾ </span>
          </div>

          <div className="products-item">
            <picture className="products-item--image">
              <img src="../../../assets/images/hat.png" alt="Product item" />
            </picture>

            <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
            <p className="products-item--description">
              საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
            </p>
            <span className="products-item--price"> 250.00₾ </span>
          </div>
        </div>

        <div className="products-controls">
          <button className="button button--secondary button--icon-right">
            მეტის ნახვა

            <svg fill="none" viewBox="0 0 10 6">
              <path
                fill="currentColor"
                d="M5 6 .759 1.757 2.173.343 5 3.172 7.829.343l1.415 1.414L5 6Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
};

export default Products;
