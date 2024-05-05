import { useState, useEffect } from 'react';

const useCounter = (initialValue = 1, price) => {
  const [count, setCount] = useState(initialValue);
  const [subAmount, setSubAmount] = useState(0);

  const decrement = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    setSubAmount(price * count);
  }, [count, price]);

  return {
    count,
    subAmount,
    decrement,
    increment,
  };
};

export default useCounter;
