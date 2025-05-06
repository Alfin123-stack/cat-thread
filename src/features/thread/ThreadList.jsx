import React from 'react';
import ThreadListItem from './ThreadListItem';

function ThreadList({
  threads,
}) {
  return (
    <div className="space-y-6 w-full sm:w-[70%] mx-auto">
      {threads.map((thread) => (
        <ThreadListItem
          key={thread.id}
          thread={thread}
        />
      ))}
    </div>
  );
}

export default ThreadList;
