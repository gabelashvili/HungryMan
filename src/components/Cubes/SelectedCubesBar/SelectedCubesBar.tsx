import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks/useSelector';
import { CUBES_TOTAL_ROWS } from '../../../Routes/Cubes/Cubes';
import { setSelectedCubes, setTotalPriceInStore } from '../../../store/ducks/cubesDuck';
import Button from '../../shared/Button';
import './selected-cubes-bar.scss';

const SelectedCubesBar = ({ cubePrice, selectedCubes }: { cubePrice:number, selectedCubes:number[]}) => {
  const [canAddInCart, setCanAddInCart] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCartAdd = () => {
    if (canAddInCart) {
      dispatch(setSelectedCubes(selectedCubes));
      dispatch(setTotalPriceInStore(selectedCubes.length * cubePrice));
      toast.success('კალათა განახლდა');
    } else {
      toast.error('არჩეული კუბიკები უნდა ადგენდნენ მართკუთხედს');
    }
  };

  const handleBuy = () => {
    if (canAddInCart) {
      navigate('cart');
      dispatch(setSelectedCubes(selectedCubes));
      dispatch(setTotalPriceInStore(selectedCubes.length * cubePrice));
    } else {
      toast.error('არჩეული კუბიკები უნდა ადგენდნენ მართკუთხედს');
    }
  };

  // check if selected cubes ids is square
  useEffect(() => {
    if (selectedCubes.length > 0) {
      const res = checkIfSelectedCubesAreSquare(selectedCubes);
      // setCanAddInCart(res);
    }
  }, [selectedCubes]);
  return (
    <div className="selected-coubs">
      <div className="selected-coubs--count">{selectedCubes.length}</div>
      <div className="selected-coubs--title">არჩეული კუბები</div>
      <Button
        disabled={selectedCubes.length === 0}
        type="secondary"
        handleClick={handleCartAdd}
      >
        კალათაში დამატება
      </Button>
      <Button
        disabled={selectedCubes.length === 0}
        handleClick={handleBuy}
      >
        ყიდვა

      </Button>
    </div>
  );
};

export default SelectedCubesBar;

const checkIfSelectedCubesAreSquare = (data: number[]) => {
  const formattedData: {[key:string]: number[]} = {};
  let isSquare = true;
  data.forEach((el) => {
    const row = Math.ceil(el / CUBES_TOTAL_ROWS);
    if (formattedData[row]) {
      formattedData[row].push(el);
    } else {
      formattedData[row] = [el];
    }
  });
  const keys = Object.keys(formattedData);
  for (let i = 1; i < keys.length; i++) {
    if (formattedData[keys[i]].length !== formattedData[keys[i - 1]].length) {
      isSquare = false;
      return isSquare;
    }
  }
  return isSquare;
};
