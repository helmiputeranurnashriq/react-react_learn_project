import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL ='http://www.omdbapi.com/?i=tt3896198&apikey=99c64ac1';

const App = () => {

    const [movies, setMovies] = useState([]); //default search movie title
    const [searchTerm, setSearchTerm] = useState(''); //default input search as null
    

    // Below is the code that will refresh movie card while typing/searching the movie title in the input. 
    // IF searchTerm (input) is not equal to null, THEN searchTerm (dynamic) movie title through API.
    // ELSE search Batman as state value (default value) -> without these statement, browser will return no movies found


    // useEffect(() => {
    //     // Check if searchTerm is not empty before making the API call
    //     searchTerm.trim() !== '' ? (
    //       searchMovies(searchTerm)) :
    //       ((searchMovies('Batman')));
    //     }
    //   , [searchTerm]);


    useEffect(() => {
        searchMovies("Batman");
      }, []);
      
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);    
        const data = await response.json();

        setMovies(data.Search);
    };


    return (
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}

      </div>
    );
}

export default App