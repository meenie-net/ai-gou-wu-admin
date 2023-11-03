import { useState, useEffect } from "react";

export const useRefresh = () => {
  const [state, setRefresh] = useState(false);
  useEffect(() => {
    state && setRefresh(false);
  }, [state]);
  const refresh = () => setRefresh(true);
  return { refresh };
};
