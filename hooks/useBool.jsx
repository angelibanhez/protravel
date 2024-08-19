import { useState } from 'react';

export default function useBool(def) {
  const [val, setVal] = useState(def)
  return {
    value: val,
    setValue: setVal,
    isTruthy: val,
    isFalse: !val,
    isOpen: val,
    isClosed: !val,
    turnOn: () => setVal(true),
    turnOff: () => setVal(false),
    open: () => setVal(true),
    close: () => setVal(false),
    toggle: () => setVal((v) => !v),
  }
}
