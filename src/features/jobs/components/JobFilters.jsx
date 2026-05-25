import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import { setFilter, selectJobFilters } from '../slice/jobsSlice';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const JobFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectJobFilters);
  const [search, setSearch] = useState(filters.search);
  const debounced = useDebounce(search, 300);

  useEffect(() => {
    dispatch(setFilter({ search: debounced }));
  }, [debounced, dispatch]);

  return (
    <InputGroup style={{ maxWidth: 380 }}>
      <InputGroup.Text
        style={{
          background: 'transparent',
          border: '1px solid var(--jt-border)',
          borderRight: 'none',
          color: 'var(--jt-text-muted)',
          borderTopLeftRadius: 'var(--bs-border-radius)',
          borderBottomLeftRadius: 'var(--bs-border-radius)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </InputGroup.Text>
      <Form.Control
        placeholder="Search jobs by title or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ borderLeft: 'none' }}
      />
    </InputGroup>
  );
};
