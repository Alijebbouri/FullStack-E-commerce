import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { axiosClient } from './api/axios';
import Swal from 'sweetalert2';
import MasterLayout from './layouts/admin/MasterLayout';
import Loading from './layouts/Loading';

function AdminProtectedRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.interceptors.response.use(
      undefined,
      function axiosInterceptors(err) {
        if (err.response.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'Warning!',
            text: err.response.data.message,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
          });
          navigate('/login');
        }
        return Promise.reject(err);
      }
    );

    axiosClient.get('/api/checkAuth')
      .then(res => {
        if (res.status === 200) {
          setAuth(true);
        }
      })
      .catch(err => {
        console.error('Error checking authentication:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  axiosClient.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Forbidden!',
          text: error.response.data.message,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
        });
        navigate('/');
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <div><Loading/></div>;
  }

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <MasterLayout>
      {children}
    </MasterLayout>
  );
}

export default AdminProtectedRoute;
