import React, { useEffect, useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import Loading from './../../../layouts/Loading';
import { axiosClient } from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity,setQuantity] = useState(1);
  const { category_slug, product_slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/api/product-informations/${category_slug}/${product_slug}`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setLoading(false);
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Error",
          text: res.data.message,
          icon: "error"
        });
        navigate('/collections');
      }
    });
  }, [category_slug, product_slug, navigate]);
  const handleAddedToCart = (e)=>{
    e.preventDefault();
    const data = {
      product_id : product.id,
      product_quantity   : quantity

    }
    axiosClient.post('/api/add-to-cart',data).then((res)=>{
      console.log(res.data)
      if(res.data.status === 201){
        Swal.fire({
          title: "success",
          text: res.data.message,
          icon: "success"
        });
      }else if(res.data.status === 409){
        Swal.fire({
          title: "info",
          text: res.data.message,
          icon: "info"
        });
      }else if(res.data.status === 401){
        Swal.fire({
          title: "warning",
          text: res.data.message,
          icon: "warning"
        });
      }else if(res.data.status === 404){
        Swal.fire({
          title: "error",
          text: res.data.message,
          icon: "error"
        });
      }
    })
  }
  
  const handleDecrement = ()=>{
    if(quantity > 1){
        setQuantity(prevQty => prevQty - 1);
    }
   }
   const handleIncrement = ()=>{
    if(quantity < 10){
        setQuantity(prevQty => prevQty + 1);
    }
   }
  if (loading) {
    return <Loading />;
  }
  const handleWishlist = (e) =>{
    e.preventDefault();
    const data = {
      product_id : product.id,
    }
    axiosClient.post('/api/add-to-wishlist',data).then((res)=>{
      console.log(res.data)
      if(res.data.status === 201){
        Swal.fire({
          title: "success",
          text: res.data.message,
          icon: "success"
        });
      }else if(res.data.status === 409){
        Swal.fire({
          title: "info",
          text: res.data.message,
          icon: "info"
        });
      }else if(res.data.status === 401){
        Swal.fire({
          title: "warning",
          text: res.data.message,
          icon: "warning"
        });
      }else if(res.data.status === 404){
        Swal.fire({
          title: "error",
          text: res.data.message,
          icon: "error"
        });
      }
    })
  }
  
  return (
    <div>
      <Navbar />
      {product && (
        <>
          <div className="py-3">
            <div className="container">
              <h2 className='text-center'> Collections / {product.category ? product.category.name : ''} / {product.name} </h2>
              <hr/>
            </div>
          </div>
          <div className="py-3">
            <div className="container">
              <div className="row">
                <div className='col-md-4 border-end'>
                    <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} className='w-100'/>
                </div>
                <div className="col-md-8">
                  <h4>
                    {product.name}
                    <span className="float-end badge btn-sm btn-danger padge-pil">{product.brand}</span>
                  </h4>
                  <p>{product.description}</p>
                  <h4 className="mb-1">
                    Rs: {product.selling_price}
                    <s className="ms-2">Rs: {product.original_price}</s>
                  </h4>
                  {product.quantity > 0 ? (
                    <div>
                      <label className="btn btn-success px-4 mt-2">In Stock</label>
                      <div className="row">
                        <div className="col-md-3 mt-3">
                          <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                            <button type="submit" className="btn btn-primary mt-3" onClick={handleAddedToCart}>Add to Cart</button>
                            <button type="submit" className="btn btn-danger mt-3" onClick={handleWishlist}>Add to Wishlist</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="btn btn-danger px-4 mt-2">Out of Stock</label>
                    </div>
                  )}
                 
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
