import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useAnalytics } from '../hooks/useAnalytics';
import { StatCard } from '../components/StatCard';
import { ApplicationsChart } from '../components/ApplicationsChart';
import { ResponseRateChart } from '../components/ResponseRateChart';
import { Spinner } from '@/shared/components/Spinner/Spinner';
import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { ANALYTICS_RANGES } from '@/config/constants';

export default function AnalyticsPage() {
  const [range, setRange] = useState('30d');
  const { data, isLoading, isError } = useAnalytics(range);

  return (
    <>
      <div className="jt-page-header d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h3>Analytics</h3>
          <p>A snapshot of your application performance over time.</p>
        </div>
        <Form.Select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{ maxWidth: 200 }}
          aria-label="Date range"
        >
          {ANALYTICS_RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </Form.Select>
      </div>

      {isLoading && <Spinner />}
      {isError && (
        <EmptyState title="Couldn't load analytics" description="Please try again." />
      )}
      {data && (
        <>
          <Row className="g-3 mb-4">
            <Col md={4}>
              <StatCard
                label="Applications"
                value={data.totalApplications ?? 0}
                delta={data.applicationsDelta}
              />
            </Col>
            <Col md={4}>
              <StatCard
                label="Response Rate"
                value={`${data.responseRate ?? 0}%`}
                delta={data.responseDelta}
              />
            </Col>
            <Col md={4}>
              <StatCard
                label="Interview Rate"
                value={`${data.interviewRate ?? 0}%`}
                delta={data.interviewDelta}
              />
            </Col>
          </Row>
          <Row className="g-3">
            <Col lg={8}>
              <ApplicationsChart data={data.weekly} />
            </Col>
            <Col lg={4}>
              <ResponseRateChart data={data.funnel} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
