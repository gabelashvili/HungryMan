import './how-to-use.scss';

const HowToUse = () => {
  return (
    <div className="panel">
      <div className="panel--header">
        <h3 className="panel--title">როგორ გამოვიყენო?</h3>

        <button className="button button--icon is-rounded button--text button-pull-right">
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00072 5.172L11.9507 0.222L13.3647 1.636L7.00072 8L0.636719 1.636L2.05072 0.222L7.00072 5.172Z"
              fill="currentColor"
            />
          </svg>
        </button>
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

  );
};

export default HowToUse;
