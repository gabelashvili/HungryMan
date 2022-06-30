import ReactSelect, { StylesConfig, components, OptionProps } from 'react-select';

const options = [
  { value: 'JosefinSans-light', label: 'Josefin Sans' },
];
const CustomOption = (props: OptionProps) => {
  const { data }: {data: any} = props;
  return <components.Option {...props} innerProps={{ style: { fontFamily: data.value } }} />;
};

const SelectFonts = () => {
  return (
    <ReactSelect
      className="select"
      classNamePrefix="select"
      styles={SelectStyles}
      options={options}
      components={{ Option: CustomOption }}
      menuIsOpen
    />
  );
};

export default SelectFonts;

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
