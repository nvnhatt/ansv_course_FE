import { DetailType } from "../../shared/types";
import { FC } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";

interface MetaDataProps {
  data?: DetailType;
  episodeIndex: number | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex }) => {
  return (
    <>
      {data ? (
        <div className="">
          <h1 className="text-3xl mt-5">{data?.name}</h1>

          <div className="flex gap-4 my-3">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star mr-1"/>
              <p>{data?.score?.toFixed(1)}</p>
            </div>
            <div className="flex items-center gap-1 ml-3">
              <i className="fa-solid fa-calendar mr-1"/>
              <p>{data?.year}</p>
            </div>
          </div>

          <div className="flex my-3 gap-3 overflow-auto py-2">
            {data.tagList.map((tag) => (
              <Link
                to={`/category/${tag.id}`}
                key={tag.id}
                className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300 inline-block">
                {tag.name}
              </Link>
            ))}
          </div>

          <p>{data.introduction}</p>

          {data.episodeVo.length > 1 && (
            <>
              <h1 className="text-xl my-3">Episodes</h1>
              <div className="max-w-full block justify-around">
                {data.episodeVo.map((_, index) => (
                  <Link
                    to={`/tv/${data.id}?episode=${index}`}
                    key={index}
                    className={`inline-block px-3 py-[8px] m-1 bg-dark-lighten rounded hover:brightness-125 transition duration-300 ${
                      index === episodeIndex ? "!bg-primary text-white" : ""
                    }`}>
                    {index + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <Skeleton className="w-[70%] h-8 mt-6" />
          <Skeleton className="w-[60%] h-8 mt-6" />
        </>
      )}
    </>
  );
};

export default MetaData;
