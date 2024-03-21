import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Swal from 'sweetalert2'

function Register() {
  const [registerInput,setRegisterInput] = useState({
    name:'',
    email:'',
    password:'',
    errors:[],
  });
  const navigate = useNavigate()
  const handleInput = (e)=>{
      e.persist();
      setRegisterInput({...registerInput,[e.target.name]:e.target.value})
  }
  const handleRegister = (e)=>{
      e.preventDefault();
      const data = {
        name:registerInput.name,
        email:registerInput.email,
        password:registerInput.password,
      }
      axiosClient.get('/sanctum/csrf-cookie').then((response) => {
        axiosClient.post('/api/register',data).then(function(response) {
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
              navigate('/')
          }else{
            setRegisterInput({ ...registerInput, errors: response.data.errors });
          }
        }).catch(function(error){
          console.log("error", error);
        })
      }).catch((error)=>{
        console.error(error)
      })
      
  }

    return (
    <div className="container-fluid vh-100 bg-info-subtle">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-2">
                        <form className="card-body cardbody-color p-lg-5" onSubmit={handleRegister} >
                            <div className="text-center">
                                <img
                                    src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px"
                                    alt="profile"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Type a name"
                                    onChange={handleInput}
                                    value={registerInput.name} 
                                />
                                <div className='text-danger'>{registerInput.errors.name}</div>
                            </div>
                            <div className="mb-2">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="Email"
                                  onChange={handleInput}
                                  value={registerInput.email}
                                />
                                <div className='text-danger'>{registerInput.errors.email}</div>

                            </div>
                            <div className="mb-2">
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={handleInput}
                                value={registerInput.password}
                              />
                              <div className='text-danger'>{registerInput.errors.password}</div>

                            </div>
                            {/* <div className="mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password_confirmation"
                                    placeholder="Password Confirmation"
                                    
                                />
                            </div> */}
                            <div className="text-center">
                                <button type="submit" className="btn btn-info px-5 mb-4 w-100">
                                    Register
                                </button>
                            </div>
                            <div className="form-text text-center mb-5 text-dark">
                                Already Registered?{' '}
                                <Link to="/login" className="text-dark fw-bold">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
