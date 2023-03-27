import { getTrendingMovies } from "@/http-helpers/home/home";
import { AllDashboardResponse } from "@/model/home";
import React, { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TodoContext = React.createContext<any>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = (props: any) => {
  const [data, setData] = useState<AllDashboardResponse | undefined>();
  const [term, setTerm] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(true);

  const getDashboardData = async (page: number): Promise<void> => {
    const res = await getTrendingMovies(page, term);
    setData(res);
    setIsloading(false);
  };
  useEffect(() => {
    getDashboardData(1);
  }, [term]);

  return (
    <TodoContext.Provider
      value={{
        data,
        setData,
        term,
        setTerm,
        getDashboardData,
        isLoading,
        setIsloading,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default Context;
