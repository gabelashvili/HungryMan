import { useState } from 'react';
import DoneIcon from '../../../Icons/DoneIcon';
import Button from '../../shared/Button';
import TextField from '../../shared/TextField';

const Text = ({ handleTextAdd }: {handleTextAdd: (val:string) => void}) => {
  const [value, setValue] = useState<string>('');
  return (
    <div className="text-selector">
      <div className="form__group">
        <TextField classes="input--small" label="მიუთითე ტექსტი" value={value} handleChange={(value) => setValue(value)} inputName="text" />
      </div>
      <div className="form__group">
        <Button type="icon" handleClick={() => handleTextAdd(value)}><DoneIcon /></Button>
      </div>
    </div>
  );
};

export default Text;
