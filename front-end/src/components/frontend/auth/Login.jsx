import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Swal from 'sweetalert2'
import Navbar from '../../../layouts/frontend/Navbar';

function Login() {
  const [loginInput,setLoginInput] = useState({
    email:'',
    password:'',
    errors:[],
  });
  const navigate = useNavigate()
  const handleInput = (e)=>{
    e.persist();
    setLoginInput({...loginInput,[e.target.name]:e.target.value})
  }
  const handleLogin = (e)=>{
    e.preventDefault();
    const data = {
      email:loginInput.email,
      password:loginInput.password
    }
    axiosClient.get('/sanctum/csrf-cookie').then((response) => {
      axiosClient.post('/api/login',data).then(function(response) {
        if(response.data.status === 200){
            localStorage.setItem('auth_token', response.data.token)
            localStorage.setItem('auth_name', response.data.username)
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.data.message,
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
            });
            if(response.data.role === 'admin'){
              navigate('/admin/dashboard');
            }else{
              navigate('/');
            }
        }else if(response.data.status === 401){
          Swal.fire({
            icon: 'warning',
            title: 'Warning!',
            text: response.data.message,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
          });
        }else{
          setLoginInput({ ...loginInput, errors: response.data.errors });
        }
      }).catch(function(error){
        console.log("error", error);
      })
    }).catch((error)=>{
      console.error(error)
    })
  }
  return (
    <div>
      <Navbar/>
      <div className="container-fluid vh-100 bg-info-subtle">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-2">
            <form className="card-body cardbody-color p-lg-5" onSubmit={handleLogin}>
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                  
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name='email'
                  placeholder="Email"
                  onChange={handleInput}
                  value={loginInput.email}
                />
                <div className='text-danger'>{loginInput.errors.email}</div>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name='password'
                  placeholder="password"
                  onChange={handleInput}
                  value={loginInput.password}
                />
                <div className='text-danger'>{loginInput.errors.password}</div>

              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-info px-5 mb-5 w-100"
                >
                  Login
                </button>
              </div>
              <div className="form-text text-center mb-5 text-dark">
                Not Registered?{' '}
                <Link to="/register" className="text-dark fw-bold">
                  {' '}
                  Create an Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Login;
