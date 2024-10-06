import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchy from "../imgs/searchy.png";
import Loading from "./Loading";
import { useSearchContext } from "../Context/ResultContextProvider"; // Import the hook to use context

export default function Home() {
  const { searchQ,setSearchQ,setResultsRecorded,searchTerm, setSearchTerm } = useSearchContext(); // Access global searchTerm and setSearchTerm from context
  const navigate = useNavigate(); // React Router's navigation hook

 
  // Function to handle keypress event
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchQ(searchTerm);
      // Only navigate when the Enter key is pressed
      if (searchTerm.trim()) {
        setSearchQ(searchTerm);
        // setResultsRecorded(false);
        navigate(`/search?query=${searchTerm}`); // Redirect to search page with query
      }
    }
  };

  return (
    <>
      {/* <Loading /> */}
      <div id="homePg">
        <img src={searchy} alt="" />

        <input
          type="text"
          id="homeInput"
          value={searchTerm} // Use the global searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update the global searchTerm state
          
          onKeyDown={handleKeyPress}
          placeholder="Type and press Enter"
        />
      </div>
    </>
  );
}
