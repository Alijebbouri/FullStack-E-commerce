import React, { useEffect, useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import { axiosClient } from '../../../api/axios';
import Swal from 'sweetalert2';
import Loading from '../../../layouts/Loading';
import { Link, useNavigate } from 'react-router-dom';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // axiosClient.get(`/api/order`).then((res) => {
    //   if (res.data.status === 200) {
    //     setOrders(res.data.orders);
    //     setLoading(false);
    //   } else if (res.data.status === 404) {
    //     Swal.fire({
    //       title: "error",
    //       text: res.data.message,
    //       icon: "error"
    //     });
    //   }else if (res.data.status === 401) {
    //     Swal.fire({
    //       title: "error",
    //       text: res.data.message,
    //       icon: "error"
    //     });
    //     navigate('/login');
    //   }
    // });
    axiosClient.get(`/api/order`)
    .then((res) => {
      if (res.data.status === 200) {
        setOrders(res.data.orders);
        setLoading(false);
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Error",
          text: res.data.message,
          icon: "error"
        });
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Error",
          text: "You need to login to view your orders.",
          icon: "error"
        }).then(() => {
          // Redirect to login page
          navigate('/login');
        });
      } else {
        console.error('Error fetching orders:', error);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error"
        });
      }
    });
  
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="py-3 py-md-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="shadow bg-white p-3">
                <h4 className="mb-4 text-center">My Orders</h4>
                <hr />
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Tracking no</th>
                        <th>Payment Mode</th>
                        <th>Order Date</th>
                        <th>Status Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order, index) => (
                          <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.tracking_no}</td>
                            <td>{order.payment_mode}</td>
                            <td>{order.created_at}</td>
                            <td>{order.status === 0 ? (
                              <span className='text-danger'>pending</span>
                            ) : (
                              <span className='text-success'>completed</span>
                            )}</td>
                            <td>
                              <Link to={`/my-order/${order.id}`} className='btn btn-primary btn-sm'>Show</Link> 
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">No Orders Found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;


