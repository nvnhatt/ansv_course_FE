import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getMovieDetail } from "../apis/movie";
import WatchView from "../components/WatchView";

function Movie() {
  const { id } = useParams();

  const { data, error } = useSWR(`movie-${id}`, () =>
    getMovieDetail(id as string)
  );

  return (
    <WatchView
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}></WatchView>
  );
}

export default Movie;
