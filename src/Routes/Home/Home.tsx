import './home.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Hat from '../../assets/images/hat.png';
import { getProducts } from '../../store/ducks/productsDuck';
import { useSelector } from '../../hooks/useSelector';
import ProductItem from '../../components/Products/ProductItem';

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productsReducer.productsList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({
      Page: 1,
      PageSize: 4,
    }));
  }, []);
  return (
    <div className="landing">
      <div className="landing-intro">
        <img src={Hat} alt="" className="landing-image" />
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
            <img src={Hat} alt="" />
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
                <div className="landing-chart--value">2332</div>
              </div>
              <div className="landing-chart--item">
                <div className="landing-chart--name">აქტიური კლიენტი</div>
                <div className="landing-chart--value">2331</div>
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
            <img src={Hat} alt="" />
          </div>
        </div>

        <div className="landing-info landing-wrapper">
          <div className="landing-info--image">
            <img src={Hat} alt="" />
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
          <div className="products-carousel--header is-centered" style={{ textAlign: 'center' }}>
            <div className="products-carousel--heading">
              <h4 className="products-carousel--title"> ჩვენი პროდუქცია </h4>
              <p className="products-carousel--description">
                ვებ-გვერდზე ასევე შესაძლებელია ჩვენი
                ბრენდირებული და ორიგინალური დიზაინის ტანსაცმლის და სხვა აქსესუარების შეძენა
              </p>
            </div>
          </div>
          {/* <app-products-carousel
        [description]="
          'ვებ-გვერდზე ასევე შესაძლებელია ჩვენი ბრენდირებული და ორიგინალური დიზაინის ტანსაცმლის და სხვა აქსესუარების შეძენა'
        "
        class="landing-products-carousel"
        [title]="'ჩვენი პროდუქცია'"
        [centeredHeading]="true"
        [hasArrows]="false"
      ></app-products-carousel> */}
          <div style={{
            display: 'grid', gap: '15px', gridAutoFlow: 'column', marginBottom: '25px',
          }}
          >
            {products && products.items.map((el) => <ProductItem data={el} />)}
          </div>
          <button className="button button--secondary" onClick={() => navigate('/products')}>ყველას ნახვა</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
