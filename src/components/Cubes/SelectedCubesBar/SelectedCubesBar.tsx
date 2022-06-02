import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../../hooks/useSelector';
import Button from '../../shared/Button';
import './selected-cubes-bar.scss';

const SelectedCubesBar = () => {
  const navigate = useNavigate();
  const selectedCubes = useSelector((state) => state.cubesReducer.selectedCubes).length;
  return (
    <div className="selected-coubs">
      <div className="selected-coubs--count">{selectedCubes}</div>
      <div className="selected-coubs--title">არჩეული კუბები</div>
      <button className="button button--secondary">კალათაში დამატება</button>
      <Button disabled={selectedCubes === 0} handleClick={() => navigate('cart')}>ყიდვა</Button>
    </div>
  );
};

export default SelectedCubesBar;
