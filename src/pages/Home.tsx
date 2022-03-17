import { FC, Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import useSWRInfinity from "swr/infinite";
import { getHome } from "../apis/home";
import Skeleton from "../components/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import BannerSlider from "../components/Home/BannerSlider";
import SectionSlider from "../components/Home/SectionSlider";
import { resizeImage } from "../shared/constants";
import SkeletonSlider from "../components/Home/SkeletonSlider";
import SearchBox from "../components/Search/SearchBox";
import TopSearches from "../components/Home/TopSearches";

const Home: FC = () => {
  const location = useLocation();
  const [sidebarActive, setSidebarActive] = useState(false);

  const { data, error, setSize } = useSWRInfinity(
    (index: number) => `home-${index || 0}`,
    (key: string) => getHome(Number(key.split("-")[1])),
    { revalidateFirstPage: false }
  );

  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  useEffect(() => {
    console.log(data, error);
  });

  return (
    <>
      <Title value="Home | WatchFilms" />

      <div className="flex sm:hidden justify-between px-[4vw] mt-6">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <span className="ml-2 text-xl font-sans">WatchFilms</span>
        </Link>

        <button onClick={() => setSidebarActive(!sidebarActive)}>
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      <div className="flex">
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />
        <div className="flex-grow px-[4vw] md:px-8 pb-8 pt-0 overflow-hidden flex flex-col items-stretch">
          {!data || error ? (
            <>
              <div className="relative h-0 pb-[42%] mt-8">
                <Skeleton className="absolute top-0 left-0 w-full h-full rounded-2xl" />
              </div>
              {[...new Array(2)].map((_, index) => (
                <Fragment key={index}>
                  <Skeleton className="my-8 h-6 w-full max-w-[200px]" />

                  <div className="overflow-hidden">
                    <SkeletonSlider />
                  </div>
                </Fragment>
              ))}
            </>
          ) : (
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={() => setSize((prev) => prev + 1)}
              hasMore={!error && data?.slice(-1)?.[0]?.length !== 0}
              loader={
                <>
                  <Skeleton className="my-8 h-6 w-full max-w-[200px]" />
                  <div className="overflow-hidden">
                    <SkeletonSlider />
                  </div>
                </>
              }>
              {data
                .reduce((acc, curr) => [...acc, ...curr], [])
                .map((section) =>
                  section.homeSectionType === "BANNER" ? (
                    <div
                      key={section.homeSectionId}
                      className="overflow-hidden w-full mt-8">
                      <BannerSlider
                        images={
                          section.recommendContentVOList
                            .filter((item) => {
                              const searchParams = new URLSearchParams(
                                new URL(item.jumpAddress).search
                              );
                              return searchParams.get("id");
                            })
                            .map((item) => {
                              const searchParams = new URLSearchParams(
                                new URL(item.jumpAddress).search
                              );

                              return {
                                title: item.title,
                                image: item.imageUrl,
                                link:
                                  searchParams.get("type") === "0"
                                    ? `/movie/${searchParams.get("id")}`
                                    : `/tv/${searchParams.get("id")}`,
                              };
                            }) || []
                        }
                      />
                    </div>
                  ) : section.recommendContentVOList.filter((item) => {
                      const searchParams = new URLSearchParams(
                        new URL(item.jumpAddress).search
                      );
                      return searchParams.get("id");
                    }).length === 0 ? (
                    <></>
                  ) : (
                    <div key={section.homeSectionId}>
                      <h1 className="text-2xl mb-3 mt-8 font-bold">
                        {section.homeSectionName.replace("on Loklok", "")}
                      </h1>

                      <SectionSlider
                        images={section.recommendContentVOList
                          .filter((item) => {
                            const searchParams = new URLSearchParams(
                              new URL(item.jumpAddress).search
                            );
                            return searchParams.get("id");
                          })
                          .map((item) => {
                            const searchParams = new URLSearchParams(
                              new URL(item.jumpAddress).search
                            );
                            return {
                              title: item.title,
                              image: resizeImage(item.imageUrl, "200"),
                              link:
                                searchParams.get("type") === "0"
                                  ? `/movie/${searchParams.get("id")}`
                                  : `/tv/${searchParams.get("id")}`,
                            };
                          })}
                        coverType={section.coverType}
                      />
                    </div>
                  )
                )}
            </InfiniteScroll>
          )}
        </div>

        <div className="flex-shrink-0 w-80 p-8 sticky top-0 h-screen overflow-hidden overflow-y-auto hidden md:block no-scroll">
          <SearchBox />
          <h1 className="text-xl my-6">Top Searches</h1>
          <TopSearches />
        </div>
      </div>
    </>
  );
};

export default Home;
