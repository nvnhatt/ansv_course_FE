import { FC, useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import SearchBox from "../components/Search/SearchBox";
import SearchResult from "../components/Search/SearchResult";
import Title from "../components/Title";
import TopSearches from "../components/Home/TopSearches";
import { useQueryParams } from "../hooks/useQueryParams";
import Sidebar from "../components/Sidebar";
import { Link, useLocation } from "react-router-dom";

const Search: FC = () => {
  const queryParams = useQueryParams();
  const query = queryParams.get("q");
  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  if (!query?.trim())
    return (
      <>
        <Title value="Search | WatchFilms" />
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

          <div className="flex justify-center my-[100px] mx-6 w-full">
            <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
              <div className="flex flex-col items-stretch gap-3">
                <h1 className="text-2xl">Search for your favorite movies</h1>
                <SearchBox autoFocus />
              </div>

              <div className="mt-8 w-full">
                <h1 className="text-xl mb-3 font-bold">Popular Searches</h1>
                <TopSearches />
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Title value={`Search for ${query} - WatchFilms`} />
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div>
          <h1 className="mb-6 text-3xl">Search result for {query}</h1>
        </div>
        <SearchResult query={query} />
      </div>
    </>
  );
};

export default Search;
