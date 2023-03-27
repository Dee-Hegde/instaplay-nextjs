import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/Logo.svg";
import { Input } from "antd";
import { TodoContext } from "@/context/DashBoardContext";
import { useRouter } from "next/router";

const { Search } = Input;

function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>("");
  const { term, setTerm, setIsloading } = useContext(TodoContext);

  const handleLogout = (): void => {
    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const temp = localStorage.getItem("accessToken");
    setToken(temp);
  }, [router]);
  return (
    <div className="nav-Main">
      <div className="logo-container">
        <Image src={Logo} alt="" />
        {router.pathname !== "/" && (
          <p
            style={{ color: "white", cursor: "pointer" }}
            onClick={handleLogout}
            className="mobile logout-key"
          >
            Logout
          </p>
        )}
      </div>
      {token === "true" && (
        <div className="search-container">
          {router.pathname === "/dashboard" && (
            <div className="search-input-container">
              <Search
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setIsloading(true);
                }}
                className="seachbar"
                placeholder="search movies"
                enterButton
              />
            </div>
          )}
          {router.pathname !== "/" && (
            <p
              style={{ color: "white", cursor: "pointer" }}
              onClick={handleLogout}
              className="desktop "
            >
              Logout
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
