import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const idTimeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(idTimeout);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
