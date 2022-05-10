import React, { Dispatch, SetStateAction } from 'react';
import ClearIcon from '../../Icons/ClearIcon';
import AddressForm from '../shared/AddressForm';
import Button from '../shared/Button';

const MyAddresses = ({ show, setShow }: {show: boolean, setShow: Dispatch<SetStateAction<boolean>>}) => {
  return (
    show ? (
      <>
        <div className="modal modal--small">
          <div className="modal--header">
            <h3 className="modal--title">ჩემი მისამართები</h3>
            <Button handleClick={() => setShow(false)} type="text" classes="button--icon is-rounded button-pull-right"><ClearIcon /></Button>
          </div>
          <div className="modal--content">
            <div className="radio-list">
              <AddressForm />
            </div>
            <button className="button button--icon-left button--secondary">
              <svg fill="none" viewBox="0 0 14 14">
                <path fill="currentColor" d="M6 6V0h2v6h6v2H8v6H6V8H0V6h6Z" />
              </svg>
              მისამართის დამატება
            </button>
          </div>
        </div>
        <div className="overlay" />
      </>
    ) : null
  );
};

export default MyAddresses;
