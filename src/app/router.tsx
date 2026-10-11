import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'

/**
 * Route-level code splitting: every page is its own chunk, the shell and
 * navigation load eagerly.
 */
const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const Projects = lazy(() => import('../pages/Projects/Projects'))
const ProjectDetails = lazy(() => import('../pages/ProjectDetails/ProjectDetails'))
const Resume = lazy(() => import('../pages/Resume/Resume'))
const Notes = lazy(() => import('../pages/Notes/Notes'))
const NoteDetails = lazy(() => import('../pages/NoteDetails/NoteDetails'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetails />} />
        <Route path="resume" element={<Resume />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:slug" element={<NoteDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
