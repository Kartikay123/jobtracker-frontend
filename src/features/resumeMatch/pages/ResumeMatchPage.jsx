import { useState } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { Button } from '@/shared/components/Button/Button';
import { ResumeUploader } from '../components/ResumeUploader';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { MatchScoreCard } from '../components/MatchScoreCard';
import { useMatchResume } from '../hooks/useMatchResume';

export default function ResumeMatchPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const matchMutation = useMatchResume();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription.trim()) return;
    matchMutation.mutate({ resumeFile, jobDescription });
  };

  return (
    <>
      <div className="jt-page-header">
        <h3>Resume Match</h3>
        <p>Upload your resume and a job description to see how well you align.</p>
      </div>
      <Row className="g-3">
        <Col lg={7}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <ResumeUploader value={resumeFile} onChange={setResumeFile} />
                <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
                <Button
                  type="submit"
                  loading={matchMutation.isPending}
                  disabled={!resumeFile || !jobDescription.trim()}
                  className="w-100"
                >
                  Analyze Match
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <MatchScoreCard
            result={matchMutation.data}
            isPending={matchMutation.isPending}
          />
        </Col>
      </Row>
    </>
  );
}
