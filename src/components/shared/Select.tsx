import ReactSelect, { StylesConfig } from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Select = () => {
  return (
    <ReactSelect menuIsOpen styles={SelectStyles} options={options} />
  );
};

export default Select;

const SelectStyles: StylesConfig = {
  container: () => ({ width: '100%' }),
  menuList: () => ({ width: 'max-content' }),
};
