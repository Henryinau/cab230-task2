//import './PersonalPage.css'
//import React, { useState, useEffect, useRef} from "react";
//import { useParams } from "react-router-dom";
//import PaginationTable from '../../Coponents/Page';
//
//export default function PersonDetails() {
//  const [person, setPerson] = useState({});
//  const { id } = useParams();
//  const bearerToken = localStorage.getItem("token");
//  
//
//  useEffect(() => {
//    const fetchPersonData = async () => {
//      const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`,
//       {method: "GET", headers: {"Content-Type": "application/json", 
//       Authorization : "Bearer " + bearerToken}});
//      const data = await response.json();
//      setPerson(data);
//    };
//    fetchPersonData();
//  }, [id]);
//
// 
//  return (
//    
//    <div>
//      <h2>{person.name}</h2>
//      <p>BirthYear: {person.birthYear} - DeathYear: {person.deathYear}</p>
//      {
//        person.roles && (
//        <table>
//          <thead>
//            <tr>
//              <th>MovieName</th>
//              <th>MovieId</th>
//              <th>Category</th>
//              <th>Characters</th>
//              <th>ImdbRating</th>
//            </tr>
//          </thead>
//          <tbody>
//            {person.roles.map((role) => (
//            <tr>
//              <td>{role.movieName}</td>
//              <td>{role.movieId}</td>
//              <td>{role.category}</td>
//              <td>{role.characters.join(",") || "N/A"}</td>
//              <td>{role.imdbRating}</td>
//            </tr>
//            ))}
//          </tbody>
//        </table>
//      )}
//      
//    </div>
//   
//  );
//}


//import './PersonalPage.css'
//
//import React, { useState, useEffect, useRef} from "react";
//import { useParams } from "react-router-dom";
//import PaginationTable from '../../Coponents/Page';
//
//function PersonDetails() {
//  const [person, setPerson] = useState({});
//  const { id } = useParams();
//  const bearerToken = localStorage.getItem("token");
//
//  useEffect(() => {
//    const fetchPersonData = async () => {
//      const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`,
//       {method: "GET", headers: {"Content-Type": "application/json", 
//       Authorization : "Bearer " + bearerToken}});
//      const data = await response.json();
//      setPerson(data);
//    };
//    fetchPersonData();
//  }, [id]);
//
//  const columns = ["MovieName", "MovieId", "Category", "Characters", "ImdbRating"];
//  const rowsPerPage = 10;
//
//  return (
//    <div>
//      <h2>{person.name}</h2>
//      <p>BirthYear: {person.birthYear} - DeathYear: {person.deathYear}</p>
//      {person.roles && (
//        <PaginationTable data={person.roles} columns={columns} rowsPerPage={rowsPerPage} />
//      )}
//      
//    </div>
//  );
//}
//
//export default PersonDetails;


/*
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PersonDetails() {
  const [person, setPerson] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const bearerToken = localStorage.getItem("token");

  const { id } = useParams();

  useEffect(() => {
    const fetchPersonData = async () => {
      const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      });
      const data = await response.json();
      setPerson(data);
    };
    fetchPersonData();
  }, [id]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const pageCount = Math.ceil(person.roles?.length / rowsPerPage);
  const pageData = person.roles?.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  //-----------------------
  
  return (
    <div>
      <h2>{person.name}</h2>
      <p>
        BirthYear: {person.birthYear} - DeathYear: {person.deathYear}
      </p>
      {person.roles && (
        <>
          <table>
            <thead>
              <tr>
                <th>MovieName</th>
                <th>MovieId</th>
                <th>Category</th>
                <th>Characters</th>
                <th>ImdbRating</th>
              </tr>
            </thead>
            <tbody>
              {pageData?.map((role) => (
                <tr key={role.movieId}>
                  <td>{role.movieName}</td>
                  <td>{role.movieId}</td>
                  <td>{role.category}</td>
                  <td>{role.characters.join(",") || "N/A"}</td>
                  <td>{role.imdbRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handlePrevClick} disabled={currentPage === 0}>
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {pageCount}
            </span>
          <button onClick={handleNextClick} disabled={currentPage === pageCount - 1}>
                 Next
           </button>
          </div>
</>
            )}
   </div>
   );
  }

*/



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './PersonalPage.css'

export default function PersonDetails() {
  const [person, setPerson] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [scores, setScores] = useState([]);
  const bearerToken = localStorage.getItem("token");

  const { id } = useParams();

  useEffect(() => {
    const fetchPersonData = async () => {
      const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      });
      const data = await response.json();
      setPerson(data);
    };
    fetchPersonData();
  }, [id]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const pageCount = Math.ceil(person.roles?.length / rowsPerPage);
  const pageData = person.roles?.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  useEffect(() => {
    if (person.roles) {
      // Count the number of scores in different ranges
      const counts = Array(10).fill(0);
      for (const role of person.roles) {
        const score = Math.floor(role.imdbRating);
        if (score >= 0 && score <= 9) {
          counts[score]++;
        }
      }
      // Convert counts to the format expected by Recharts
      const data = counts.map((count, index) => {
        return {
          scoreRange: `${index}-${index+1}`,
          count: count,
        };
      });
      setScores(data);
    }
  }, [person]);

  //-----------------------
  
  return (
    <div className="personContainer">
      <h1 className="name-title">{person.name}</h1>
      <p className="life">
        BirthYear: {person.birthYear} - DeathYear: {person.deathYear}
      </p>
      {person.roles && (
        <div className="tableContainer">
          <table className="table-personal">
            <thead>
              <tr>
                <th>MovieName</th>
                <th>MovieId</th>
                <th>Category</th>
                <th>Characters</th>
                <th>ImdbRating</th>
              </tr>
            </thead>
            <tbody>
              {pageData?.map((role) => (
                <tr key={role.movieId}>
                  <td>{role.movieName}</td>
                  <td>{role.movieId}</td>
                  <td>{role.category}</td>
                  <td>{role.characters.join(",") || "N/A"}</td>
                  <td>{role.imdbRating}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="button-personal">
            <button onClick={handlePrevClick} disabled={currentPage === 0}>
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {pageCount}
            </span>
          <button onClick={handleNextClick} disabled={currentPage === pageCount - 1}>
                 Next
           </button>
          </div>
          
          <div className='chart'>
          <BarChart width={800} height={400} data={scores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="scoreRange" />
            <YAxis  domain={[0,25]} tickCount={6}/>
         
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          </div>
       </div>
      
            )}
            
       
          
    </div>
  );
}


