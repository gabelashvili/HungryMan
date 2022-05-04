const ProductItem = () => {
  return (
    <div className="products-item">
      <picture className="products-item--image">
        <img src="../../../assets/images/hat.png" alt="Product item" />
        <div className="products-item-controls">
          <button className="button button--icon is-rounded is-small">
            <svg fill="none" viewBox="0 0 8 14">
              <path
                fill="currentColor"
                d="m2.827 7 4.95 4.95-1.414 1.414L0 7 6.363.636 7.777 2.05 2.827 7Z"
              />
            </svg>
          </button>

          <button className="button button--icon is-rounded is-small">
            <svg fill="none" viewBox="0 0 8 14">
              <path
                fill="currentColor"
                d="M5.173 7 .223 2.05 1.637.636 8 7l-6.364 6.364L.223 11.95 5.173 7Z"
              />
            </svg>
          </button>
        </div>
      </picture>

      <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
      <p className="products-item--description">
        საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
      </p>
      <span className="products-item--price"> 250.00₾ </span>
    </div>
  );
};

export default ProductItem;
