import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Swal from 'sweetalert2';
import Loading from '../../../layouts/Loading';

function AdminOrderDetail() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient.get(`/api/getOrder/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setOrder(res.data.order);
        } else if (res.data.status === 404) {
          Swal.fire({
            title: "Error",
            text: res.data.message,
            icon: "error"
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error"
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    axiosClient.put(`/api/update-status-order/${id}`, { status: status })
      .then((res) => {
        if (res.data.status === 200) {
          setOrder({ ...order, status: res.data.order.status });
          Swal.fire({
            title: "Success",
            text: res.data.message,
            icon: "success"
          });
          navigate('/admin/order');
        } else {
          Swal.fire({
            title: "Error",
            text: res.data.message,
            icon: "error"
          });
        }
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error"
        });
      });
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main className="py-3 py-md-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="shadow bg-white p-3">
                <h4 className="mb-4 text-primary">
                  <i className="fa fa-shopping-cart"></i> My Order Details
                  <Link to="/admin/order" className="btn btn-danger float-end">Back</Link>
                </h4>
                <hr />
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="text-center">My Order Details</h5>
                    <hr />
                    <p><b>Order ID:</b> {order.id}</p>
                    <p><b>Date & Time:</b> {order.created_at}</p>
                    <p><b>Tracking No:</b> {order.tracking_no}</p>
                    <p><b>Payment Mode:</b> {order.payment_mode}</p>
                    <h6 className="border p-2">
                      Order Status Message : <span className="text-info text-uppercase">{order.status === 0 ? 'pending' : 'completed'}</span>
                    </h6>
                    <form onSubmit={handleStatusUpdate}>
                      <label htmlFor="status">Update Status :</label>
                      <select name='status' id="status" value={status} onChange={e => setStatus(e.target.value)} defaultValue={status} className='form-control'>
                        <option>Select status</option>
                        <option value="0">Pending</option>
                        <option value="1">Completed</option>
                      </select>
                      <button type="submit" className='btn btn-info mt-2'>Update</button>
                    </form>
                  </div>
                  <div className='col-md-6'>
                    <h5 className="text-center">User Details</h5>
                    <hr />
                    <p><b>Full Name:</b> {order.user.name}</p>
                    <p><b>Email:</b> {order.user.email}</p>
                    <p><b>Phone:</b> {order.phone}</p>
                    <p><b>Pin code:</b> {order.zipcode}</p>
                    <p><b>Address:</b> {order.address}</p>
                  </div>
                </div>
                <br />
                <h5 className="text-center">Order items</h5>
                <hr />
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Item ID</th>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderitems.map((orderItem, index) => (
                        <tr key={index}>
                          <td>{orderItem.id}</td>
                          <td>
                            <img src={`http://127.0.0.1:8000/${orderItem.product.image}`} alt={orderItem.product.name} width='50px'/>
                          </td>
                          <td>{orderItem.product.name}</td>
                          <td>${orderItem.price}</td>
                          <td>{orderItem.qty}</td>
                          <td>${orderItem.price * orderItem.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminOrderDetail;