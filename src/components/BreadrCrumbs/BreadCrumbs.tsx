import { useLocation } from 'react-router-dom';
import ArrowIcon from '../../Icons/ArrowIcon';
import './breadcrumbs.scss';

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const generatePathLabel = () => {
    if (pathname.includes('products')) {
      return 'პროდუქტები';
    }
    if (pathname.includes('user-dashboard')) {
      return 'მომხმარებლის გვერდი';
    }
    return false;
  };
  return (
    generatePathLabel() ? (
      <div className="wrapper">
        <nav className="breadcrumbs">
          <ul className="breadcrumbs--list">
            <li className="breadcrumbs--item">
              <a href="#" className="breadcrumbs--link"> მთავარი გვერდი </a>
              <ArrowIcon />
            </li>
            <li className="breadcrumbs--item is-active">
              <a href="#" className="breadcrumbs--link">
                {generatePathLabel()}
              </a>
              <ArrowIcon />
            </li>
          </ul>
        </nav>
      </div>
    ) : null
  );
};

export default BreadCrumbs;
