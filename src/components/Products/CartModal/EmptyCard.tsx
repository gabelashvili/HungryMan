import React from 'react';

const EmptyCard = () => {
  return (
    <div className="cart-empty">
      <svg fill="none" viewBox="0 0 86 79" width="70px">
        <path
          stroke="#55687A"
          strokeMiterlimit="10"
          strokeWidth="3"
          d="M17.916 23.292H5.374a3.583 3.583 0 0 0-3.583 3.583v3.583a3.583 3.583 0 0 0 3.583 3.584h10.75m41.209-10.75H28.666m41.208 10.75h10.75a3.583 3.583 0 0 0 3.583-3.584v-3.583a3.583 3.583 0 0 0-3.583-3.583H68.082m-28.666 43H18.651a5.375 5.375 0 0 1-5.25-4.21l-6.235-28.04m71.667 0L77.04 43"
        />
        <path
          stroke="#55687A"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          d="M32.25 1.792 21.5 28.667M53.75 1.792 64.5 28.667"
        />
        <path
          stroke="#55687A"
          strokeMiterlimit="10"
          strokeWidth="3"
          d="M60.917 77.042c9.895 0 17.916-8.022 17.916-17.917 0-9.895-8.021-17.917-17.916-17.917S43 49.23 43 59.125c0 9.895 8.022 17.917 17.917 17.917Zm-.001-26.875v17.916m8.958-8.958H51.957"
        />
        <path
          stroke="#55687A"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          d="m32.25 39.417 1.792 17.916M21.5 39.417l3.583 17.916"
        />
      </svg>
      <h5>კალათა ცარიელია</h5>
      <p>
        კალათის შესავსებათ გთხოვთ ეწვიოთ კუბების ან პროდუქტების გვერდს და
        შეიძინოთ სასურველი პროდუქცია
      </p>
    </div>
  );
};

export default EmptyCard;
