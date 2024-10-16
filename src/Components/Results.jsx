import React from "react";
import { useSearchContext } from "../Context/ResultContextProvider"; // Adjust the path as necessary
import Loading from "./Loading";

const Results = () => {
  const {
    ansResults,
    resultsRecorded,
    setResultsRecorded,
    searchResults,
    webResults,
    setWebResults,
    imgResults,
    setImgResults,
    videoResults,
    setVideoResults,
    newsResults,
    setNewsResults,
    searchType,
    isLoading,
  } = useSearchContext();

  // Function to extract the domain from a URL
  function extractDomain(url) {
    if (!url) return "";
    // if (url.startsWith("/url?esrc=s&q=&rct=j&sa=U&url=")) {
    //   const actualUrl = url.split("/url?esrc=s&q=&rct=j&sa=U&url=")[1].split("&")[0];
    //   url = decodeURIComponent(actualUrl);
    // }
    // Use a regular expression to match the domain part
    const match = url.match(/^(https?:\/\/)?(www\.)?([^\/]+)(\/.*)?$/);
    return match ? match[3] : null;
  }

  // If loading is true, show loading component
  if (isLoading) {
    return <Loading />;
  }

  // Function to handle rendering based on search type
  function resultType(type) {
    switch (type) {
      case "web":
        return (
          <>
            {(ansResults) && (ansResults.text) ? (
              <div className="ansContainer">
                
                  <div className="ans-result-item">
                    { ([null,''].includes(ansResults.icon)) ? (<></>) : (
                      <div className="result-Favicon-Name">
                      <img
                        className="result-favicon"
                        src={ansResults.icon}
                        alt="favicon"
                      />
                    </div>
                    ) }
                    
                    { ([null,''].includes(ansResults.topic)) ? (<></>) : (
                    <h2 className="ans-title">
                      <a href={ansResults.url} target='_blank'>
                        {ansResults.topic}
                      </a>
                    </h2>
                    )}

                    <p className="ans-body">{ansResults.text}</p>
                  </div>
                
              </div>
            ) : (
              <></>
            )}
            <div className="results-container">
              {webResults.map((item, index) => (
                <div key={index} className="result-item">
                  <div className="result-Favicon-Name">
                    <img
                      className="result-favicon"
                      src={`https://www.google.com/s2/favicons?domain=${item.href}&sz=64`}
                      alt="favicon"
                    />
                    <a href={item.href} target='_blank'>
                      <p className="result-siteName">
                        {extractDomain(item.href)}
                      </p>
                    </a>
                  </div>

                  <h2 className="result-title">
                    <a className="result-url" href={item.href}>
                      {item.title}
                    </a>
                  </h2>
                  <p className="result-snippet">{item.body}</p>
                </div>
              ))}
            </div>
          </>
        );

      case "images":
        // setImgResults(searchResults);
        return (
          <div className="image-results-container">
            {imgResults.length > 0 ? (
              imgResults.map((item, index) => (
                <a href={item.url} target='_blank'>
                  <div key={index} className="img-item">
                    <div className="imgContainer">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="image-title">{item.title}</div>
                  </div>
                </a>
              ))
            ) : (
              <div className="noresults">
                <p>{`No images found 😔`}</p>
              </div>
            )}
          </div>
        );

      case "videos":
        // setImgResults(searchResults);
        return (
          <div className="videos-results-container">
            {videoResults.length > 0 ? (
              videoResults.map((item, index) => (
                <div key={index} className="vdo-item">
                  <div className="vdoContainer">
                    <iframe src={item.embed_url} />
                  </div>
                  <div className="vdo-title">{item.title}</div>
                </div>
              ))
            ) : (
              <div className="noresults">
                <p>{`No Videos found 😔`}</p>
              </div>
            )}
          </div>
        );

      case "news":
        function formatDate(dateString) {
          const options = {
            year: "numeric",
            month: "long", // Display the full month name
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true, // Use 12-hour clock
          };

          const date = new Date(dateString);

          return date.toLocaleDateString("en-US", options);
        }

        return (
          <div className="news-results-container">
            {newsResults.map((item, index) => (
              <div key={index} className="news-result-item">
                <div className="newsContentSide">
                  <div className="result-Favicon-Name">
                    <img
                      className="result-favicon"
                      src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=64`}
                      alt="favicon"
                    />
                    <a href={item.url} target='_blank'>
                      <p className="result-siteName">
                        {extractDomain(item.url)}
                      </p>
                    </a>
                  </div>

                  <h2 className="result-title">
                    <a className="result-url" href={item.url}>
                      {item.title}
                    </a>
                  </h2>
                  <p className="result-snippet">{item.body}</p>
                  <p className="newsDate">{formatDate(item.date)}</p>
                </div>
                <div className="news-ImgSide">
                  <img src={item.image} />
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null; // If no valid search type is found, return null
    }
  }

  return resultType(searchType);
};

export default Results;
