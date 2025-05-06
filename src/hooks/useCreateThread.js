import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewThread } from '../state/thread/threadThunks';
import {
  selectThreadsStatus,
  selectThreadsError,
} from '../state/thread/threadSelectors';

function useCreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsError = useSelector(selectThreadsError);

  const isLoading = threadsStatus === 'loading';

  const submitThread = ({ title, body, category }) => {
    if (!title || !body || !category) {
      setError('All fields are required!');
      return;
    }

    setError('');
    dispatch(createNewThread({ title, body, category }));
    navigate('/');
  };

  return {
    submitThread,
    isLoading,
    error,
    setError,
    threadsError,
  };
}

export default useCreateThread;
