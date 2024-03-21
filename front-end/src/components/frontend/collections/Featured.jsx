import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/axios';
import Loading from './../../../layouts/Loading';
import Swal from 'sweetalert2';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

function Featured() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/api/featured-product')
      .then((res) => {
        if (res.data.status === 200) {
          setFeatured(res.data.featured);
          setLoading(false);
        } else if (res.data.status === 404) {
          Swal.fire({
            title: "Error",
            text: res.data.message,
            icon: "error"
          });
        }
      })
      .catch(error => {
        console.error("Error fetching featured products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container py-5'>
      <h4 className="text-center mb-4">Featured Products</h4>
      <hr/>
      <OwlCarousel className='owl-theme' loop margin={10} nav>
        {featured.map((product, index) => (
          <div className='item' key={index}>
            <div className="card h-100">
              <Link to={`/collections/${product.category.slug}/${product.slug}`}>
                <img src={`http://127.0.0.1:8000/${product.image}`} className="card-img-top" alt={product.name} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.selling_price}</p>
                <p className="card-text"><del>{product.selling_price}</del></p>
                <Link to={`/collections/${product.category.slug}/${product.slug}`} className="btn btn-primary">View Product</Link>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}

export default Featured;
