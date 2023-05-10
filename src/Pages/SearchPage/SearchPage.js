
 
//import React, { useState, useEffect } from "react";
//
//function MovieSearch() {
//const [movies, setMovies] = useState([]);
//const [searchTerm, setSearchTerm] = useState("");
//const [selectedYear, setSelectedYear] = useState("");
//const [years, setYears] = useState([]);
//
//const [currentPage, setCurrentPage] = useState(0);
//const [rowsPerPage, setRowsPerPage] = useState(5);
//
//useEffect(() => {
//const fetchData = async () => {
//try {
//const response = await fetch("http://sefdb02.qut.edu.au:3000/movies/search");
//if (!response.ok) {
//throw new Error("Network response was not ok");
//}
//const data = await response.json();
//setMovies(data.data);
//const years = Array.from({ length: 34 }, (_, index) => 1990 + index);
//setYears(years);
//} catch (error) {
//console.error("There was a problem fetching the data: ", error);
//}
//};
//fetchData();
//}, []);
//
//if (movies.length === 0 || years.length === 0) {
//return <div>Loading...</div>;
//}
//
//const filteredMovies = movies.filter((movie) => {
//return (
//movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//(selectedYear === "" || parseInt(movie.year) === parseInt(selectedYear))
//);
//});
//
//
//return (
//<div>
//<h2>Movie List</h2>
//<div>
//<label>
//Search movies:
//<input
//type="text"
//placeholder="Enter title..."
//value={searchTerm}
//onChange={(e) => setSearchTerm(e.target.value)}
///>
//</label>
//<label>
//Filter by year:
//<select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//<option value="">All</option>
//{years.map((year) => (
//<option key={year} value={year}>
//{year}
//</option>
//))}
//</select>
//</label>
//</div>
//<table>
//  <thead>
//    <tr>
//    <th>Title</th>
//    <th>Year</th>
//    <th>IMDB Rating</th>
//    <th>Rotten Tomatoes Rating</th>
//    <th>Metacritic Rating</th>
//    <th>Classification</th>
//    </tr>
//  </thead>
//    <tbody>
//    {filteredMovies.map((movie) => (
//    <tr key={movie.imdbID}>
//      <td>{movie.title}</td>
//      <td>{movie.year}</td>
//      <td>{movie.imdbRating}</td>
//      <td>{movie.rottenTomatoesRating}</td>
//      <td>{movie.metacriticRating}</td>
//      <td>{movie.classification}</td>
//    </tr>
//    ))}
//    </tbody>
//</table> </div> ); }
//export default MovieSearch;




import './SearchPage.css'
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function MovieSearch() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [years, setYears] = useState([]);
    const [loadedMovies, setLoadedMovies] = useState(20); // 初始显示20条电影数据
    const [isLoading, setIsLoading] = useState(false);   // 标记是否正在加载数据中
    const [allMoviesLoaded, setAllMoviesLoaded] = useState(false); // 标记是否已经全部加载完成
    const containerRef = useRef(null); // 用来获取滚动容器的引用
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/search?limit=${loadedMovies}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setMovies(data.data);
          const years = Array.from({ length: 34 }, (_, index) => 1990 + index);
          setYears(years);
          setIsLoading(false);
          if (data.data.length < 20) {
            setAllMoviesLoaded(true);
          } else if (movies.length === loadedMovies) {
            setTimeout(() => {
              setAllMoviesLoaded(true);
            }, 1000)
          }
        } catch (error) {
          console.error("There was a problem fetching the data: ", error);
        }
      };
      fetchData();
    }, [loadedMovies, movies.length]);
  
    useEffect(() => {
      const container = containerRef.current;
      const handleScroll = () => {
        const { scrollTop, offsetHeight, scrollHeight } = container;
        if (scrollTop + offsetHeight >= scrollHeight - offsetHeight) {
          if (!isLoading && !allMoviesLoaded) {
            setLoadedMovies((prevLoadedMovies) => prevLoadedMovies + 20);
          }
        }
      };
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }, [isLoading, allMoviesLoaded]);
  
    const filteredMovies = movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedYear === "" || parseInt(movie.year) === parseInt(selectedYear))
      );
    });
  
    const allMoviesLoadedMsg = allMoviesLoaded ? "All movies loaded." : "Loading more movies...";

    return (
    <div ref={containerRef} className="SearchContainer">
    <h1 className='search-title'>Movie List</h1>
    <div>
    <label>
    Search movies:
    <input
    type="text"
    placeholder="Enter title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    />
    </label>
    <label>
    Filter by year:
    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
    <option value="">All</option>
    {years.map((year) => (
    <option key={year} value={year}>{year}</option>
    ))}
    </select>
    </label>
    </div>

    <table className='table-search'>
      <thead>
        <tr>
            <th>Title</th>
            <th>Year</th>
            
            <th>IMDB Rating</th>
            <th>Rotten Tomatoes Rating</th>
            <th>Metacritic Rating</th>
            <th>Classification</th>
        </tr>
      </thead>

       <tbody>
       {filteredMovies.map((movie) => (
       <tr key={movie.imdbID}>
       <td><Link to={`/movies/details/${movie.imdbID}`}>{movie.title}</Link></td>
       <td>{movie.year}</td>
      
       <td>{movie.imdbRating}</td>
       <td>{movie.rottenTomatoesRating}</td>
       <td>{movie.metacriticRating}</td>
       <td>{movie.classification}</td>
       </tr>
       ))}
       </tbody>
    </table>
    {allMoviesLoadedMsg} 
    </div>
    );
} 



/*
import './SearchPage.css'
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


export default function MovieSearch() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [years, setYears] = useState([]);
    const [loadedMovies, setLoadedMovies] = useState(20); // 初始显示20条电影数据
    const [isLoading, setIsLoading] = useState(false);   // 标记是否正在加载数据中
    const [allMoviesLoaded, setAllMoviesLoaded] = useState(false); // 标记是否已经全部加载完成
    const containerRef = useRef(null); // 用来获取滚动容器的引用
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/search?limit=${loadedMovies}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setMovies(data.data);
          const years = Array.from({ length: 34 }, (_, index) => 1990 + index);
          setYears(years);
          setIsLoading(false);
          if (data.data.length < 20) {
            setAllMoviesLoaded(true);
          } else if (movies.length === loadedMovies) {
            setTimeout(() => {
              setAllMoviesLoaded(true);
            }, 1000)
          }
        } catch (error) {
          console.error("There was a problem fetching the data: ", error);
        }
      };
      fetchData();
    }, [loadedMovies, movies.length]);
  
    useEffect(() => {
      const container = containerRef.current;
      const handleScroll = () => {
        const { scrollTop, offsetHeight, scrollHeight } = container;
        if (scrollTop + offsetHeight >= scrollHeight - offsetHeight) {
          if (!isLoading && !allMoviesLoaded) {
            setLoadedMovies((prevLoadedMovies) => prevLoadedMovies + 20);
          }
        }
      };
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }, [isLoading, allMoviesLoaded]);
  
    const filteredMovies = movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedYear === "" || parseInt(movie.year) === parseInt(selectedYear))
      );
    });
  
    const allMoviesLoadedMsg = allMoviesLoaded ? "All movies loaded." : "Loading more movies...";


    function onGridReady(params) {
      const gridApi = params.api;
      gridApi.sizeColumnsToFit();
    }
    const columnDefs = [
      { field: 'title', headerName: 'Title', sortable: true, filter: true },
      { field: 'year', headerName: 'Year', sortable: true, filter: true },
      { field: 'imdbRating', headerName: 'IMDB Rating', sortable: true, filter: true },
      { field: 'rottenTomatoesRating', headerName: 'Rotten Tomatoes Rating', sortable: true, filter: true },
      { field: 'metacriticRating', headerName: 'Metacritic Rating', sortable: true, filter: true },
      { field: 'classification', headerName: 'Classification', sortable: true, filter: true }
    ];
    
    const rowData = filteredMovies.map((movie) => ({
      title: <Link to={`/movies/details/${movie.imdbID}`}>{movie.title}</Link>,
      year: movie.year,
      imdbRating: movie.imdbRating,
      rottenTomatoesRating: movie.rottenTomatoesRating,
      metacriticRating: movie.metacriticRating,
      classification: movie.classification}));

    return (
  <div ref={containerRef}>
    <h1 className='search-title'>Movie List</h1>
    <div>
      <label>
        Search movies:
        <input
          type="text"
          placeholder="Enter title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <label>
        Filter by year:
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </label>
    </div>

    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={20}
        onGridReady={onGridReady}
      />
    </div>

    {allMoviesLoadedMsg}
  </div>
);

} 
*/
