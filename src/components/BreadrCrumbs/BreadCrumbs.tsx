import ArrowIcon from '../../Icons/ArrowIcon';
import './breadcrumbs.scss';

const BreadCrumbs = () => {
  return (
    <div className="wrapper">
      <nav className="breadcrumbs">
        <ul className="breadcrumbs--list">
          <li className="breadcrumbs--item">
            <a href="" className="breadcrumbs--link"> მთავარი გვერდი </a>
            <ArrowIcon />
          </li>
          <li className="breadcrumbs--item is-active">
            <a href="" className="breadcrumbs--link"> მთავარი გვერდი </a>
            <ArrowIcon />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
