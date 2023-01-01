import { useState, useEffect, useRef, useReducer } from 'react';

// Helpers
import axios from 'axios';

// endpoints
import Endpoints from '../../../constants/APIs';

import reducer from './reducer';
import initialState from './store';
import * as actions from './actions'


const useQuestion = (id) => {
  const hasAlreadyVoted = useRef(false);
  const [state,dispatch] = useReducer(reducer,initialState)
  const {data,isLoading,error,votes} = state

  const handleUpvote = async () => {
    try {
      await axios.patch(Endpoints.getQuestionById(data.id), { rate: { up: data.rate.up + 1, down: data.rate.down, total: data.rate.total + 1 } });
      if (!hasAlreadyVoted.current) dispatch(actions.upVote());
      else alert('You already voted');
    } catch (e) {

    }
  }

  const handleDownvote = async () => {
    try {
      await axios.patch(Endpoints.getQuestionById(data.id), { rate: { up: data.rate.up, down: data.rate.down + 1, total: data.rate.total + 1 } });
      if (!hasAlreadyVoted.current) dispatch(actions.downVote());
      else alert('You already voted');
    } catch (e) {
      
    }
  }

  useEffect(() => {
    const trackView = async () => {
      try {
        await axios.patch(Endpoints.getQuestionById(data.id), { views: data.views + 1 });
      } catch (e) {
        
      }
    }

    trackView();
  }, [data?.id]);

  useEffect(() => {
    if (votes !== data?.rate?.up - data?.rate?.down) hasAlreadyVoted.current = true;
  }, [votes, data?.rate]);

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        dispatch(actions.getDataAction())
        const { data: questionDetails } = await axios.get(
          Endpoints.getQuestionById(id),
          // { cancelToken: axiosCancelToken.token }
        );
        dispatch(actions.getDataSuccssesAction(questionDetails))
        hasAlreadyVoted.current = false;

      } catch (e) {
        dispatch(actions.getDataFailAction())
      }
    };

    if (id) getData();

    return () => {
      axiosCancelToken.cancel('Request Cancel');
    }
  }, [id]);

  return {
    data,
    isLoading,
    error,
    votes,
    handleUpvote,
    handleDownvote
  }
};

export default useQuestion;
