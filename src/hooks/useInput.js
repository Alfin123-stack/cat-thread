import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    setValue(event ? event.target?.value : '');
  };

  return [value, onValueChangeHandler];
}

export default useInput;
