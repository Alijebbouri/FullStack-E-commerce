import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Loading from '../../../layouts/Loading';
import Swal  from 'sweetalert2';

function ViewCategory() {
    const [category,setCategory] =  useState([]);
    const [loading,setLoading] =  useState(true);
    useEffect(()=>{
        axiosClient.get('/api/categories').then((response)=>{
            if(response.status === 200){
                setCategory(response.data.categories)     
            }
            setLoading(false)
        }).catch((error)=>console.log(error))
        .finally(() => setLoading(false));
    },[]);
    const deleteCategory = (e,id) =>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting...';
        axiosClient.delete(`api/categories/${id}`).then((res)=>{
            if(res.data.status === 200){
                Swal.fire({
                    title: "success",
                    text: res.data.message,
                    icon: "success"
                })
                thisClicked.closest("tr").remove();
            }else if(res.data.status === 404){
                Swal.fire({
                    title: "error",
                    text: res.data.message,
                    icon: "error"
                })
            }
        })
    }
    if(loading){
        return (
            <Loading/>
        )
    }
  return (
    <div className="container px-4">
        <div className="card mt-4">
            <div className="card-header p-2">
                <h4>Category List
                    <Link to="/admin/add-category" className="btn btn-primary float-end ">Add Category</Link>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Slug</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((item,index)=>{
                                return <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.slug}</td>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {
                                            <div>
                                                <Link to={`/admin/edit-category/${item.id}`} className="btn btn-warning me-2">Edit</Link>
                                                <Link to={`/admin/delete-category/${item.id}`} onClick={(e)=>deleteCategory(e,item.id)} className="btn btn-danger">Delete</Link>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ViewCategory