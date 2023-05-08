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



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PersonDetails() {
  const [person, setPerson] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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



