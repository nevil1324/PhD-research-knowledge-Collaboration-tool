// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import Layout from './components/header/Layout';
import BookMarks from './components/bookmark/Bookmarks';

function App() {
  return (<div className='app'>
    <Router>
      <div className='flex-item'>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path='/bookmarks' element={<ProtectedRoute> <BookMarks /> </ProtectedRoute>} />
            <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
          </Route>     
          </Routes>
      </div>
    </Router>
  </div>
  );
}

export default App;
