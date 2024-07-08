import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Itegration from "../pages/Itegrations";
import Donations from "../pages/Donations";
import Widgets from "../pages/Widgets";
import WidgetsPreview from "../pages/PreviewWidgets";
import IntegrationStatus from "../components/Itegrations/IntegrationStatus";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PublicDefaultRoute } from "./PublicDefaultRoute";
import RequestReset from "../pages/passwoard/RequestReset";
import ResetPassword from "../pages/passwoard/ResetPassword";
import EmailVerification from "../pages/EmailVerification";
import AuthStreamlabs from "../pages/AuthStreamlabs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfUse from "../pages/TermsOfUse";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/integrations"
        element={
          <PrivateRoute>
            <Itegration />
          </PrivateRoute>
        }
      />
      <Route
        path="/integrations/callback"
        element={
          <PrivateRoute>
            <IntegrationStatus />
          </PrivateRoute>
        }
      />
      <Route
        path="/widgets"
        element={
          <PrivateRoute>
            <Widgets />
          </PrivateRoute>
        }
      />
      <Route
        path="/password/reset/request"
        element={
          <PublicRoute>
            <RequestReset />
          </PublicRoute>
        }
      />
      <Route
        path="/password/reset/:token"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/donations/user/:slug"
        element={
          <PublicDefaultRoute>
            <Donations />
          </PublicDefaultRoute>
        }
      />
      <Route
        path="/embed/:widgetId"
        element={
          <PublicDefaultRoute>
            <WidgetsPreview />
          </PublicDefaultRoute>
        }
      />
      <Route
        path="/email/verify/:id/:hash"
        element={
          <PublicDefaultRoute>
            <EmailVerification />
          </PublicDefaultRoute>
        }
      />

      <Route
        path="/auth/streamlabs"
        element={
          <PublicDefaultRoute>
            <AuthStreamlabs />
          </PublicDefaultRoute>
        }
      />
      <Route
        path="/institucional/politica-de-privacidade"
        element={
          <PublicDefaultRoute>
            <PrivacyPolicy />
          </PublicDefaultRoute>
        }
      />
      <Route
        path="/institucional/termos-de-uso"
        element={
          <PublicDefaultRoute>
            <TermsOfUse />
          </PublicDefaultRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
