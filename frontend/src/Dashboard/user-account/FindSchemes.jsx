import{ useEffect, useState } from 'react';
import { BASE_URL, token } from '../../config';
import { useNavigate } from 'react-router-dom';

const FindSchemes = () => {
  const [hospitals, setHospitals] = useState([]);
  const [matchedHospitals, setMatchedHospitals] = useState([]);

  useEffect(() => {
    // Fetch hospitals and users data from backend
    const fetchHospitalsAndUsers = async () => {
      try {
        const hospitalsResponse = await fetch(`${BASE_URL}/hospitals`);
        const hospitalsData = await hospitalsResponse.json();
        
        const usersResponse = await fetch(`${BASE_URL}/users`);
        const usersData = await usersResponse.json();

        // Perform comparison and filtering
        const filteredHospitals = hospitalsData.filter(hospital => {
          return usersData.some(user =>
            hospital.state === user.state &&
            hospital.district === user.district &&
            hospital.taluka === user.taluka &&
            hospital.treatments.includes(user.disease)
          );
        });

        setHospitals(hospitalsData);
        setMatchedHospitals(filteredHospitals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHospitalsAndUsers();
  }, []);

  return (
    <div>
      <h1>Matched Hospitals</h1>
      <ul>
        {matchedHospitals.map(hospital => (
          <li key={hospital._id}>
            <p>Name: {hospital.name}</p>
            <p>Address: {hospital.address}</p>
            <p>Phone: {hospital.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindSchemes;
