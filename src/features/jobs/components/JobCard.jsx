import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { formatRelative } from '@/lib/formatters';

export const JobCard = memo(({ job }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 10 : 'auto',
        boxShadow: isDragging ? 'var(--jt-shadow-lg)' : undefined,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="kanban-card"
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
