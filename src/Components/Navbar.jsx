import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchy from "../imgs/searchy.png";
import { useSearchContext } from "../Context/ResultContextProvider";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { setSearchQ,setPrevQ,searchTerm, setSearchTerm, setSearchType } = useSearchContext();

  // const [q, setQuery] = useState(query); // React state for the input value
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Only navigate when the Enter key is pressed
      if (searchTerm.trim()) {
        // setResultsRecorded(false);
        setSearchQ(searchTerm);
        setSearchType('web');
        navigate(`/search?query=${searchTerm}#web`); // Redirect to search page with query
      }
    }
  };

  function returningHome(){
    setSearchTerm('')
    // setSearchQ('')
    // setPrevQ('')
    // setSearchType('')
    navigate('/')
  }

  return (
    <>
      <div className="navbar">
        <div className="nav1">
          
            <img src={searchy} onClick={returningHome} className="NavImage" />
          <input
            type="text"
            id="homeInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update query state as user types
            onKeyDown={handleKeyPress} // Trigger search on Enter key press
            placeholder="Type and press Enter"
          />
        </div>
        {/* <div className="nav2">
        
            <ul>
              <li>All</li>
              <li>Images</li>
              <li>News</li>
              <li>Videos</li>

            </ul>
                </div> */}
      </div>
    </>
  );
}
