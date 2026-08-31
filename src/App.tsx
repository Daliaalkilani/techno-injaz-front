import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { AuthProvider } from "./lib/auth";
import Home from "./pages/Home";

// Route-level code splitting for heavier pages
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetails = lazy(() => import("./pages/ArticleDetails"));
const Videos = lazy(() => import("./pages/Videos"));
const Category = lazy(() => import("./pages/Category"));
const Search = lazy(() => import("./pages/Search"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Contributors = lazy(() => import("./pages/Contributors"));
const AnnualReport = lazy(() => import("./pages/AnnualReport"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-label="جارٍ التحميل"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}

function lazyRoute(node: React.ReactNode) {
  return <Suspense fallback={<PageFallback />}>{node}</Suspense>;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={lazyRoute(<Projects />)} />
            <Route
              path="projects/:id"
              element={lazyRoute(<ProjectDetails />)}
            />
            <Route path="articles" element={lazyRoute(<Articles />)} />
            <Route
              path="articles/:slug"
              element={lazyRoute(<ArticleDetails />)}
            />
            <Route path="videos" element={lazyRoute(<Videos />)} />
            <Route path="category/:slug" element={lazyRoute(<Category />)} />
            <Route path="search" element={lazyRoute(<Search />)} />
            <Route path="about" element={lazyRoute(<About />)} />
            <Route path="contact" element={lazyRoute(<Contact />)} />
            <Route path="register" element={lazyRoute(<Register />)} />
            <Route path="login" element={lazyRoute(<Login />)} />
            <Route path="profile/:id" element={lazyRoute(<Profile />)} />
            <Route path="contributors" element={lazyRoute(<Contributors />)} />
            <Route path="annual-report" element={lazyRoute(<AnnualReport />)} />
            <Route path="*" element={lazyRoute(<NotFound />)} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
