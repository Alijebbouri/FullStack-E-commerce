// MasterLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function MasterLayout() {
  return (
    <div className='sb-nav-fixed'>
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
          <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
