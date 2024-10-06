import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Create the context
const SearchContext = createContext();

// Provider component
export const SearchContextProvider = ({ children }) => {
  // States to manage the search searchResults, loading, and search term
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("web");
  const [webResults, setWebResults] = useState([]);
  const [ansResults, setAnsResults] = useState([]);
  const [imgResults, setImgResults] = useState([]);
  const [newsResults, setNewsReslts] = useState([]);
  const [videoResults, setVideoResutls] = useState([]);
  const [resultsRecorded, setResultsRecorded] = useState(false); // Added for context use
  const [prevQ, setPrevQ] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const BASE_URL = "https://alive-compassionate-appeal.anvil.app/_/api/";


  const updateStateFromHash = () => {
    const hash = window.location.hash.replace("#", ""); // Get the hash without the '#' symbol
    if (hash) {
      setSearchType(hash);
      console.log('value updated to',hash);
      
    }
  };

  // useEffect to sync state with the URL hash
  useEffect(() => {
    // Set state based on the current hash on component load
    updateStateFromHash();

    // Listen for hash changes and update state accordingly
    window.addEventListener("hashchange", updateStateFromHash);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("hashchange", updateStateFromHash);
    };
  }, []);


  const setHashAndState = (newHash) => {
    window.location.hash = `#${newHash}`; // Change the hash in the URL
    setSearchType(newHash);               // Update the state
  };

  // Fetch search results from API
  const getSearchResults = useCallback(
    async (searchQ) => {
      if (!searchQ) return; // Exit if searchTerm is empty
      // setIsLoading(true);
      // if (resultsRecorded) setIsLoading(false);

      const lastQ=prevQ;
      console.log('l:',lastQ);
      

    
        try {

          if (lastQ !== searchQ){
            setWebResults([]);
            setImgResults([]);
            setNewsReslts([]);
            setVideoResutls([]);
            // setSearchType('web');
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}${searchType}/${searchQ}`,{
              method:"GET"
            });

            const data = await response.json();
            setPrevQ(searchQ);
            console.log('QueryChanged Response: ',data);
            

            switch(searchType){
              case 'web':
                const ansResponse=await fetch(`${BASE_URL}ans/${searchQ}`,{method:"GET"});
                const ansData=await ansResponse.json();
                setAnsResults(ansData[0]);
                setWebResults(data);
                setIsLoading(false);
                break;
              case 'images':
                setImgResults(data);
                setIsLoading(false);
                break;
              case 'videos':
                setVideoResutls(data);
                setIsLoading(false);
                break;
              case 'news':
                setNewsReslts(data);
                setIsLoading(false);
                break;
              
            }

          }

          else{
            switch(searchType){
              case 'web':
                if (webResults.length===0){
                  setIsLoading(true);
                  const ansResponse=await fetch(`${BASE_URL}ans/${searchQ}`,{method:"GET"});
                const ansData=await ansResponse.json();
                setAnsResults(ansData[0]);
                  const response = await fetch(`${BASE_URL}web/${searchQ}`,{
                    method: 'GET'});
                    const data = await response.json();
                    setWebResults(data);
                  setIsLoading(false);
                }

                else{
                  setIsLoading(false);
                }
              break;




              case 'images':
                if (imgResults.length===0)  {
                  console.log('fetching IMG');
                  
                  setIsLoading(true);
                  const response = await fetch(`${BASE_URL}images/${searchQ}`,{
                    method: 'GET'});
                    const data = await response.json();
                    setImgResults(data);
                  setIsLoading(false);
                }

                else{
                  console.log('Not Fetching Image');
                  
                  setIsLoading(false);
                }
              break;



              case 'videos':
                if (videoResults.length===0){
                  console.log('fetching videos');
                  
                  setIsLoading(true);
                  const response = await fetch(`${BASE_URL}videos/${searchQ}`,{
                    method: 'GET'});
                    const data = await response.json();
                    setVideoResutls(data);
                  setIsLoading(false);
                }

                else{
                  console.log('Not Fetching Videos');
                  
                  setIsLoading(false);
                }
              break;



              case 'news':
                if (newsResults.length===0){
                  console.log('fetching News');
                  
                  setIsLoading(true);
                  const response = await fetch(`${BASE_URL}news/${searchQ}`,{
                    method: 'GET'});
                    const data = await response.json();
                    setNewsReslts(data);
                  setIsLoading(false);
                }

                else{
                  console.log('Not Fetching News');
                  
                  setIsLoading(false);
                }
              break;


            }
          }

          

          // setWebResults(data);
        } catch (error) {
          console.error("Error fetching data from API:", error);
          setSearchResults([]);
          setWebResults([]);
        }
      

      setIsLoading(false);
    },
    [searchType, BASE_URL]
  ); // Add searchType to the dependency array

  const debouncedGetSearchResults = useCallback(
    debounce(getSearchResults, 300), // Adjust the delay as needed
    [getSearchResults]
  );

  // useEffect to call getSearchResults when searchType or searchTerm changes
  useEffect(() => {
    if (searchQ) {
      debouncedGetSearchResults(searchQ);
      // navigate(`/search?query=${searchTerm}#${searchType}`)

    }
  }, [searchQ, searchType]);

  return (
    <SearchContext.Provider
      value={{
        searchQ,
        prevQ,
        searchResults,
        isLoading,
        searchTerm,
        searchType,
        webResults,
        ansResults,
        imgResults,
        videoResults,
        newsResults,
        resultsRecorded,
        setSearchTerm,
        getSearchResults,
        setSearchType,
        setWebResults,
        setImgResults,
        setNewsReslts,
        setVideoResutls,
        setResultsRecorded,
        setPrevQ,
        setSearchQ,
        setAnsResults,

        setHashAndState
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the SearchContext in other components
export const useSearchContext = () => {
  return useContext(SearchContext);
};
