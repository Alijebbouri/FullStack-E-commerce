import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Swal from 'sweetalert2';
import Loading from './../../../layouts/Loading';

function History() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get(`/api/order-history`).then((res) => {
      if (res.data.status === 200) {
        setOrders(res.data.orders);
        setLoading(false);
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "error",
          text: res.data.message,
          icon: "error"
        });
      }
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className='container px-4 mt-4'>
      <div className='row'>
        <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                  <h4>Order Pending 
                      <Link to="/admin/order" className="btn btn-primary float-end ">Back</Link>
                  </h4>
              </div>
              <div className='card-body'>
                <table className='table '>
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
                              <Link to={`/admin/order/${order.id}`} className='btn btn-primary btn-sm'>Show</Link> 
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
  )
}

export default History