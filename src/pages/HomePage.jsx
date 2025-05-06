import PageLayout from '../components/PageLayout';
import ThreadPreview from '../features/thread/ThreadPreview';

function HomePage() {
  return (
    <PageLayout title="Explore All Threads">
      <ThreadPreview />
    </PageLayout>
  );
}

export default HomePage;
