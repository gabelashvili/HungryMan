import { Dispatch, SetStateAction } from 'react';
import ColorSelector from '../../shared/ColorSelector';

const Colors = ({ selectedColor, setSelectedColor, colorsList }:
    {
        selectedColor: string,
        setSelectedColor: Dispatch<SetStateAction<string>>
        colorsList: string[]
    }) => {
  return (
    <div className="color-selector">
      {colorsList.map((el) => (
        <ColorSelector
          color={el}
          key={el}
          selectedColor={selectedColor}
          handleChange={() => setSelectedColor(el)}
        />
      ))}

      {/* <label htmlFor="xColor" className="color-selector--label x-color">
        <input type="color" id="xColor" />

        <span className="x-color--icon">
          <svg fill="none" viewBox="0 0 14 13">
            <path
              fill="#000"
              d="M12.85.65c-.75-.75-1.95-.75-2.7 0L7.5 3.3l-.65-.65c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7L6.8 4 1.5 9.3c-.3.3-.5.7-.55 1.15-.3.25-.45.65-.45 1.05 0 .85.65 1.5 1.5 1.5.4 0 .8-.15 1.1-.45.4-.05.8-.25 1.1-.55l5.3-5.3.65.65c.1.1.25.15.35.15.1 0 .25-.05.35-.15.2-.2.2-.5 0-.7L10.2 6l2.65-2.65c.75-.75.75-1.95 0-2.7ZM3.5 11.3c-.2.2-.4.3-.65.25-.2 0-.35.1-.45.25-.05.1-.25.2-.4.2-.3 0-.5-.2-.5-.5 0-.15.1-.35.25-.4.15-.1.25-.25.25-.45 0-.25.1-.5.25-.65L7.5 4.7 8.8 6l-5.3 5.3Z"
            />
          </svg>
        </span>
        <span className="color-selector--box is-large" />
      </label> */}
    </div>
  );
};

export default Colors;
