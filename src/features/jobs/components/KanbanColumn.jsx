import { useDroppable } from '@dnd-kit/core';
import { JobCard } from './JobCard';

export const KanbanColumn = ({ column, jobs }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  });

  return (
    <div className={`kanban-col ${isOver ? 'over' : ''}`}>
      <div className="kanban-col-header">
        <span className="kanban-col-title">
          <span className="kanban-col-dot" style={{ background: column.color }} />
          {column.title}
        </span>
        <span
          className="badge"
          style={{
            background: 'var(--jt-surface-3)',
            color: 'var(--jt-text)',
            fontWeight: 700,
          }}
        >
          {jobs.length}
        </span>
      </div>
      <div ref={setNodeRef} className="kanban-col-body">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && <div className="kanban-empty">Drop a card here</div>}
      </div>
    </div>
  );
};
