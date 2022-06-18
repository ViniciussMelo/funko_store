import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/login';

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterApp;