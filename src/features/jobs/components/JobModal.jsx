import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/shared/components/Modal/Modal';
import { FormInput } from '@/shared/components/FormInput/FormInput';
import { Button } from '@/shared/components/Button/Button';
import { useCreateJob } from '../hooks/useJobs';
import { JOB_STATUSES, JOB_STATUS_LABELS } from '@/config/constants';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  company: z.string().min(1, 'Required'),
  status: z.enum(JOB_STATUSES),
  salary: z.string().optional(),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
  notes: z.string().optional(),
});

export default function JobModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: 'applied' },
  });
  const create = useCreateJob();

  const onSubmit = async (values) => {
    await create.mutateAsync({ ...values, appliedAt: new Date().toISOString() });
    onClose();
  };

  return (
    <Modal
      show
      onClose={onClose}
      title="Add Job"
      footer={
        <>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="job-form"
            loading={create.isPending}
            variant="primary"
          >
            Save
          </Button>
        </>
      }
    >
      <form id="job-form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Title" {...register('title')} error={errors.title?.message} />
        <FormInput
          label="Company"
          {...register('company')}
          error={errors.company?.message}
        />
        <FormInput
          label="Status"
          as="select"
          {...register('status')}
          error={errors.status?.message}
        >
          {JOB_STATUSES.map((s) => (
            <option key={s} value={s}>
              {JOB_STATUS_LABELS[s]}
            </option>
          ))}
        </FormInput>
        <FormInput label="Salary (optional)" {...register('salary')} />
        <FormInput
          label="Link (optional)"
          {...register('link')}
          error={errors.link?.message}
        />
        <FormInput
          label="Notes"
          as="textarea"
          rows={3}
          {...register('notes')}
        />
      </form>
    </Modal>
  );
}
