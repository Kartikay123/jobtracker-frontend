import { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { Row, Col } from 'react-bootstrap';
import { useJobs, useUpdateJobStatus } from '../hooks/useJobs';
import { KanbanColumn } from './KanbanColumn';
import { JobCard } from './JobCard';
import { Spinner } from '@/shared/components/Spinner/Spinner';
import { EmptyState } from '@/shared/components/EmptyState/EmptyState';

const COLUMNS = [
  { id: 'applied', title: 'Applied', color: '#6366f1' },
  { id: 'interview', title: 'Interview', color: '#f59e0b' },
  { id: 'offer', title: 'Offer', color: '#10b981' },
  { id: 'rejected', title: 'Rejected', color: '#ef4444' },
];

export default function KanbanBoard() {
  const { data: jobs = [], isLoading, isError } = useJobs();
  const updateStatus = useUpdateJobStatus();
  const [activeJob, setActiveJob] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const grouped = useMemo(() => {
    const map = Object.fromEntries(COLUMNS.map((c) => [c.id, []]));
    jobs.forEach((j) => {
      (map[j.status] ||= []).push(j);
    });
    return map;
  }, [jobs]);

  const handleDragStart = ({ active }) => {
    setActiveJob(jobs.find((j) => j.id === active.id) ?? null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveJob(null);
    if (!over) return;
    const job = jobs.find((j) => j.id === active.id);
    const newStatus = over.data.current?.columnId || over.id;
    if (job && job.status !== newStatus) {
      updateStatus.mutate({ id: job.id, status: newStatus });
    }
  };

  const handleDragCancel = () => setActiveJob(null);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <EmptyState
        title="Couldn't load jobs"
        description="Check your API connection and try again."
      />
    );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Row className="g-3">
        {COLUMNS.map((col) => (
          <Col key={col.id} md={6} lg={3}>
            <KanbanColumn column={col} jobs={grouped[col.id]} activeId={activeJob?.id} />
          </Col>
        ))}
      </Row>

      {/* Renders outside all columns — never clipped by overflow:hidden */}
      <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
        {activeJob ? (
          <div style={{ transform: 'scale(1.04)', boxShadow: '0 20px 40px -8px rgba(0,0,0,0.28)', borderRadius: 8, cursor: 'grabbing' }}>
            <JobCard job={activeJob} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
