import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Pagination, Spin } from "antd";

import { TodoContext } from "@/context/DashBoardContext";
import Poster from "@/components/home/Poster";
import MovieCard from "@/components/movieCard/MovieCard";
import { Movie } from "@/model/home";

const Dashboard = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, getDashboardData, isLoading, setIsloading } =
    React.useContext(TodoContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== "true") {
      router.push("/");
    } else {
      getData(page);
    }
  }, []);

  const getData = async (page: number): Promise<void> => {
    await getDashboardData(page);
    setPage(data?.page);
    setIsloading(false);
  };

  const handlePagination = (e: number): void => {
    setIsloading(true);
    setPage(e);
    getData(e);
  };

  return (
    <div>
      <Poster />
      <h2 className="trending">Trending</h2>
      {!isLoading ? (
        <>
          <div className="movieCard-container">
            {data?.results?.map((item: Movie, index: number) => (
              <MovieCard key={index} details={item} />
            ))}
          </div>
          <div className="pagianation-container">
            {data?.results?.length > 0 ? (
              <Pagination
                showSizeChanger={false}
                showQuickJumper={false}
                defaultCurrent={1}
                current={data?.page}
                total={data?.total_results}
                onChange={handlePagination}
              />
            ) : (
              <div>
                <Spin size="large" tip="Sorry!, No Data Found"></Spin>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="spin">
          <Spin size="large" tip="Please wait..."></Spin>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
