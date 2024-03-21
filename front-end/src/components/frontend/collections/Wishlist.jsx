import React, { useEffect, useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Loading from './../../../layouts/Loading';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
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
            axiosClient.get('/api/wishlists')
                .then((res) => {
                    if (res.data.status === 200) {
                        setWishlist(res.data.wishlist);
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
                    console.error("Error fetching wishlist data:", error);
                    setLoading(false);
                });
        }
    }, [navigate]);
    if (loading) {
        return <Loading />;
      }
    const handleDeleteWishlist = (e, wishlist_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Removing...';
        axiosClient.delete(`/api/delete-wishlist-item/${wishlist_id}`).then((res) => {
            if (res.data.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
                setWishlist(wishlist.filter(item => item.id !== wishlist_id));
            } else if (res.data.status === 404) {
                Swal.fire({
                    title: "Error",
                    text: res.data.message,
                    icon: "error"
                });
                thisClicked.innerText = 'Remove';
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className="py-3">
                <div className="container">
                    <h2 className='text-center'> Your Wishlist </h2>
                    <hr />
                </div>
                <div className='container'>
                    {wishlist.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product Image</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width='70px' />
                                        </td>
                                        <td>{item.product.category.name}</td>
                                        <td>{item.product.name}</td>
                                        <td>{`${item.product.selling_price} MAD`}</td>
                                        <td>
                                            <button type='button' className='btn btn-danger' onClick={(e) => handleDeleteWishlist(e, item.id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className='alert alert-info text-center'>
                            No items in your wishlist yet!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
