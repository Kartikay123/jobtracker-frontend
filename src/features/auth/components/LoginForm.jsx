import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FormInput } from '@/shared/components/FormInput/FormInput';
import { Button } from '@/shared/components/Button/Button';
import { loginThunk, selectAuth, clearAuthError } from '../slice/authSlice';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 chars'),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector(selectAuth);

  // Clear any stale error from a previous login/signup attempt
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async (values) => {
    const result = await dispatch(loginThunk(values));
    if (loginThunk.fulfilled.match(result)) {
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    }
  };

  return (
    <div className="jt-auth-card">
      <h4>Welcome back</h4>
      <p className="jt-auth-subtitle">Sign in to continue tracking your applications.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          autoComplete="current-password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
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
          Sign in
        </Button>
      </form>
      <p className="text-center mt-4 small mb-0" style={{ color: 'var(--jt-text-muted)' }}>
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
};
