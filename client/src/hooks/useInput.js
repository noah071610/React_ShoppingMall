import { useState, useCallback } from "react";

export default function useInput(initialValue = null) {
  const [Value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [Value, handler, setValue];
}
