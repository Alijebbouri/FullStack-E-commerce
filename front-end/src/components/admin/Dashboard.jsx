import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axios';
import Loading from '../../layouts/Loading';

function Dashboard() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosClient.get('/api/satistique')
      .then(response => response.data)
      .then(data => {
        setStatistics(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
      });
  }, []);
  if(loading){
    return (
      <div>
        <Loading/>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='mt-2 text-center'>Dashboard</h1>
          <hr/>
        </div>
        <div>
        {statistics && (
        <div className="row">
          <div className="card card-body bg-info text-white m-2 col-md-3 ">
            <label><i className="fas fa-shopping-cart fa-2x"></i> Total Products</label>
            <h1>{statistics.totalProducts}</h1>
          </div>
          <div className="card card-body bg-primary text-white m-2 col-md-3">
            <label><i className="fas fa-list fa-2x"></i> Total Categories</label>
            <h1>{statistics.totalCategories}</h1>
          </div>
          <div className="card card-body bg-success text-white m-2 col-md-3">
            <label><i className="fas fa-chart-bar fa-2x"></i> Total Orders</label>
            <h1>{statistics.totalOrders}</h1>
          </div>
          <div className="card card-body bg-warning text-dark m-2 col-md-3">
            <label><i className="fas fa-calendar-day fa-2x"></i> Today's Orders</label>
            <h1>{statistics.todayOrder}</h1>
          </div>
          <div className="card card-body bg-danger text-white m-2 col-md-3">
            <label><i className="fas fa-calendar-week fa-2x"></i> Monthly Orders</label>
            <h1>{statistics.monthOrder}</h1>
          </div>
          <div className="card card-body bg-secondary text-white m-2 col-md-3">
            <label><i className="fas fa-calendar-alt fa-2x"></i> Yearly Orders</label>
            <h1>{statistics.yearOrder}</h1>
          </div>
        </div>
      )}
        </div>

        </div>

      </div>

  );
}

export default Dashboard;
