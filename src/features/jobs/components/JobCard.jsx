import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { formatRelative } from '@/lib/formatters';

export const JobCard = memo(({ job, isOverlay }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: job.id,
    // Disable draggable when rendered inside DragOverlay (isOverlay=true)
    disabled: isOverlay,
  });

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      className="kanban-card"
      style={isOverlay ? { cursor: 'grabbing' } : undefined}
    >
      <div className="title">{job.title}</div>
      <div className="company">{job.company}</div>
      {job.salary && <span className="salary-pill">{job.salary}</span>}
      {job.appliedAt && (
        <div className="meta">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Applied {formatRelative(job.appliedAt)}
        </div>
      )}
    </div>
  );
});

JobCard.displayName = 'JobCard';
