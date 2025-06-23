import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './pages/Header'
import TopPage from './pages/TopPage'
import Contact from './pages/Contact'
import PostDetail from './pages/PostDetail'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
