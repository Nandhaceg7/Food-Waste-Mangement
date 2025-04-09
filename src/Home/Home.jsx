import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard B</h2>
        <ul>
          <li>Overview</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="Heading">Mess Food Wastage Management</h1>
        </header>

        <section className="cards">
          <div className="card"> Mess supervisior</div>
          <button className="card"> Warden</button>
           
        </section>
      </main>
    </div>
  );
}

export default Home;
