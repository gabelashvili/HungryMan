import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../../hooks/useSelector';
import './selected-cubes-bar.scss';

const SelectedCubesBar = () => {
  const navigate = useNavigate();
  const selectedCubes = useSelector((state) => state.cubesReducer.selectedCubes).length;
  return (
    <div className="selected-coubs">
      <div className="selected-coubs--count">{selectedCubes}</div>
      <div className="selected-coubs--title">არჩეული კუბები</div>
      <button className="button button--secondary">კალათაში დამატება</button>
      <button className="button button--primary" onClick={() => navigate('cart')}>ყიდვა</button>
    </div>
  );
};

export default SelectedCubesBar;
