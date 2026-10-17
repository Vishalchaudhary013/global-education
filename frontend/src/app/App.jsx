import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "@/shared/components/ScrollToTop";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";

import { Home } from "@/features/home";
import { Destinations, DestinationDetail } from "@/features/destinations";
import { Universities, UniversityDetail } from "@/features/universities";
import { Courses, CourseDetail } from "@/features/courses";
import { Scholarships, ScholarshipDetail } from "@/features/scholarships";
import { Exams, ExamDetail } from "@/features/exams";
import { Events, EventDetail } from "@/features/events";
import { Services } from "@/features/services";
import { Articles, ArticleDetail } from "@/features/articles";
import { AdminLogin, AdminSignup, ProtectedRoute } from "@/features/auth";
import { AdminDashboard } from "@/features/admin";
import { BookCounsellingModal } from "@/features/counselling";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";
  const hideChrome = isAdminRoute || isAuthRoute;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/destinations/university/:id" element={<UniversityDetail />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:id" element={<UniversityDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetail />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/exams/:id" element={<ExamDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/signup" element={<AdminSignup />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin", "superadmin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
      {!hideChrome && <BookCounsellingModal />}
    </div>
  );
}

export default App;
