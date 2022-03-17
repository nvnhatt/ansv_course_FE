import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Discovery from "./pages/Discovery";
import Explorer from "./pages/Explorer";
import History from "./pages/History";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Signin from "./pages/Signin";
import TV from "./pages/TV";
import { useEffect } from "react";

function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);


  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/discovery" element={<Discovery />} />
      <Route path="/explore" element={<Explorer />} />
      <Route path="/history" element={<History />} />
      <Route path="movie/:id" element={<Movie />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="tv/:id" element={<TV />} />
    </Routes>
  );
}

export default App;
