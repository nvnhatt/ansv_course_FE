import { FC, useEffect, useState } from "react";

import Error from "../components/Error";
import ExploreConfig from "../components/Explore/ExploreConfig";
import NavBar from "../components/Navbar";
import Title from "../components/Title";
import { getSearchConfig } from "../apis/explore";
import useSWR from "swr";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Explore: FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const location = useLocation();
  const [sectionIndex, setSectionIndex] = useState(0);


  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  const { data: searchConfig, error } = useSWR("search-config", () =>
    getSearchConfig()
  );


  if (error) return <Error />;

  return (
    <>
      <Title value="Explore | WatchFilms" />
      <div className="flex sm:hidden justify-between px-[4vw] mt-6">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 h-8" src="/logo.svg" alt="" />
          <span className="text-xl font-medium">WatchFilms</span>
        </Link>

        <button onClick={() => setSidebarActive(!sidebarActive)}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      <div className="flex">
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />

        <div className="flex-grow py-10 px-[4vw]">
          {!searchConfig ? (
            <div className="flex-grow flex justify-center items-center">
              <div className="w-10 h-10 border-[3px] border-t-transparent border-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex gap-3">
                {searchConfig.map((config, index) => (
                  <button
                    key={index}
                    className={`transition relative after:absolute after:top-[110%] after:left-0 after:w-full after:h-[2px] after:bg-transparent after:rounded after:transition ${
                      sectionIndex === index
                        ? "text-primary after:bg-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSectionIndex(index);
                    }}>
                    {config.name}
                  </button>
                ))}
              </div>
              <ExploreConfig
                config={searchConfig[sectionIndex]}
                sectionIndex={sectionIndex}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Explore;
