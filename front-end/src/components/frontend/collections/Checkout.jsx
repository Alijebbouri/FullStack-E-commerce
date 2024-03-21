import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom"
import Navbar from '../../../layouts/frontend/Navbar'
import { axiosClient } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from './../../../layouts/Loading';

function Checkout() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [errorList, setError] = useState([]);
  let totalCartPrice=0
  const [checkoutInput, setCheckout] = useState({
    'firstname':'', 
    'lastname':'', 
    'phone':'', 
    'email':'', 
    'address':'', 
    'city':'', 
    'state':'', 
    'zipcode':'', 
  });

const handleInput = (e) => {
    e.persist();
    setCheckout({...checkoutInput,[e.target.name]:e.target.value});

}
  useEffect(()=>{
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
  },[navigate])
  if (loading) {
    return <Loading />;
  }
  const data_info = {
    'firstname':checkoutInput.firstname, 
    'lastname':checkoutInput.lastname, 
    'phone':checkoutInput.phone, 
    'email':checkoutInput.email, 
    'address':checkoutInput.address, 
    'city':checkoutInput.city, 
    'state':checkoutInput.state, 
    'zipcode':checkoutInput.zipcode,
    'payment_mode':'paid by paypal',
    'payment_id':''   
};
  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  const createOrder = (data, actions) => {
  return actions.order.create({
    purchase_units: [{
      amount: {
        value: totalCartPrice 
      },
    }]
  });
};
  
  const onApprove = (data,actions) => {
     return actions.order.capture().then(function(details){
      data_info.payment_id = details.id
      axiosClient.post(`/api/place-order`,data_info).then(
        res => {
            if(res.data.status===200){
              Swal.fire({
                title: "order placed successfully",
                text: res.data.message,
                icon: "success"
              });
              setError([]);
              navigate("/thankyou");
            }else if(res.data.status===422){
              setError(res.data.errors);
            }
        }
    );


     })
  };
  const HandleSubmitOrder = (e,payment_mode) =>{
    e.preventDefault();
    const data = {
        'firstname':checkoutInput.firstname, 
        'lastname':checkoutInput.lastname, 
        'phone':checkoutInput.phone, 
        'email':checkoutInput.email, 
        'address':checkoutInput.address, 
        'city':checkoutInput.city, 
        'state':checkoutInput.state, 
        'zipcode':checkoutInput.zipcode,
        'payment_mode':payment_mode,
        'payment_id':''   
    };

    // axiosClient.post(`/api/place-order`,data).then(
    //     res => {
    //         if(res.data.status===200){
    //           Swal.fire({
    //             title: "order placed successfully",
    //             text: res.data.message,
    //             icon: "success"
    //           });
    //           setError([]);
    //           navigate("/thank-you");
    //         }else if(res.data.status===422){
    //           setError(res.data.errors);
    //         }
    //     }
    // );
    switch(payment_mode){
      case 'cod':
        axiosClient.post(`/api/place-order`,data).then(
          res => {
              if(res.data.status===200){
                Swal.fire({
                  title: "order placed successfully",
                  text: res.data.message,
                  icon: "success"
                });
                setError([]);
                navigate("/thankyou");
              }else if(res.data.status===422){
                setError(res.data.errors);
              }
          }
      );
        break
      case 'paypal':
        axiosClient.post(`/api/validate-order`,data).then(res =>{
          if(res.data.status===200){
            setError([]);
            const myModal = new window.bootstrap.Modal(document.getElementById('paymentOnline'),data)
            myModal.show()
          }else if(res.data.status===422){
            setError(res.data.errors);
          }
        })
        break
      default:
        break;
    }
}

  return (
    <div>
      <div className="modal fade" id="paymentOnline" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="paymentOnlineLabel" aria-hidden="true">
        <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="paymentOnlineLabel">Online Payment</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" data-bs-target="#paymentOnline"></button>
        </div>
        <div className="modal-body">
        <PayPalButton 
            createOrder={(data,actions) => createOrder(data,actions)}
            onApprove={(data,actions) => onApprove(data,actions)}
          />
        </div>
        
      </div>
    </div>
  </div>
      <Navbar/>
      <div className="py-3">
        <div className="container">
          <h2 className='text-center'> Checkout page </h2>
          <hr/>
        </div>
      </div>
      <div className='py-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <div className='card'>
                
                <div className='card-header'>
                    <h4>Basic inforamtion</h4>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className="form-group mb-3">
                        <label>first name</label>
                        <input type="text" className="form-control" onChange={handleInput} value={checkoutInput.firstname} name="firstname" />
                        <small className="text-danger">{errorList.firstname}</small> 
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-group mb-3">
                        <label>last name</label>
                        <input type="text" className="form-control" name="lastname" onChange={handleInput} value={checkoutInput.lastname}/>
                        <small className="text-danger">{errorList.firstname}</small> 
                      </div>
                    </div>
                    <div className="col-md-6">
                                       <div className="form-group mb-3">
                                           <label>phone number</label>
                                           <input type="text" className="form-control" 
                                           name="phone" onChange={handleInput} value={checkoutInput.phone}  />
 <small className="text-danger">{errorList.phone}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group mb-3">
                                           <label>email address</label>
                                           <input type="text" className="form-control"
                                            name="email"  onChange={handleInput} value={checkoutInput.email} />
                                      <small className="text-danger">{errorList.email}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="form-group mb-3">
                                           <label>full address</label>
                                           <textarea type="text" row="2" className="form-control" 
                                           name="address" onChange={handleInput} value={checkoutInput.address} ></textarea>
                                            <small className="text-danger">{errorList.address}</small> 
                                           
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group mb-3">
                                           <label>city</label>
                                           <input type="text" className="form-control" 
                                           name="city" onChange={handleInput} value={checkoutInput.city} />
<small className="text-danger">{errorList.city}</small> 
                                           
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group mb-3">
                                           <label>state</label>
                                           <input type="text" className="form-control" 
                                           name="state" onChange={handleInput} value={checkoutInput.state}  />
<small className="text-danger">{errorList.state}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group mb-3">
                                           <label>zip code</label>
                                           <input type="text" className="form-control" 
                                           name="zipcode" onChange={handleInput} value={checkoutInput.zipcode}  />
<small className="text-danger">{errorList.zipcode}</small>
                                       </div>
                                       </div>
                                    <div className="col-md-12">  
                                       <div className="form-group mb-3 float-end">
                                           <button type="button" onClick={(e)=>{HandleSubmitOrder(e,'cod')}} className="btn btn-primary btn me-2">Place order</button>
                                           <button type="button" onClick={(e)=>{HandleSubmitOrder(e,'paypal')}} className="btn btn-warning">Pay Online</button>
                                       </div>
                                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-5'>
              
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" width="50%">Product</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item, index) => {
                    totalCartPrice += item.product.selling_price * item.quantity
                    return (
                      <tr key={index}>
                      <td>{item.product.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td>{item.product.selling_price}</td>
                      <td>{item.product.selling_price * item.quantity}</td>
                    </tr>
                    )
                  })}
                  <tr>
                    <td colSpan="2" className="text-end fw-bold">Grand total</td>
                    <td colSpan="2" className="text-end fw-bold">
                      {/* {carts.reduce((acc, curr) => acc + (curr.product.selling_price * curr.quantity), 0)} */}
                      {totalCartPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout