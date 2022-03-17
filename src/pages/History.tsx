import { FC, useEffect, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import { resizeImage } from "../shared/constants";

const getHistory = () => {
  try {
    const existing = JSON.parse(
      localStorage.getItem("WatchFilms-recent") || "[]"
    );
    return existing;
  } catch {
    return [];
  }
};

const History: FC = () => {
  const [data, setData] = useState(getHistory());
  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  const clearHistory = () => {
    localStorage.removeItem("WatchFilms-recent");
    setData(getHistory());
  };

  return (
    <>
      <Title value="Watch history | WatchFilms" />
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

        {/* <div className="flex-grow py-10 px-[4vw]"></div> */}
        <div className="flex flex-col items-stretch mx-[7vw] mb-8 w-full mt-10">
          {/* <NavBar /> */}
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl">Watch history</h1>

            <button onClick={clearHistory} className="text-primary">
              <i className="fas fa-trash"></i> <span>Clear</span>
            </button>
          </div>
          {data.length === 0 ? (
            <div className="flex flex-col items-center my-10 gap-6">
              <i className="fa-2x fa-regular fa-face-meh-blank"></i>

              <p className="text-xl">No Watch history found</p>

              <Link className="text-xl text-primary" to="/">
                Discover more
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-sm md:grid-cols-lg">
              {data.map((item) => (
                <Link
                  title={item.name}
                  to={
                    item.category === 0 ? `/movie/${item.id}` : `/tv/${item.id}`
                  }
                  key={item.id}
                  className="relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
                    <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                      <LazyLoadImage
                        effect="opacity"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={resizeImage(item.coverVerticalUrl, "250")}
                        alt=""
                      />
                    </div>

                    <div className="flex-grow flex items-center">
                      <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                        {item.name}
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
