import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Swal  from 'sweetalert2';

function AddProduct() {
    const [category,setCategory]= useState([]);
    const [productInput, setProductInput] = useState({
        category_id : '',
        slug : '',
        name:'',
        description:'',
        meta_title:'',
        meta_keyword:'',
        meta_description:'',
        selling_price:'',
        original_price:'',
        quantity:'',
        brand:'',
        featured:'',
        popular:'',
        status:'',
    })
    const [images,setImage ] = useState(null);
    const [error,setErrors] = useState([]);
    const handleInput = (e)=>{
        e.persist();
        setProductInput({...productInput , [e.target.name]:e.target.value});
    }
    const handleImage = (e) => {
        setImage({ image:e.target.files[0]});
    }
    
    useEffect(()=>{
        axiosClient.get('/api/categories').then((res)=>{
            if(res.data.status === 200){
                setCategory(res.data.categories)
            }
        }).catch((err)=>{
            console.error(err);
        })
    },[])
    const handleSubmitProduct = (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('image',images.image);
        formData.append('category_id',productInput.category_id);
        formData.append('slug',productInput.slug);
        formData.append('name',productInput.name);
        formData.append('description',productInput.description);
        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_keyword',productInput.meta_keyword);
        formData.append('meta_description',productInput.meta_description);
        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('quantity',productInput.quantity);
        formData.append('brand',productInput.brand);
        formData.append('featured',productInput.featured);
        formData.append('popular',productInput.popular);
        formData.append('status',productInput.status);

        axiosClient.post('/api/store-product',formData).then((res)=>{
            if(res.data.status === 200){
                Swal.fire({
                    title: "success",
                    text: res.data.message,
                    icon: "success"
                })
            }else if(res.data.status === 422){
                setErrors(res.data.errors)
            }
        })

    }
  return (
    <div className='container px-4 mt-4'>
        <div className='card'>
            <div className='card-header'>
                <h4>Add Product 
                    <Link to="/admin/view-produtcs" className="btn btn-primary float-end ">Back</Link>
                </h4>
            </div>
            <div className='card-body'>
            <form onSubmit={handleSubmitProduct} encType='multipart/form-data'>
                <ul className="nav nav-tabs " id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Seo Tags</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Other Details</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade card-body border show active p-4" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <div className='form-group mb-3'>
                        <label htmlFor='category_id'>Select Category</label>
                        <select id='category_id' onChange={handleInput} value={productInput.category_id} name='category_id' className='form-control'>
                            <option>Select Category</option>
                            { 
                            category.map((item,index) => {
                              return (<option value={item.id} key={index}>{item.name}</option>)
                            })
                          
                            }
                        </select>
                        <div className='text-danger'>{error.category_id}</div>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='slug'>Slug</label>
                        <input type='text' name='slug' onChange={handleInput} value={productInput.slug}  className='form-control'/>
                        <div className='text-danger'>{error.slug}</div>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' onChange={handleInput} value={productInput.name}  className='form-control'/>
                        <div className='text-danger'>{error.name}</div>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='description'>Descrption</label>
                        <textarea  name='description' onChange={handleInput} value={productInput.description}  className='form-control'></textarea>
                        <div className='text-danger'>{error.description}</div>
                    </div>
                    </div>
                <div className="tab-pane fade card-body border p-4" id="seo-tab-pane" role="tabpanel" aria-labelledby="seo-tab" tabIndex="0">
                <div className="form-group mb-3">
                        <label htmlFor="meta_title">Meta Title</label>
                        <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control"/>
                        <div className='text-danger'>{error.meta_title}</div>     
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="meta_keyword">Meta Keyword</label>
                        <textarea type="text" name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword}  className="form-control"></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="meta_description">Meta Description</label>
                        <textarea type="text" name="meta_description"  onChange={handleInput} value={productInput.meta_description} className="form-control"></textarea> 
                    </div>
                </div>
                <div className="tab-pane fade card-body border p-4" id="details-tab-pane" role="tabpanel" aria-labelledby="seo-tab" tabIndex="0">
                    <div className='row'>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="exampleFormControlInput111" className="form-label">selling price</label>
                            <input name="selling_price" onChange={handleInput} value={productInput.selling_price} type="number" className="form-control" id="exampleFormControlInput111"/>
                            <div className='text-danger'>{error.selling_price}</div>
                        </div>
                        <div className="mb-3 col-md-4" >
                            <label htmlFor="exampleFormControlInput222" className="form-label">original price</label>
                            <input name="original_price" type="number" onChange={handleInput} value={productInput.original_price} className="form-control" id="exampleFormControlInput222"/>
                            <div className='text-danger'>{error.original_price}</div>
                        </div>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="exampleFormControlInput333" className="form-label">quantity</label>
                            <input name="quantity" type="number" onChange={handleInput} value={productInput.quantity} className="form-control"  id="exampleFormControlInput333"/>
                            <div className='text-danger'>{error.quantity}</div>
                        </div>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="exampleFormControlInput444" className="form-label">brand</label>
                            <input name="brand" type="text" className="form-control" onChange={handleInput} value={productInput.brand} id="exampleFormControlInput444"/>
                            <div className='text-danger'>{error.brand}</div>
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="formFile" className="form-label">image</label>
                            
                            <input name="image"onChange={handleImage} className="form-control" type="file" id="formFile" />
                            <div className='text-danger'>{error.image}</div>
                        </div>
                        <div className="form-check col-md-4">
                            <input name="featured"  className="form-check-input" onChange={handleInput} value={productInput.featured} type="checkbox" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                        featured
                                </label>
                        </div>
                        <div className="form-check col-md-4">
                            <input name="popular" onChange={handleInput} value={productInput.featured} className="form-check-input" type="checkbox"  id="flexCheckChecked"  /><label className="form-check-label" htmlFor="flexCheckChecked">popular</label>
                        </div>
                        <div className="form-check col-md-4">
                            <input name="status" className="form-check-input" type="checkbox" onChange={handleInput} value={productInput.status} id="flexCheckChecked3"  />
                            <label className="form-check-label"  htmlFor="flexCheckChecked3">status</label>
                        </div>
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

export default AddProduct