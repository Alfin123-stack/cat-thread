import PageLayout from '../components/PageLayout';
import ThreadForm from '../features/thread/ThreadForm';

function AddThreadPage() {
  return (
    <PageLayout title="Create New Thread">
      <ThreadForm />
    </PageLayout>
  );
}

export default AddThreadPage;
