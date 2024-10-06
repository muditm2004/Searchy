import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Results from "./Results";
import ResultNav from "./ResultsNavbar";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useSearchContext } from "../Context/ResultContextProvider";
import Loading from "./Loading";

export default function Search() {
  const location = useLocation();
  const { searchQ,setSearchQ, setSearchTerm, getSearchResults } = useSearchContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query");
    
      if (searchQuery && searchQ !== searchQuery) {
        setSearchTerm(searchQuery);
        setSearchQ(searchQuery);
        getSearchResults(searchQuery); // Call the function to fetch results
      }
    }, [location.search]);

  return (
    <>
      <Navbar />
      <ResultNav />
      <Results />
      <Footer />
    </>
  );
}
