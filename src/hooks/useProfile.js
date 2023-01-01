import { useState, useEffect } from 'react';

// Helpers
import axios from 'axios';

// endpoints
import Endpoints from '../constants/APIs';


const useProfile = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const {data:profile} = await axios.get(
          Endpoints.getProfile(),
        );
        setIsLoading(false);
        setData(...profile);

      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    getData();

  }, []);
  return [
    data,
    isLoading,
    error
  ]
};

export default useProfile;
