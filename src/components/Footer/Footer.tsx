import { Link } from 'react-router-dom';
import InstagramIcon from '../../Icons/instagram';
import TiktokIcon from '../../Icons/tiktok';
import TwitterIcon from '../../Icons/twitter';
import YoutubeIcon from '../../Icons/youtube';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer--left">
          <div className="footer-copyright">
            ყველა საავტორო უფლება დაცულია ჰანგრიმენი ჯგუფის მიერ © 2022
          </div>
          <nav className="footer-nav">
            <ul className="footer-nav--list">
              <li className="footer-nav--item">
                <a className="footer-nav--link" href="/">მთავარი</a>
              </li>
              <li className="footer-nav--item">
                <Link to="about-us" className="footer-nav--link">ჩვენს შესახებ</Link>
              </li>
              <li className="footer-nav--item">
                <Link to="about-project" className="footer-nav--link">ჩვენს შესახებ</Link>
              </li>
              <li className="footer-nav--item">
                <Link to="products" className="footer-nav--link">პროდუქცია</Link>
              </li>
              <li className="footer-nav--item">
                <Link to="contact" className="footer-nav--link">კონტაქტი</Link>
              </li>
              <li className="footer-nav--item">
                <Link to="help" className="footer-nav--link">როგორ ვიყიდო?</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="socials">
          <a className="socials--item" target="_blank" href="google.com">
            <InstagramIcon />
          </a>
          <a className="socials--item" target="_blank" href="google.com">
            <TwitterIcon />
          </a>
          <a className="socials--item" target="_blank" href="google.com">
            <TiktokIcon />
          </a>
          <a className="socials--item" target="_blank" href="google.com">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
