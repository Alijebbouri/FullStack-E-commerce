import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
// import Loading from '../../../layouts/Loading';
// import Swal  from 'sweetalert2';
import Loading from './../../../layouts/Loading';

function Product() {
    const [product,setProduct] = useState([]);
    const [laoding,setLaoding] = useState(true);
    useEffect(()=>{
        axiosClient.get('/api/products').then((res)=>{
            if(res.data.status === 200){
                setProduct(res.data.products)
                setLaoding(false)
            }
        })
    },[])
    if(laoding){
        return (
            <div>
                <Loading/>
            </div>
        )
    }
  return (
    <div className="container px-4">
        <div className="card mt-4">
            <div className="card-header p-2">
                <h4>Product List
                    <Link to="/admin/add-produtcs" className="btn btn-primary float-end ">Add Product</Link>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Catgory</th>
                            <th>image</th>
                            <th>Slug</th>
                            <th>Name</th>
                            <th>quantity</th>
                            <th>selling price</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <th>{item.category.name}</th>
                                        <th>
                                            <img src={`http://127.0.0.1:8000/${item.image}`} alt='img' width='40px'/>
                                        </th>
                                        <th>{item.slug}</th>
                                        <th>{item.name}</th>
                                        <th>{item.quantity}</th>
                                        <th>{item.selling_price}</th>
                                        <th>{item.brand}</th>
                                        <th>
                                        {
                                            <div>
                                                <Link to={`/admin/edit-produtcs/${item.id}`} className="btn btn-warning me-2">Edit</Link>
                                                <Link to={`/admin/delete-produtcs/${item.id}`}  className="btn btn-danger">Delete</Link>
                                            </div>
                                        }
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Product;