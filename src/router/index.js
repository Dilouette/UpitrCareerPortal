import { createRouter, createWebHistory } from "vue-router";
import JobListView from "../views/job/JobListing.vue";
import JobDetailView from "../views/job/DetailView.vue";
import AppliedListView from "../views/job/AppliedListView.vue";

import SignupView from "../views/auth/SignupView.vue";
import SigninView from "../views/auth/SigninView.vue";
import SuccessView from "../views/auth/SuccessView.vue";
import ConfirmationView from "../views/auth/ConfirmationView.vue";
import ResetPasswordView from "../views/auth/ResetPasswordView.vue";
import ForgotPasswordView from "../views/auth/ForgotPasswordView.vue";

import DashboardView from "../views/dashboard/DashboardView.vue";
import ProfileView from "../views/profile/ProfileView.vue";
import SettingsView from "../views/settings/SettingsView.vue";

import MessageListView from "../views/message/MessagesView.vue";

import AssessmentListView from "../views/assessment/ListView.vue";
import AssessmentTestView from "../views/assessment/AssessmentTestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },

  routes: [
    {
      path: "/",
      redirect: "jobs",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "Jobs",
          path: "",
          meta: {
            pageTitle: "Jobs",
            requiresAuth: false,
          },
          component: JobListView,
        },
        {
          name: "JobDetail",
          path: "jobs/detail/:id",
          meta: {
            pageTitle: "Job Detail",
            requiresAuth: false,
          },
          component: JobDetailView,
          props: true,
        },
      ],
    },
    {
      path: "/",
      redirect: "signin",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "Signin",
          path: "signin",
          meta: {
            pageTitle: "Signin",
            requiresAuth: false,
          },
          component: SigninView,
        },
      ],
    },
    {
      path: "/",
      redirect: "signup",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "Signup",
          path: "signup",
          meta: {
            pageTitle: "Signup",
            requiresAuth: false,
          },
          component: SignupView,
        },
      ],
    },
    {
      path: "/",
      redirect: "reset-password",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "ResetPassword",
          path: "reset-password",
          meta: {
            pageTitle: "Reset Password",
            requiresAuth: false,
          },
          component: ResetPasswordView,
          props: (route) => ({
            query: { email: route.query.email, token: route.query.token },
          }),
        },
      ],
    },
    {
      path: "/",
      redirect: "signup-successful",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "SignupSuccessful",
          path: "signup-successful",
          meta: {
            pageTitle: "Signup Successful",
            requiresAuth: false,
          },
          component: SuccessView,
        },
      ],
    },
    {
      path: "/",
      redirect: "email-confirmation",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "EmailConfirmation",
          path: "email-confirmation",
          meta: {
            pageTitle: "Email Confirmation",
            requiresAuth: false,
          },
          component: ConfirmationView,
        },
      ],
    },
    {
      path: "/",
      redirect: "forgot-password",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "ForgotPassword",
          path: "forgot-password",
          meta: {
            pageTitle: "Forgot Password",
            requiresAuth: false,
          },
          component: ForgotPasswordView,
        },
      ],
    },
    {
      path: "/",
      redirect: "dashboard",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Dashboard",
          path: "dashboard",
          meta: {
            pageTitle: "Dashboard",
            requiresAuth: true,
          },
          component: DashboardView,
        },
      ],
    },
    {
      path: "/",
      redirect: "profile",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Profile",
          path: "account/profile",
          meta: {
            pageTitle: "Profile",
            requiresAuth: true,
          },
          component: ProfileView,
        },
      ],
    },
    {
      path: "/",
      redirect: "settings",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Settings",
          path: "account/settings",
          meta: {
            pageTitle: "Settings",
            requiresAuth: true,
          },
          component: SettingsView,
        },
      ],
    },
    {
      path: "/",
      redirect: "jobs",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ProfileJobs",
          path: "account/jobs",
          meta: {
            pageTitle: "Jobs",
            requiresAuth: true,
          },
          component: JobListView,
        },
        {
          name: "ProfileJobDetails",
          path: "account/jobs/detail/:id",
          meta: {
            pageTitle: "Job Detail",
            requiresAuth: true,
          },
          component: JobDetailView,
          props: true,
        },
        {
          name: "AppliedJobs",
          path: "account/jobs/applied",
          meta: {
            pageTitle: "Applied Jobs",
            requiresAuth: true,
          },
          component: AppliedListView,
        },
      ],
    },
    {
      path: "/",
      redirect: "messages",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Messages",
          path: "account/messages",
          meta: {
            pageTitle: "Messages",
            requiresAuth: true,
          },
          component: MessageListView,
        },
      ],
    },
    {
      path: "/",
      redirect: "assessments",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Assessments",
          path: "account/assessments",
          meta: {
            pageTitle: "Assessments",
            requiresAuth: true,
          },
          component: AssessmentListView,
        },
        {
          name: "ApplicantAssessments",
          path: "account/applicant/assessments",
          meta: {
            pageTitle: "Applicant Assessment",
            requiresAuth: true,
          },
          component: AssessmentTestView,
        },
      ],
    },
  ],
});

export default router;
