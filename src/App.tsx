import { Route, Routes } from 'react-router-dom'

import HeaderNavbar from './components/Navbar'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import BooksListPage from './pages/books/List'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div>
      <HeaderNavbar />
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books" element={<BooksListPage />} />
      </Routes>
    </div>
  )
}

export default App
