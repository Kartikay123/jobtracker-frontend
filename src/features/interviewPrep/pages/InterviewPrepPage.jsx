import { useState } from 'react';
import { QuestionGenerator } from '../components/QuestionGenerator';
import { AnswerEditor } from '../components/AnswerEditor';
import { useGenerateQuestions, useSaveAnswer } from '../hooks/useInterview';
import { EmptyState } from '@/shared/components/EmptyState/EmptyState';

export default function InterviewPrepPage() {
  const [role, setRole] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const generate = useGenerateQuestions();
  const save = useSaveAnswer();

  const handleGenerate = async () => {
    const data = await generate.mutateAsync({ role });
    setQuestions(data.questions || []);
    setAnswers({});
  };

  return (
    <>
      <div className="jt-page-header">
        <h3>Interview Prep</h3>
        <p>Generate role-specific questions and rehearse your answers.</p>
      </div>

      <QuestionGenerator
        role={role}
        onRoleChange={setRole}
        onGenerate={handleGenerate}
        isPending={generate.isPending}
      />

      {generate.isPending && (
        <div
          className="d-flex align-items-center gap-2 mb-3 px-3 py-2"
          style={{
            background: 'var(--jt-primary-soft)',
            color: 'var(--jt-primary-strong)',
            borderRadius: 'var(--bs-border-radius)',
            fontSize: '0.88rem',
            fontWeight: 500,
          }}
        >
          <div className="spinner-border spinner-border-sm" />
          Generating tailored questions… (may take ~20s)
        </div>
      )}

      {!generate.isPending && questions.length === 0 && (
        <EmptyState
          title="No questions yet"
          description="Enter a role above and click Generate to get started."
        />
      )}

      {questions.map((q, i) => (
        <AnswerEditor
          key={q.id}
          index={i + 1}
          question={q}
          value={answers[q.id]}
          onChange={(text) => setAnswers((s) => ({ ...s, [q.id]: text }))}
          onSave={() => save.mutate({ questionId: q.id, text: answers[q.id] })}
          isSaving={save.isPending && save.variables?.questionId === q.id}
        />
      ))}
    </>
  );
}
