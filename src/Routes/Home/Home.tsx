import './home.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../store/ducks/productsDuck';
import { useSelector } from '../../hooks/useSelector';
import ProductItem from '../../components/Products/ProductItem';
import { getInitialData } from '../../store/ducks/cubesDuck';

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productsReducer.productsList);
  const totalSoldCubes = useSelector((state) => state.cubesReducer.soldCubesDetails?.soldCubes)?.length;
  const purchaserUserCount = useSelector((state) => state.cubesReducer.initialData?.purchaserUserCount) || 0;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({
      Page: 1,
      PageSize: 4,
    }));
    if (!totalSoldCubes) {
      dispatch(getInitialData());
    }
  }, []);
  return (
    <div style={{
      overflowX: 'hidden',
      display: 'block',
    }}
    >
      <div className="landing-intro">
        <img src={require('../../assets/images/l-home.png')} alt="" className="landing-image" />
        <div className="wrapper">
          <div className="landing-content">
            <h1>როგორ შევქმენით კედელი?</h1>
            <p>
              ჰანგრიმენი წარმოგიდგენთ ახალთახალ პროექტს, სადაც ჩვენს ერთგულ მაყურებელს
              შეუძლია დატოვოს თავის კვალი ჩვენს კედელზე და გამოგვიგზავნონ სხვადასხვა
              სახის შეტყობინებები.
            </p>
            <button className="button button--primary button--icon-left">
              <svg fill="none" viewBox="0 0 12 14" style={{ width: '12px !important' }}>
                <path
                  fill="currentColor"
                  d="m.752.439 10.508 6.13a.5.5 0 0 1 0 .863L.752 13.562A.5.5 0 0 1 0 13.128V.871A.5.5 0 0 1 .752.439Z"
                />
              </svg>

              ვიდეოს ჩართვა
            </button>
          </div>
        </div>
      </div>

      <div className="landing-container">
        <div className="landing-info landing-wrapper">
          <div className="landing-info--image">
            <img src={require('../../assets/images/hungyman image 1.png')} alt="" />
            <img src={require('../../assets/images/f-coub.png')} alt="" className="f-coub" />
            <img src={require('../../assets/images/s-coub.png')} alt="" className="s-coub" />
          </div>

          <div className="landing-info--content">
            <h2>რამდენი უჯრაა კედელზე ?</h2>
            <p>
              ჰანგრიმენი წარმოგიდგენთ ახალთახალ პროექტს, სადაც ჩვენს ერთგულ მაყურებელს
              შეუძლია დატოვოს თავის კვალი ჩვენს კედელზე და გამოგვიგზავნონ სხვადასხვა
              სახის შეტყობინებები. ჩვენს კედელზე წარმოდგენილია 40 000 -ზე მეტი უჯრა,
              თითოეული კუბიკის ღირებულება შეადგენს 25 ლარს.
            </p>

            <div className="landing-chart">
              <div className="landing-chart--item">
                <div className="landing-chart--name">გაყიდული უჯრები</div>
                <div className="landing-chart--value">{totalSoldCubes || 0}</div>
              </div>
              <div className="landing-chart--item">
                <div className="landing-chart--name">აქტიური კლიენტი</div>
                <div className="landing-chart--value">{purchaserUserCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="landing-info landing-wrapper">
          <div className="landing-info--content">
            <h2>როგორ მუშაობს საიტი?</h2>
            <p>
              თქვენ შეგიძლიათ შეიძინოთ ნებისმიერი რაოდენობის უჯრა, გააფორმოთ ჩვენს
              მიერ შემოთავაზებული სტიკერებით და ფონტებით ან ატვირთოთ საკუთარი დიზაინი.
              შედეგი გამოისახება ჩვენს ვებ-გვერდზე და მომდევნო დღეს გადაინაცვლებს
              ჰანგრიმენის სტუდიაში სპეციალურ კედელზე, ზუსტად იმ ადგილზე, სადაც
              განახორციელებთ პოზიციის შერჩევას. თქვენს მიერ შეძენილ უჯრებს რეალობაში
              იხილავთ ჰანგრიმენის ახალ ვიდეოში.
            </p>

            <button className="button button--primary">შეიძინე უჯრები</button>
          </div>
          <div className="landing-info--image">
            <img src={require('../../assets/images/hungyman image 2.png')} alt="" />

            <div className="img-card typology">
              <img src={require('../../assets/images/Vector.png')} alt="" />
            </div>
            <div className="img-card gost">
              <img src={require('../../assets/images/13.png')} alt="" />
            </div>
            <div className="img-card fox">
              <img src={require('../../assets/images/15.png')} alt="" />
            </div>
          </div>
        </div>

        <div className="landing-info landing-wrapper">
          <div className="landing-info--image">
            <img src={require('../../assets/images/hungyman image 3.png')} alt="" />
            <div className="img-card notification">
              <img src={require('../../assets/images/notification-bing.png')} alt="" />
            </div>
            <div className="img-card like">
              <img src={require('../../assets/images/like-dislike.png')} alt="" />
            </div>
          </div>

          <div className="landing-info--content">
            <h2>რას მოხმარდება თანხა?</h2>
            <p>
              შეგროვებული თანხის ნაწილი მოხმარდება ქართული იუთუბის განვითარებას, რაც
              გულისხმობს ახალი სტუდიის მოწყობას და დამწყები იუთუბერებისთვის საჭირო
              დახმარების გაწევას.
            </p>
          </div>
        </div>

        <div className="landing-wrapper">
          <div>
            {products && products.items.map((el) => <ProductItem data={el} key={el.id} />)}
          </div>
          <button style={{ marginBottom: '50px' }} className="button button--secondary" onClick={() => navigate('/products')}>ყველას ნახვა</button>
        </div>
      </div>

    </div>
  );
};

export default Home;
