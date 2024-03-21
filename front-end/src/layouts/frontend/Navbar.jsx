import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../api/axios';
import Swal from 'sweetalert2';

function Navbar() {
  const navigate = useNavigate();
  
  function handleLogout(e) {
    e.preventDefault();
    axiosClient.get('/sanctum/csrf-cookie').then(res =>{
      axiosClient.post('/api/logout',{}).then(res =>{
        if(res.data.status === 200){
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: res.data.message,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
          });
          navigate('/');
        }
      }).catch(err =>{
        console.log(err);
      });
    });
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info-subtle shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Jebbouri Shop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/collections">Collections</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-order">My Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carts"><i className="bi bi-cart"></i></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist"><i className="bi bi-heart"></i></Link>
            </li>
            {localStorage.getItem('auth_token') ? (
              <li className="nav-item">
                <button className="btn btn-info" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
