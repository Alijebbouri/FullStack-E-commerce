import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/axios';
import Loading from './../../../layouts/Loading';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../../layouts/frontend/Navbar';

function Cart() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      Swal.fire({
        title: "Warning",
        text: 'Login to access',
        icon: "warning"
      });
      navigate('/login');
    } else {
      axiosClient.get('/api/carts')
        .then((res) => {
          if (res.data.status === 200) {
            setCarts(res.data.cart);
            setLoading(false);
          } else if (res.data.status === 401) {
            Swal.fire({
              title: "Error",
              text: res.data.message,
              icon: "error"
            });
            navigate('/login');
          }
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
          setLoading(false);
        });
    }
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  const handleDecrement = (cart_id) => {
    setCarts(carts.map((item) => cart_id === item.id ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) } : item));
    updateCartQuantity(cart_id, "dec");
  };

  const handleIncrement = (cart_id) => {
    setCarts(carts.map((item) => cart_id === item.id ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) } : item));
    updateCartQuantity(cart_id, "inc");
  };

  const updateCartQuantity = (cart_id, scope) => {
    axiosClient.put(`/api/cart-update-quantity/${cart_id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
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
      } else if (res.data.status === 404 || res.data.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: res.data.message,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
        });
      }
    });
  };

  const handleDeleteCart = (e, cart_id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Removing...';
    axiosClient.delete(`/api/delete-cart-item/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success"
        });
        setCarts(carts.filter(item => item.id !== cart_id));
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Error",
          text: res.data.message,
          icon: "error"
        });
        thisClicked.innerText = 'Remove';
      }
    });
  };

  const totalCartPrice = carts.reduce((acc, curr) => acc + (curr.product.selling_price * curr.quantity), 0);

  return (
    <div>
      <Navbar/>
      <div className="py-3">
        <div className="container">
          <h2 className='text-center'> Your Shopping Cart </h2>
          <hr />
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className='table-responsive'>
                {carts.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className='text-center'>Image</th>
                        <th className='text-center'>Product</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Total Price</th>
                        <th className='text-center'>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((item, index) => (
                        <tr key={index}>
                          <td width='10%'>
                            <img src={`http://127.0.0.1:8000/${item.product.image}`} width='50px' height='50px' alt={item.product.name} />
                          </td>
                          <td className='text-center'>{item.product.name}</td>
                          <td width='15%' className='text-center'>{item.product.selling_price}</td>
                          <td width='15%' className='text-center'>
                            <div className='input-group mb-3'>
                              <button type='button' className='input-group-text' onClick={() => handleDecrement(item.id)}>-</button>
                              <div className='form-control text-center'>{item.quantity}</div>
                              <button type='button' className='input-group-text' onClick={() => handleIncrement(item.id)}>+</button>
                            </div>
                          </td>
                          <td width='15%' className='text-center'>{item.product.selling_price * item.quantity}</td>
                          <td width='10%' className='text-center'>
                            <button type='button' className='btn btn-danger' onClick={(e) => handleDeleteCart(e, item.id)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4" className="text-end">Subtotal:</td>
                        <td colSpan="2" className="text-center">{totalCartPrice}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-end">Grand Total:</td>
                        <td colSpan="2" className="text-center">{totalCartPrice}</td>
                      </tr>
                      <tr>
                        <td colSpan="6" className="text-center">
                          <Link to="/checkout" className="btn btn-primary">Checkout</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="card card-body py-5 text-center shadow-sm">
                    <h4>Your Cart is empty</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
