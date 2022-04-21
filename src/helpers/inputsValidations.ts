const validateInput = (data: any, validations: any): {[key:string]: string} => {
  const errors: {[key:string]: string} = {};
  Object.keys(data).forEach((el) => {
    if (validations[el]) {
      if (validations[el]?.required && !data[el].toString()) {
        errors[el] = validations[el]?.errorMessage || 'აუცილებელი ველი';
      } else if (validations[el]?.pattern && !data[el].toString().match(validations[el]?.pattern || '')) {
        errors[el] = validations[el]?.errorMessage || 'არასწორი ფორმატი';
      } else if (validations[el]?.min && data[el].toString()?.length < validations[el]?.min) {
        errors[el] = validations[el]?.errorMessage || `${validations[el].name} უნდა შეიცავდეს მინიმუმ ${validations[el].min}-ი სიმბოლოს`;
      } else if (validations[el]?.max && data[el].toString()?.length > validations[el]?.max) {
        errors[el] = validations[el]?.errorMessage || `${validations[el].name} უნდა შეიცავდეს მაქსიმუმ ${validations[el].max}-ი სიმბოლოს`;
      }
    }
  });

  return errors;
};

export default validateInput;

// interface PropsTypes {
//    [key:string]: {
//         name: string,
//          min: number,
//          max: number,
//          required: boolean,
//          errorMessage?: string,
//          pattern?: RegExp
//         }
// }
