import { useState } from 'react';
import ReactSelect, { StylesConfig, components, OptionProps } from 'react-select';

const options = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },

];
const CustomOption = (props: OptionProps) => {
  const { data }: {data: any} = props;
  // eslint-disable-next-line react/destructuring-assignment
  return <components.Option {...props} innerProps={{ style: { fontStyle: data.value }, ...props.innerProps }} />;
};

const SelectFontStyle = ({ handleFontStyleChange }: {handleFontStyleChange: (fontStyle: string) => void}) => {
  const [value, setValue] = useState<{value:string, label:string}>(options[0]);
  return (
    <ReactSelect
      placeholder="Select font"
      className="select"
      classNamePrefix="select"
      styles={SelectStyles}
      closeMenuOnSelect
      value={value}
      onChange={(e:any) => {
        setValue(e);
        handleFontStyleChange(e.value);
      }}
      options={options}
      components={{ Option: CustomOption }}
    />
  );
};

export default SelectFontStyle;

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
