import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Search from "./Components/Search";
import { SearchContextProvider } from "./Context/ResultContextProvider"; // Import the context provider
import ResultsNavbar from "./Components/ResultsNavbar";
import Loading from "./Components/Loading";

export default function App() {
  return (
    <SearchContextProvider> {/* Wrap your entire app with the context provider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search/" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}
