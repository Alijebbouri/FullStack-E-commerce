// import React, { useEffect, useState } from 'react'
// import Navbar from '../../../layouts/frontend/Navbar'
// import { axiosClient } from '../../../api/axios'
// import { Link } from 'react-router-dom';
// import Loading from './../../../layouts/Loading';

// function ShowCollections() {
//   const [category,setCategory] =  useState([]);
//   const [loading,setLoading] = useState(true);
//   useEffect(()=>{
//     axiosClient.get(`/api/getAllCategory`).then((res)=>{
//       if(res.data.status === 200){
//         setCategory(res.data.category)
//         setLoading(false)
//       }
      
//     })
//   },[])
//   if(loading){
//     return (
//         <Loading/>
//     )
// }
//   return (
//     <div>
//       <Navbar/>
//       <div className="py-3">
//         <div className="container mt-6">
//           <h4 className='text-center'>Category Page</h4>
//           <hr/>
//         </div>
//       </div>
      
//       <div className='py-3'>
//         <div className='container'>
//           <div className='row'>
//             {
//               category.map((item,index)=>{
//                 return <div className="col-md-4" key={index}>
//                 <div className="card">
//                   <div className="card-body">
//                     <Link to = {`/collections/${item.slug}`}>
//                       <h5>{item.name}</h5>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//               })
//             }
//           </div>
//         </div>
//       </div>
//     </div>
    
    
//   )
// }

// export default ShowCollections
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from './../../../layouts/Loading';
import Navbar from './../../../layouts/frontend/Navbar';
import { axiosClient } from '../../../api/axios';

function ShowCollections() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/api/getAllCategory`).then((res) => {
      if (res.data.status === 200) {
        setCategories(res.data.category);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    axiosClient
      .get(`/api/filterData`, {
        params: {
          category: categoryFilter,
          priceSort: priceSort,
          searchQuery: searchQuery,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.products);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [categoryFilter, priceSort, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    setCategoryFilter(categoryId);
    navigate(`?category=${categoryId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className='container mt-2'>
        <h1 className=''>Product</h1>
        <hr />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='mb-2'>
              <input type='text' className='form-control mb-3' placeholder='Search Product' value={searchQuery} onChange={handleSearchChange}/>
            </div>
            <div className='card'>
              <div className='card-header'>
                <h5>Category</h5>
              </div>
              <div className='card-body'>
                {categories.map((item, index) => (
                  <div key={index}>
                    <input
                      type='checkbox'
                      className='m-2'
                      value={item.id}
                      checked={categoryFilter === item.id}
                      onChange={() => handleCategoryChange(item.id)}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='card mt-2'>
              <div className='card-header'>
                <h5>Price</h5>
              </div>
              <div className='card-body'>
                <label className='d-block m-2'>
                  <input
                    type='radio'
                    name='priceSort'
                    value='high-to-low'
                    className='me-2'
                    onChange={() => setPriceSort('high-to-low')}
                  />
                  High to Low
                </label>
                <label className='d-block m-2'>
                  <input
                    type='radio'
                    name='priceSort'
                    value='low-to-high'
                    className='me-2'
                    onChange={() => setPriceSort('low-to-high')}
                  />
                  Low to High
                </label>
              </div>
            </div>
          </div>
          <div className='col-md-9'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className='col h-50'>
                    <div className="card mb-4">
                      <img src={`http://127.0.0.1:8000/${product.image}`} width='150px' className="card-img-top" alt={product.name} />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: ${product.selling_price}</p>
                        <Link to={`/collections/${product.category.slug}/${product.slug}`} className="btn btn-primary">View Product</Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='alert alert-info col-md-12 text-center'>No Product Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCollections;
