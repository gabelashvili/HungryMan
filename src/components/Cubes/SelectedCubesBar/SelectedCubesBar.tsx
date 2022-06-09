import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSelector } from '../../../hooks/useSelector';
import { setSelectedCubes, setTotalPriceInStore } from '../../../store/ducks/cubesDuck';
import Button from '../../shared/Button';
import './selected-cubes-bar.scss';

const SelectedCubesBar = ({ cubePrice }: { cubePrice:number}) => {
  const selectedCubes = useSelector((state) => state.cubesReducer.selectedCubesInfo?.cubesId) || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="selected-coubs">
      <div className="selected-coubs--count">{selectedCubes.length}</div>
      <div className="selected-coubs--title">არჩეული კუბები</div>
      <Button
        type="secondary"
        handleClick={() => {
          console.log('movida');
          selectedCubes.length > 0 && dispatch(setSelectedCubes(selectedCubes));
          dispatch(setTotalPriceInStore(selectedCubes.length * cubePrice));
        }}
      >
        კალათაში დამატება

      </Button>
      <Button
        disabled={selectedCubes.length === 0}
        handleClick={() => {
          navigate('cart');
          dispatch(setSelectedCubes(selectedCubes));
          dispatch(setTotalPriceInStore(selectedCubes.length * cubePrice));
        }}
      >
        ყიდვა

      </Button>
    </div>
  );
};

export default SelectedCubesBar;
