import React, { useEffect, useState } from "react";

export const ImageSearchResults = ({ query }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_API_KEY"; // Replace with your Google API Key
  const SEARCH_ENGINE_ID = "YOUR_SEARCH_ENGINE_ID"; // Replace with your Search Engine ID

  // Function to fetch image search results
  const searchImages = (query) => {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}&searchType=image`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.items || []); // Store the image results
        setLoading(false); // Stop loading
        setError(null); // Clear any errors
      })
      .catch((error) => {
        setError(error.message); // Store error message
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    if (query) {
      setLoading(true); // Start loading
      searchImages(query); // Fetch image results
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="image-results-container">
      {data && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div key={index} className="image-result-item">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.link} alt={item.title || "No Title"} className="result-image" />
              </a>
              <p className="image-title">{item.title || "No Title"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No image results found.</p>
      )}
    </div>
  );
};
