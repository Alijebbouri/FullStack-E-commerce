import React from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='h-100 d-flex flex-column'>
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/admin/dashboard">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <Link className="nav-link" to="/admin/profile">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                profile
                            </Link>
                            <Link className="nav-link" to="/admin/view-category">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Category
                            </Link>
                            <Link className="nav-link" to="/admin/view-produtcs">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Products
                            </Link>
                            <Link className="nav-link" to="/admin/order">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Orders
                            </Link>
                        </div>
                    </div>
                   
                </nav>
    </div>
  )
}

export default Sidebar