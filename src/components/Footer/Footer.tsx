import { Link, useLocation } from 'react-router-dom';
import InstagramIcon from '../../Icons/instagram';
import TiktokIcon from '../../Icons/tiktok';
import TwitterIcon from '../../Icons/twitter';
import YoutubeIcon from '../../Icons/youtube';
import Logo from '../../assets/images/Layer 2.png';
import './footer.scss';

const Footer = () => {
  const { pathname } = useLocation();
  return (
    pathname === '/cubes' ? null : (
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
                  <Link to="/landing" className="footer-nav--link">ჩვენს შესახებ</Link>
                </li>
                <li className="footer-nav--item">
                  <Link to="/landing" className="footer-nav--link">პროექტის შესახებ</Link>
                </li>
                <li className="footer-nav--item">
                  <Link to="products" className="footer-nav--link">პროდუქცია</Link>
                </li>
                <li className="footer-nav--item">
                  <Link to="contact" className="footer-nav--link">კონტაქტი</Link>
                </li>
                <li className="footer-nav--item">
                  <Link to="/landing" className="footer-nav--link">როგორ ვიყიდო?</Link>
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
            <a className="author">
              საიტი დაამზადა:
              <img src={Logo} alt="Cold-Vision" />
            </a>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
