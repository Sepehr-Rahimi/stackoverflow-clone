import { useState, useEffect } from 'react';
import clsx from 'clsx'
// Helpers
import axios from 'axios';

// endpoints
import Endpoints from '../constants/APIs';


const useLimitedQuestions = (page) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isNextPage,setIsNextPage] = useState(false)

  useEffect(() => {

    const getData = async () => {
      try {
        setIsNextPage(false)
        const { data } = await axios.get(
          Endpoints.getLimitedQuestions(Number(page) + 1),
          );
        if (data.length !== 0) {
          setIsNextPage(true)
        } else {
          setIsNextPage(false)
        }

      } catch (e) {
        console.log(e)
      }
    };

    getData();

  }, [page]);
  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: questions } = await axios.get(
          Endpoints.getLimitedQuestions(page),
          // { cancelToken: axiosCancelToken.token }
        );
        setIsLoading(false);
        setData(questions);

      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      axiosCancelToken.cancel('Request Cancel');
    }
  }, [page]);


  return {
    data: {
      questions: data,
      total: data.length
    },
    isLoading,
    error,
    isNextPage
  }
};

export default useLimitedQuestions;
