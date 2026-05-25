import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/shared/components/Modal/Modal';
import { FormInput } from '@/shared/components/FormInput/FormInput';
import { Button } from '@/shared/components/Button/Button';
import { useUpdateJob } from '../hooks/useJobs';
import { JOB_STATUSES, JOB_STATUS_LABELS } from '@/config/constants';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  company: z.string().min(1, 'Required'),
  status: z.enum(JOB_STATUSES),
  salary: z.string().optional(),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
  notes: z.string().optional(),
});

export default function EditJobModal({ job, onClose }) {
  const update = useUpdateJob();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: job.title ?? '',
      company: job.company ?? '',
      status: job.status ?? 'applied',
      salary: job.salary ?? '',
      link: job.link ?? '',
      notes: job.notes ?? '',
    },
  });

  // Re-populate if job prop changes
  useEffect(() => {
    reset({
      title: job.title ?? '',
      company: job.company ?? '',
      status: job.status ?? 'applied',
      salary: job.salary ?? '',
      link: job.link ?? '',
      notes: job.notes ?? '',
    });
  }, [job.id, reset]);

  const onSubmit = async (values) => {
    await update.mutateAsync({ id: job.id, ...values });
    onClose();
  };

  return (
    <Modal
      show
      onClose={onClose}
      title="Edit Job"
      footer={
        <>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-job-form"
            loading={update.isPending}
            variant="primary"
          >
            Save Changes
          </Button>
        </>
      }
    >
      <form id="edit-job-form" onSubmit={handleSubmit(onSubmit)}>
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
