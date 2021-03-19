import React, { useEffect, useState } from "react";
import logoImg from "./assets/logo.svg";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

//! Guardando a URL da API em uma const
const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    //! Passando a API como parâmetro pra executar a função de pegar dados dos filmes recentes
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    //! Pegando os dados através da API
    //! Transformando os dados em JSON
    //! Guardando os dados transformados no estado 'movies'
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (searchMovie) {
      //! Passando a API como parâmetro + o valor guardado no estado 'searchMovie', pra executar a função de pegar dados dos filmes recentes
      getMovies(SEARCH_API + searchMovie);
      //! Resetando o conteúdo do 'input'
      setSearchMovie("");
    }
  };

  const handleOnChange = (event) => {
    //! Pegando o valor inserido no 'input'
    setSearchMovie(event.target.value);
  };

  return (
    <>
      <header>
        <img src={logoImg} alt="Logo" />
        <form onSubmit={handleOnSubmit}>
          <input
            className="search-bar"
            type="text"
            placeholder="Type for search..."
            value={searchMovie}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 ? (
          movies.map((movie) => <Movie key={movie.id} {...movie} />)
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}

export default App;
