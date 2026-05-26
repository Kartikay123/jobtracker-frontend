import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FormInput } from '@/shared/components/FormInput/FormInput';
import { Button } from '@/shared/components/Button/Button';
import { signupThunk, selectAuth, clearAuthError } from '../slice/authSlice';

const schema = z
  .object({
    name: z.string().min(2, 'Enter your name'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Min 6 chars'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(selectAuth);

  // Clear any stale error from a previous login/signup attempt
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async ({ confirm: _c, ...values }) => {
    const result = await dispatch(signupThunk(values));
    if (signupThunk.fulfilled.match(result)) navigate('/dashboard', { replace: true });
  };

  return (
    <div className="jt-auth-card">
      <h4>Create your account</h4>
      <p className="jt-auth-subtitle">Start landing more interviews in just a minute.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          placeholder="Jane Doe"
          {...register('name')}
          error={errors.name?.message}
        />
        <FormInput
          label="Email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          {...register('password')}
          error={errors.password?.message}
        />
        <FormInput
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          {...register('confirm')}
          error={errors.confirm?.message}
        />
        {error && (
          <div
            className="small mb-3 px-3 py-2"
            style={{
              background: 'rgba(239,68,68,0.08)',
              color: '#b91c1c',
              borderRadius: 'var(--bs-border-radius)',
              border: '1px solid rgba(239,68,68,0.18)',
            }}
          >
            {error}
          </div>
        )}
        <Button type="submit" loading={status === 'loading'} className="w-100">
          Create account
        </Button>
      </form>
      <p className="text-center mt-4 small mb-0" style={{ color: 'var(--jt-text-muted)' }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};
