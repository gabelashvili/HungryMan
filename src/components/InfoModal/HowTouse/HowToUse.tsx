import clsx from 'clsx';
import { useState } from 'react';
import ArrowIcon from '../../../Icons/ArrowIcon';
import Button from '../../shared/Button';
import './how-to-use.scss';

const HowToUse = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="how-to">
      <div className={clsx('panel', show && 'is-active')}>
        <div className="panel--header">
          <h3 className="panel--title">როგორ გამოვიყენო?</h3>
          <Button type="icon" classes=" button--text button-pull-right is-rounded" handleClick={() => setShow(!show)}>
            <ArrowIcon />
          </Button>
        </div>

        <div className="panel--content">
          <div className="how-to-use">
            <div className="how-to-use--item">
              <div className="how-to-use--title">კადრის მიახლოვება</div>
              <div className="how-to-use--source">+</div>
            </div>
            <div className="how-to-use--item">
              <div className="how-to-use--title">კადრის დაშორება</div>
              <div className="how-to-use--source">-</div>
            </div>
            <div className="how-to-use--item">
              <div className="how-to-use--title">კუბის არჩევა</div>
              <div className="how-to-use--source">Left click</div>
            </div>
            <div className="how-to-use--item">
              <div className="how-to-use--title">გადაადგილება</div>
              <div className="how-to-use--source">Space</div>
              +
              <div className="how-to-use--source">Drag</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
