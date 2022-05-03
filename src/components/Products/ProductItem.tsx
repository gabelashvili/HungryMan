const ProductItem = () => {
  return (
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
  );
};

export default ProductItem;
