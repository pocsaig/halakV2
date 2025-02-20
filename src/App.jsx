import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HalakListaja from './HalakGET';
import UjHal from './halakPOST';
import HalSzerkesztes from './HalakPUT';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Halak</h1>
        </header>

        <nav className="navbar">
          <ul>
            <li>
              <Link to="/halak">Halak listája</Link>
            </li>
            <li>
              <Link to="/halak/uj">Új hal hozzáadása</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/halak" element={<HalakListaja />} />
            <Route path="/halak/uj" element={<UjHal />} />
            <Route path="/halak/szerkesztes/:id" element={<HalSzerkesztes />} />
            <Route
              path="/"
              element={<div className="kezdolap">Üdvözöljük a haladatbázisban!</div>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
