import ThreadList from './ThreadList';
import Filter from '../../components/Filter';
import Spinner from '../../components/Spinner';
import ErrorPage from '../../pages/ErrorPage';
import useThreadPreview from '../../hooks/useThreadPreview';

function ThreadPreview() {
  const {
    filteredThreads,
    status,
    categoryOptions,
    filterCategory,
    setFilterCategory,
  } = useThreadPreview();

  if (status === 'loading') return <Spinner />;
  if (status === 'failed') return <ErrorPage />;

  return (
    <>
      <Filter
        filterField="category"
        options={[{ value: '', label: 'All Categories' }, ...categoryOptions]}
        selected={filterCategory}
        onFilterChange={setFilterCategory}
      />

      <ThreadList threads={filteredThreads} />
    </>
  );
}

export default ThreadPreview;
