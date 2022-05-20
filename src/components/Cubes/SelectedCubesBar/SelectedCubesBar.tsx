import './selected-cubes-bar.scss';

const SelectedCubesBar = () => {
  return (
    <div className="selected-coubs">
      <div className="selected-coubs--count">13</div>
      <div className="selected-coubs--title">არჩეული კუბები</div>
      <button className="button button--secondary">კალათაში დამატება</button>
      <button className="button button--primary">ყიდვა</button>
    </div>
  );
};

export default SelectedCubesBar;
