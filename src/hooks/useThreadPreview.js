import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads } from '../state/thread/threadThunks';
import { fetchAllUsers } from '../state/user/userThunks';

import {
  selectAllThreads,
  selectThreadsStatus,
} from '../state/thread/threadSelectors';
import { selectAllUsers } from '../state/user/userSelectors';

const useThreadPreview = () => {
  const dispatch = useDispatch();

  const threads = useSelector(selectAllThreads);
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectThreadsStatus);

  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchThreads());
  }, [dispatch]);

  const threadsWithUserData = useMemo(() => threads.map((thread) => {
    const user = users.find((u) => u.id === thread.ownerId);
    return {
      ...thread,
      owner: {
        id: user?.id || 'Unknown',
        name: user?.name || 'Unknown',
        avatar: user?.avatar || '',
      },
    };
  }), [threads, users]);

  const categoryOptions = useMemo(() => {
    const uniqueCategories = [...new Set(threads.map((t) => t.category))];
    return uniqueCategories.map((cat) => ({ value: cat, label: cat }));
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!filterCategory) return threadsWithUserData;
    return threadsWithUserData.filter((t) => t.category === filterCategory);
  }, [threadsWithUserData, filterCategory]);

  return {
    filteredThreads,
    status,
    categoryOptions,
    filterCategory,
    setFilterCategory,
  };
};

export default useThreadPreview;
