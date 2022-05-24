import { useSelector } from '../../../hooks/useSelector';
import './selected-cubes-bar.scss';

const SelectedCubesBar = () => {
  const selectedCubes = useSelector((state) => state.cubesReducer.selectedCubes).length;
  console.log(selectedCubes);
  return (
    <div className="selected-coubs">
      <div className="selected-coubs--count">{selectedCubes}</div>
      <div className="selected-coubs--title">არჩეული კუბები</div>
      <button className="button button--secondary">კალათაში დამატება</button>
      <button className="button button--primary">ყიდვა</button>
    </div>
  );
};

export default SelectedCubesBar;
