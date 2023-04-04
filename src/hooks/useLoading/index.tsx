import React, { createContext, useCallback, useContext, useState } from "react";

interface ILoadingContext {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const defaultContext: ILoadingContext = {
  isLoading: false,
  showLoading: () => null,
  hideLoading: () => null,
};

const Context = createContext(defaultContext);
const useLoading = () => useContext(Context);

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const providerValue = {
    showLoading,
    hideLoading,
    isLoading: loading,
  };

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export default {
  useLoading,
  Provider,
};
