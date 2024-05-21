import React from 'react';
import 'styles/App.css';
import MainPage from 'pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import NotFoundPage from 'pages/NotFoundPage';
import EmployerPage from 'pages/EmployerPage';
import AddNewEmployerPage from 'pages/AddNewEmployerPage';
import RequiredAuth from 'hoc/RequiredAuth';
import EditEmployerPage from 'pages/EditEmployerPage';

const App: React.FC = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='employer/:id' element={<EmployerPage />} />
            <Route path='employer/:id/edit' element={
                <RequiredAuth>
                  <EditEmployerPage />
                </RequiredAuth>
            } />
            <Route path='employer/new' element={
              <RequiredAuth>
                <AddNewEmployerPage />
              </RequiredAuth>
            } />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
