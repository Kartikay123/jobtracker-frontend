import { Card } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export const ResponseRateChart = ({ data = [] }) => (
  <Card>
    <Card.Header>Funnel</Card.Header>
    <Card.Body style={{ height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fill: 'var(--jt-text-muted)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="stage"
            type="category"
            tick={{ fill: 'var(--jt-text)', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={88}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid var(--jt-border)',
              background: 'var(--jt-surface)',
              boxShadow: 'var(--jt-shadow)',
            }}
            cursor={{ fill: 'rgba(99,102,241,0.08)' }}
          />
          <Bar dataKey="count" radius={[6, 6, 6, 6]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card.Body>
  </Card>
);
