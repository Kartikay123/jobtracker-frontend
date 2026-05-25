import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Spinner } from '@/shared/components/Spinner/Spinner';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const JobsPage = lazy(() => import('@/features/jobs/pages/JobsPage'));
const AnalyticsPage = lazy(() => import('@/features/analytics/pages/AnalyticsPage'));
const InterviewPrepPage = lazy(() => import('@/features/interviewPrep/pages/InterviewPrepPage'));
const ResumeMatchPage = lazy(() => import('@/features/resumeMatch/pages/ResumeMatchPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));
const CoverLetterPage = lazy(() => import('@/features/coverLetter/pages/CoverLetterPage'));
const NotFoundPage = lazy(() => import('@/shared/components/NotFound/NotFound'));

export const AppRoutes = () => (
  <Suspense fallback={<Spinner fullscreen />}>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/interview" element={<InterviewPrepPage />} />
          <Route path="/resume" element={<ResumeMatchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cover-letter" element={<CoverLetterPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
