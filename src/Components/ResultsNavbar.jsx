import React, { useEffect } from "react";
import { useSearchContext } from "../Context/ResultContextProvider";

export default function ResultsNavbar() {
  const {
    setSearchType,
    setHashAndState,
    searchType
  } = useSearchContext();

  // Function to handle click and add border
  function handleSearchType(type) {
    // setSearchType(type);
    console.log(type);
    if (history.pushState) {
      history.pushState(null, null, `#${type}`);
    } 
    else {
      window.location.hash = `#${type}`;
    }
    setHashAndState(type);
    

    // Remove border from all li elements
  }

    // Add border to the clicked li
  //   document.querySelector(`#${type}`).style.borderBottom = "2px solid white";
  // }

  // Set default border when the component loads (on initial render)
  useEffect(() => {
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      item.style.borderBottom = "none"; // Reset border for all
    });

    document.querySelector(`#${searchType}`).style.borderBottom = "2px solid white";
  }, [searchType]); // Empty dependency array to run this effect only on mount

  return (
    <nav className="nav2">
      <ul>
        <li onClick={() => handleSearchType("web")} id="web">All</li>
        <li onClick={() => handleSearchType("images")} id="images">Images</li>
        <li onClick={() => handleSearchType("videos")} id="videos">Videos</li>
        <li onClick={() => handleSearchType("news")} id="news">News</li>
      </ul>
    </nav>
  );
}
