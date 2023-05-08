import './PersonalPage.css'

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PersonDetails() {
  const [person, setPerson] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchPersonData = async () => {
      const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`);
      const data = await response.json();
      setPerson(data);
    };
    fetchPersonData();
  }, [id]);

  return (
    <div>
      <h2>{person.name}</h2>
      <p>BirthYear: {person.birthYear}</p>
      <p>DeathYear: {person.deathYear}</p>
      {/* Display other person details... */}
    </div>
  );
}

export default PersonDetails;