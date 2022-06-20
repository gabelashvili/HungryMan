import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import ClearIcon from '../../Icons/ClearIcon';
import Button from '../shared/Button';
import AboutUs from './AboutUs/AboutUs';
import HowToUse from './HowTouse/HowToUse';
import SoldCubesCountBar from './SoldCubesCountBar/SoldCubesCountBar';

const InfoModal = ({
  soldCubesPercent, soldCubesCnt, open, toggle,
}: PropsTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref, disabled: false, handleOutsideClick: () => toggle(false) });
  return (
    <>
      <div className={clsx('modal modal--right', open && 'is-active')} ref={ref}>
        <div className="modal--header">
          <h3 className="modal--title">კითხვარი</h3>
          <Button type="text" classes=" is-rounded button-pull-right" handleClick={() => toggle(false)}>
            <ClearIcon />
          </Button>
        </div>

        <div className="modal--content">
          <SoldCubesCountBar soldCubesPercent={soldCubesPercent} soldCubesCnt={soldCubesCnt} />
          <br />
          <AboutUs />
          <br />
          <HowToUse />
        </div>
      </div>
      {open && <div className="overlay" />}
    </>
  );
};

export default InfoModal;

interface PropsTypes {
    soldCubesPercent:number,
    soldCubesCnt:number,
    open: boolean,
    toggle: Dispatch<SetStateAction<boolean>>,
}
