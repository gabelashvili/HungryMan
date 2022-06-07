import ReactSelect, { StylesConfig } from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolateqwdqwdqwdqqwdqwdd' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Select = () => {
  return (
    <ReactSelect styles={SelectStyles} options={options} />
  );
};

export default Select;

const SelectStyles: StylesConfig = {
//   menu: (styles) => ({ ...styles, width: '100%' }),
  container: (styles) => ({ ...styles, width: '100%', height: '100%' }),
  control: (styles) => ({
    ...styles, width: '100%', height: '100%', background: '#112231', boxShadow: 'none', border: 'none',
  }),
  menuList: (styles) => ({ ...styles, background: '#112231' }),
  option: (styles, state) => {
    let bgColor = '#112231';
    if (state.isSelected || state.isFocused) {
      bgColor = '#050b10';
    }
    return { ...styles, background: bgColor };
  },
  singleValue: (styles) => ({ ...styles, color: 'white' }),
};
