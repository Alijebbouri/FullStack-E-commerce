import React, { useEffect, useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import Loading from './../../../layouts/Loading';
import { axiosClient } from '../../../api/axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function ShowProduct() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get(`/api/getProducts/${slug}`).then((res) => {
            if (res.data.status === 200) {
                setProduct(res.data.product_info.product);
                setCategory(res.data.product_info.category);
                setLoading(false);
            } else if (res.data.status === 400 || res.data.status === 404) {
                Swal.fire({
                    title: "Error",
                    text: res.data.message,
                    icon: "error"
                }).then(() => navigate('/collections'));
            }
        }).catch((error) => {
            console.error('Error fetching product:', error);
            setLoading(false);
        });
    }, [slug, navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Navbar />
            <div className='py-3'>
                <div className="container">
                    <h2 className='text-center'>Collections {category.name}</h2>
                    <hr />
                </div>
            </div>
            <div className="container d-flex justify-content-center flex-wrap gap-2">
                {product.length ? (
                    product.map((item, index) => (
                        <div className='col-md-4 mt-2' key={index}>
                            <div className='card'>
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <img src={`http://127.0.0.1:8000/${item.image}`} width='150px' alt={item.name} />
                                </Link>
                                <div className='card-body'>
                                    <h5>{item.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='alert alert-info mt-2 text-center'>No products found</div>
                )}
            </div>
        </div>
    );
}

export default ShowProduct;
