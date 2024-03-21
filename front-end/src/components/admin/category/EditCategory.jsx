import React,{useEffect, useState} from 'react'
import { Link,useParams,useNavigate  } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Swal  from 'sweetalert2';
import Loading from './../../../layouts/Loading';

function EditCategory() {
    const [categoryInput,setCategoryInput]= useState({
        slug : '', 
        name : '', 
        description : '', 
        status : '', 
        meta_title : '', 
        meta_keyword : '', 
        meta_description : '', 
        error_list:[],
    });
    const navigate = useNavigate();
    const [loading,setLoading] =  useState(true);
    const { id } = useParams();

    const handleInput = (e) => {
        e.persist();
        setCategoryInput({ ...categoryInput ,
            [e.target.name]:e.target.value,
        });
    }
    useEffect(()=>{
        axiosClient.get(`/api/categories/${id}/edit`).then((res)=>{
            if(res.data.status === 200){
                setCategoryInput(res.data.category)
            }else if(res.data.status === 404){
                Swal.fire({
                    title: "Error",
                    text: res.data.error,
                    icon: "error"
                });
            }
            setLoading(false)
        }).catch((err)=>{
            Swal.fire({
                title: "Error",
                text: 'category not found ',
                icon: "error"
            });
            navigate('/admin/view-category')
        })
    },[id,navigate]);
    if(loading){
        return (
            <div>
                <Loading/>
            </div>
        )
    }
    const handleCategoryUpdate = (e) => {
        e.preventDefault();
        const data = categoryInput;
        axiosClient.put(`/api/categories/${id}`,data).then((res)=>{
            if(res.data.status === 200){
                Swal.fire({
                    title: "success",
                    text: res.data.message,
                    icon: "success"
                })
                navigate('/admin/view-category')
            }else if(res.data.status === 400){
                Swal.fire({
                    title: "error",
                    text: res.data.message,
                    icon: "error"
                })
                setCategoryInput({ ...categoryInput, error_list: res.data.errors });
            }
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
                Swal.fire({
                    title: "error",
                    text: error.response.data.message,
                    icon: "error"
                })
            } else {
              console.log('Unknown error:', error);
            }
          });
        
    }
  return (
    <div className='container px-4 mt-4'>
        <div className='card'>
            <div className='card-header'>
                <h4>Category Update
                    <Link to="/admin/view-category" className="btn btn-primary float-end ">Back</Link>
                </h4>
            </div>
            <div className='card-body'>
        <form onSubmit={handleCategoryUpdate}>
            <ul className="nav nav-tabs " id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Seo Tags</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade card-body border show active p-4" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <div className='form-group mb-3'>
                        <label htmlFor='slug'>Slug</label>
                        <input type='text' name='slug' onChange={handleInput} value={categoryInput.slug} className='form-control'/>
                        {/* <div className='text-danger'>{categoryInput.error_list.slug}</div> */}
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' onChange={handleInput} value={categoryInput.name} className='form-control'/>
                        {/* <div className='text-danger'>{categoryInput.error_list.name}</div> */}
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='description'>Descrption</label>
                        <textarea  name='description' onChange={handleInput} value={categoryInput.description ?? ''} className='form-control'></textarea>
                        {/* <div className='text-danger'>{categoryInput.error_list.description}</div> */}
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='status'>Status : </label>
                        <input type="checkbox" onChange={handleInput} value={categoryInput.status} name="status"/> 
                        {/* <div className='text-danger'>{categoryInput.error_list.status}</div> */}
                    </div>
                </div>
                <div className="tab-pane fade card-body border p-4" id="seo-tab-pane" role="tabpanel" aria-labelledby="seo-tab" tabIndex="0">
                    <div className="form-group mb-3">
                        <label htmlFor="meta_title">Meta Title</label>
                        <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control"/>
                        {/* <div className='text-danger'>{categoryInput.error_list.meta_title}</div>      */}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="meta_keyword">Meta Keyword</label>
                        <textarea type="text" name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword ?? ''} className="form-control"></textarea>
                        {/* <div className='text-danger'>{categoryInput.error_list.meta_keyword}</div> */}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="meta_description">Meta Description</label>
                        <textarea type="text" name="meta_description" onChange={handleInput} value={categoryInput.meta_description ?? ''}  className="form-control"></textarea> 
                        {/* <div className='text-danger'>{categoryInput.error_list.meta_description}</div>               */}
                    </div>
                </div>
            </div>
            <div className="col-md-12 mb-3">
                <button type="submit"  className="btn btn-primary px-4 mt-2 float-end">Add</button>
            </div>
        </form>
        </div>
        </div>
        
    </div>
  )
}

export default EditCategory