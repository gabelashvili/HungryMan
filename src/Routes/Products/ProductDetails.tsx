import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { generatePath } from '../../helpers';
import { useSelector } from '../../hooks/useSelector';
import ArrowIcon from '../../Icons/ArrowIcon';
import Loader from '../../Icons/Loader';
import { getProductDetails } from '../../store/ducks/productsDuck';
import './products-details.scss';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  return (
    <div className="wrapper">
      <div className="product-details">
        <div className="product-details--container">

          {productDetails ? (
            <div className="product-details">
              <div className="product-details--container">
                <div className="product-details-slider">
                  <picture className="product-details-slider--image">
                    <img src={generatePath(productDetails.medias[0].url)} alt="t" />
                  </picture>

                  <div className="product-details-slider--wrapper">
                    <Button type="icon" classes=" is-small is-rounded"><ArrowIcon styles={{ transform: 'rotate(180deg)' }} /></Button>
                    <div className="product-details-slider--list-wrapper">
                      <div className="product-details-slider--list">
                        {productDetails.medias.map((el) => (
                          el.mediaType === 1 ? (
                            <picture className="product-details-slider--item">
                              <img src={generatePath(el.url)} alt="" key={el.url} />
                            </picture>
                          )
                            : (
                              <video controls>
                                <source src={generatePath(el.url)} type="video/mp4" />
                              </video>
                            )
                        ))}
                      </div>
                    </div>

                    <Button type="icon" classes=" is-small is-rounded"><ArrowIcon /></Button>
                  </div>
                </div>

                <div className="product-details--wrapper">
                  <h2 className="product-details--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h2>
                  <p className="product-details--description">
                    Hungryman - ეს არის 3 განუყრელი მეგობრის გასართობი და იუმორისტული
                    არხი. თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                    მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს ხინკალი, მწვადი და ოღრაშული
                    დროსტარება. ნიკოლოზ ვასაძე - ვასა - ყოველთვის პოზიტიური, თვლის, რომ
                    განსაკუთრებული გემოვნება აქვს, უყვარს ყველაფერი აზიური (მასაზის
                    გარდა), მეგობრებში ცნობილია როგორც სპონსორების რისხვა. გუგა ჭყონია -
                    გუგა - ოპერატორი, მემონტაჟე, პაროდისტი, მუსიკოსი და ბითბოქსერი,
                    ყველაფერი ერთად, თუმცა თავის დროზე კამერის მიღმა ყოფნა ამჯობინა,
                    სხვანაირად ამ ვიდეოებს ვერ მივიღებდით.
                  </p>

                  <form className="product-details--form">
                    <h5 className="product-details--label">აირჩიე ფერი</h5>
                    <div className="color-selector">
                      {/* <!-- pass color value as color --> */}
                      <label htmlFor="color" className="color-selector--label" style={{ color: 'red' }}>
                        <input id="color" type="radio" name="colors" value="yellow" />
                        <span className="color-selector--box" />
                      </label>

                      <label
                        htmlFor="color"
                        className="color-selector--label"
                        style={{ color: 'yellow' }}
                      >
                        <input id="color" type="radio" name="colors" value="yellow" />
                        <span className="color-selector--box" />
                      </label>
                    </div>

                    <h5 className="product-details--label">აირჩიე ზომა</h5>
                    <div className="size-selector">
                      <label htmlFor="size" className="size-selector--label">
                        <input id="size" type="radio" name="sizes" value="xs" />
                        <span className="size-selector--box"> xs </span>
                      </label>

                      <label htmlFor="size" className="size-selector--label">
                        <input id="size" type="radio" name="sizes" value="s" />
                        <span className="size-selector--box"> s </span>
                      </label>
                    </div>

                    <h5 className="product-details--label">აირჩიე რაოდენობა</h5>
                    <div className="count-selector">
                      <button className="count-selector--button">
                        <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                          <rect width="14" height="2" fill="currentColor" />
                        </svg>
                      </button>
                      <span className="count-selector--value">1</span>
                      <button className="count-selector--button">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </form>

                  <div className="product-details--footer">
                    <div className="product-details--sum">
                      <span className="product-details--sum-label">ჯამური თანხა:</span>
                      <span className="product-details--sum-value">1400,50.00₾</span>
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
