import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks/useSelector';
import ClearIcon from '../../../Icons/ClearIcon';
import { CUBES_TOTAL_ROWS } from '../../../Routes/Cubes/Cubes';
import { toggleCartModal } from '../../../store/ducks/cartModalDuck';
import { clearSelectedCubes, setSelectedCubes, setTotalPriceInStore } from '../../../store/ducks/cubesDuck';
import Button from '../../shared/Button';
import './selected-cubes-bar.scss';

const SelectedCubesBar = ({ cubePrice, selectedCubes, setSelectedCubesInLocalState }: PropsTypes) => {
  const [canAddInCart, setCanAddInCart] = useState<boolean>(false);
  const [showErrorBox, setShowErrorBox] = useState<boolean>(false);
  const timer = useRef<any>();
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearSelectedCubes());
    setSelectedCubesInLocalState([]);
    toast.success('არჩეული უჯრები წაიშალა');
  };

  const handleContinue = () => {
    if (canAddInCart) {
      dispatch(toggleCartModal());
      dispatch(setSelectedCubes(selectedCubes));
      dispatch(setTotalPriceInStore(selectedCubes.length * cubePrice));
    } else {
      setShowErrorBox(true);
    }
  };

  // check if selected cubes ids is square
  useEffect(() => {
    if (selectedCubes.length > 0) {
      const res = checkIfSelectedCubesAreSquare(selectedCubes);
      setCanAddInCart(res);
    }
  }, [selectedCubes]);

  useEffect(() => {
    if (showErrorBox) {
      timer.current = setTimeout(() => {
        setShowErrorBox(false);
      }, 2000);
    }
    return () => clearTimeout(timer.current);
  }, [showErrorBox]);

  return (
    <div className="selected-coubs">
      {showErrorBox && (
      <div className="selected-coubs--error-box">
        <h1>
          ფიგურის ფორმა არასწორია
          <Button handleClick={() => setShowErrorBox(false)} type="icon" classes="is-rounded"><ClearIcon /></Button>
        </h1>
        <p>უჯრების ყიდვა შეგიძლიათ მხოლოდ იმ შემთხვევაში თუ უჯრების ფორმა წარმოქმნის ოთკუთხედ ფიგურას, მადლობა.</p>
      </div>
      )}
      <div className="selected-coubs--count">{selectedCubes.length}</div>
      <div className="selected-coubs--title">არჩეული კუბები</div>
      <Button
        disabled={selectedCubes.length === 0}
        type="secondary"
        handleClick={handleClear}
      >
        გაგრძელება
      </Button>
      <Button
        disabled={selectedCubes.length === 0}
        handleClick={handleContinue}
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

interface PropsTypes {
  cubePrice:number,
   selectedCubes:number[],
   setSelectedCubesInLocalState: Dispatch<SetStateAction<number[]>>
}
