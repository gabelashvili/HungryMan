import { useState } from 'react';
import DoneIcon from '../../../Icons/DoneIcon';
import Button from '../../shared/Button';
import Select from '../../shared/Select';
import TextField from '../../shared/TextField';

const Text = ({ handleTextAdd }: {handleTextAdd: (val: {val:string, fontSize:number}) => void}) => {
  const [value, setValue] = useState<{val:string, fontSize:number}>({ val: '', fontSize: 8 });
  return (
    <div className="text-selector">
      <div className="form__group">
        <TextField
          classes="input--small"
          label="მიუთითე ტექსტი"
          value={value.val}
          handleChange={(val) => setValue({ ...value, val })}
          inputName="text"
        />
        <TextField
          classes="input--small"
          label="მიუთითე ფონტის ზომა"
          value={value.fontSize}
          handleChange={(fontSize) => setValue({ ...value, fontSize: Number(fontSize) })}
          inputName="number"
        />
        <Select />
      </div>
      <div className="form__group">
        <Button type="icon" handleClick={() => handleTextAdd(value)}><DoneIcon /></Button>
      </div>
    </div>
  );
};

export default Text;
