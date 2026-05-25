import { Suspense, lazy, useState } from 'react';
import { Button } from '@/shared/components/Button/Button';
import { JobFilters } from '../components/JobFilters';
import { Spinner } from '@/shared/components/Spinner/Spinner';

const KanbanBoard = lazy(() => import('../components/KanbanBoard'));
const JobModal = lazy(() => import('../components/JobModal'));

export default function JobsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="jt-page-header d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h3>Job Pipeline</h3>
          <p>Drag cards between columns as your applications progress.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <span className="me-1" aria-hidden="true">+</span> Add Job
        </Button>
      </div>

      <div
        className="d-flex flex-wrap align-items-center gap-3 mb-3"
        style={{
          background: 'var(--jt-surface)',
          border: '1px solid var(--jt-border)',
          borderRadius: 'var(--bs-border-radius-lg)',
          padding: '0.85rem 1rem',
          boxShadow: 'var(--jt-shadow-sm)',
        }}
      >
        <JobFilters />
      </div>

      <Suspense fallback={<Spinner />}>
        <KanbanBoard />
        {modalOpen && <JobModal onClose={() => setModalOpen(false)} />}
      </Suspense>
    </>
  );
}
