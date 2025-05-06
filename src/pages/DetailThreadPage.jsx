import React from 'react';
import ThreadDetail from '../features/thread/ThreadDetail';
import PageLayout from '../components/PageLayout';

function DetailThreadPage() {
  return (
    <PageLayout title="Thread Detail">
      <ThreadDetail />
    </PageLayout>
  );
}

export default DetailThreadPage;
