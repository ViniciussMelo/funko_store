import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Funkos from './pages/funkos';
import Funko from './pages/funko';
import Login from './pages/login';
import Users from './pages/users';
import User from './pages/user';

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/funkos" element={<Funkos />} />
        <Route path="/funkos/:id" element={<Funko />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterApp;