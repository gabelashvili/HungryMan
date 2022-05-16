import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ColorSelector from '../../../components/Products/ColorSelector';
import CountSelector from '../../../components/Products/CountSelector';
import ProductsMediaCarousel from '../../../components/Products/ProductsMediaCarousel';
import SimilarItems from '../../../components/Products/SimilarItems/SimilarItems';
import SizeSelector from '../../../components/Products/SizeSelector';
import Button from '../../../components/shared/Button';
import { useSelector } from '../../../hooks/useSelector';
import Loader from '../../../Icons/Loader';
import { getProductDetails, reqAddProductInCart } from '../../../store/ducks/productsDuck';
import { Sizes } from '../../../types/products';
import './products-details.scss';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthed = useSelector((state) => state.userReducer.user);
  const productDetails = useSelector((state) => state.productsReducer.productDetails);
  const { productId } = useParams();
  const [itemInStockBySelectedProps, setItemInStockBySelectedProps] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filteredSizes, setFilteredSizes] = useState<string[]>([]);

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

  const handleItemAddInCart = () => {
    productDetails && dispatch(reqAddProductInCart({
      product: {
        ...productDetails,
        itemDetails: productDetails.itemDetails.filter((el) => el.color === selectedColor && el.size === selectedSize),
      },
      count: selectedQuantity,
      maxInStock: itemInStockBySelectedProps,
    }));
  };

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

  useEffect(() => {
    if (productDetails) {
      handleColorsChange(productDetails.itemDetails[0]?.color || '');
    }
  }, [productDetails]);

  // set item quantity based on selected properties and if selected
  //   item quantity is less than user have typed quantity, set quantity 1
  useEffect(() => {
    const selectedItemInStock: number = productDetails?.itemDetails
      .find((el) => el.color === selectedColor && el.size === selectedSize)?.inStockCount || 0;
    setItemInStockBySelectedProps(selectedItemInStock);

    // if props change and user selected number is less than current item inStockCount set quantity 1
    selectedQuantity > selectedItemInStock && setSelectedQuantity(1);
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
                        {(selectedQuantity * productDetails.newPrice).toFixed(2)}
                        ლ
                      </span>
                    </div>

                    <div className="product-details--controls">
                      <Button
                        handleClick={() => {
                          navigate(isUserAuthed ? '/products/cart' : '/auth');
                          if (isUserAuthed) {
                            navigate('/products/cart');
                            handleItemAddInCart();
                          } else {
                            navigate('/auth');
                          }
                        }}
                        type={isUserAuthed ? '' : 'secondary'}
                      >
                        {isUserAuthed ? 'ყიდვა' : 'ავტორიზაცია'}

                      </Button>
                      <Button handleClick={handleItemAddInCart} disabled={selectedQuantity === 0} type="secondary">კალათაში დამატება</Button>
                    </div>
                  </div>
                </div>
              </div>
              {productDetails.similarItems.length > 0 && <SimilarItems data={productDetails.similarItems} />}
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
