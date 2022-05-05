import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ColorSelector from '../../components/Products/ColorSelector';
import CountSelector from '../../components/Products/CountSelector';
import ProductsMediaCarousel from '../../components/Products/ProductsMediaCarousel';
import SizeSelector from '../../components/Products/SizeSelector';
import { useSelector } from '../../hooks/useSelector';
import Loader from '../../Icons/Loader';
import { getProductDetails } from '../../store/ducks/productsDuck';
import './products-details.scss';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemInStockBySelectedProps, setItemInStockBySelectedProps] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filteredSizes, setFilteredSizes] = useState<string[]>([]);

  const productDetails = useSelector((state) => state.productsReducer.productDetails);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails(Number(productId), {
        error: () => {
          navigate('/products');
        },
      }));
    }
  }, [productId]);

  useEffect(() => {
    if (productDetails) {
      const colors: string[] = [];
      const sizes: string[] = [];
      productDetails.itemDetails.forEach((el) => {
        colors.push(el.color);
        sizes.push(el.size);
      });
      setFilteredColors(Array.from(new Set(colors)));
      setFilteredSizes(Array.from(new Set(sizes)));
    }
  }, [productDetails]);

  const handleColorsChange = (val: string) => {
    setSelectedColor(val === selectedColor ? '' : val);
    const sizes: string[] = [];
    productDetails?.itemDetails.forEach((el) => {
      el.color === val && sizes.push(el.size);
    });
    setFilteredSizes(sizes.sort((a, b) => Sizes[a as keyof typeof Sizes] - Sizes[b as keyof typeof Sizes]));
    if (!selectedSize || (selectedSize && !sizes.includes(selectedSize))) {
      setSelectedSize(sizes[0]);
    }
  };

  const handleSizeChange = (val: string) => {
    setSelectedSize(val);
  };

  useEffect(() => {
    if (productDetails) {
      handleColorsChange(productDetails.itemDetails[0].color || '');
    }
  }, [productDetails]);

  // set item quantity based on selected properties and if selected
  //   item quantity is less than user have typed quantity, set quantity 0
  useEffect(() => {
    const selectedItemInStock: number = productDetails?.itemDetails
      .find((el) => el.color === selectedColor && el.size === selectedSize)?.inStockCount || 0;
    setItemInStockBySelectedProps(selectedItemInStock);
    selectedQuantity > selectedItemInStock && setSelectedQuantity(0);
  }, [selectedSize]);

  return (
    <div className="wrapper">
      <div className="product-details">
        <div className="product-details--container">
          {productDetails ? (
            <div className="product-details">
              <div className="product-details--container">
                <ProductsMediaCarousel data={productDetails.medias} />
                <div className="product-details--wrapper">
                  <h2 className="product-details--title">{productDetails.name}</h2>
                  <p className="product-details--description">
                    {productDetails.description}
                  </p>
                  <form className="product-details--form">
                    <h5 className="product-details--label">აირჩიე ფერი</h5>
                    <div className="color-selector">
                      {filteredColors.map((el) => (
                        <ColorSelector
                          color={el}
                          key={el}
                          selectedColor={selectedColor}
                          handleChange={(val) => handleColorsChange(val)}
                        />
                      ))}
                    </div>

                    <h5 className="product-details--label">აირჩიე ზომა</h5>
                    <div className="size-selector">
                      {[...filteredSizes].map((el) => (
                        <SizeSelector
                          value={el}
                          key={el}
                          selectedSize={selectedSize}
                          handleChange={(val) => handleSizeChange(val)}
                        />
                      ))}
                    </div>

                    <h5 className="product-details--label">აირჩიე რაოდენობა</h5>
                    <CountSelector
                      value={selectedQuantity}
                      handleChange={(val) => setSelectedQuantity(val)}
                      maxValue={itemInStockBySelectedProps}
                    />
                  </form>

                  <div className="product-details--footer">
                    <div className="product-details--sum">
                      <span className="product-details--sum-label">ჯამური თანხა:</span>
                      <span className="product-details--sum-value">
                        {selectedQuantity * productDetails.newPrice}
                        ლ
                      </span>
                    </div>

                    <div className="product-details--controls">
                      <button className="button button--primary">ყიდვა</button>

                      <button className="button button--secondary">კალათაში დამატება</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <app-products-carousel /> */}
            </div>
          ) : (
            <Loader styles={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%, -50%)', width: '100px',
            }}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;

enum Sizes {
  XS =1,
  S = 2,
  M = 3,
  L = 4,
  XL = 5,
  '2XL' = 6,
  '3XL' = 7,
}
