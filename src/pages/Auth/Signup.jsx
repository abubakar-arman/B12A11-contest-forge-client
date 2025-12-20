import { Link, useNavigate } from 'react-router';

import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth'
import signupImg from '../../assets/signup.png'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';

const Signup = () => {
    const { signup, user, loginWithGoogle } = useAuth()
    const {register , handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(user);
        
    },[user])

    const invalidPassErr = (`Enter a valid password:
    - Must have an Uppercase letter in the password 
    - Must have a Lowercase letter in the password 
    `)

    const handleRegister = async (data) => {        
        const {name, email, password, photoUrl} = data
        
        try {
            await signup(email, password, name, photoUrl)
            toast.success('Account created successfully')
            console.log('user:', user);
            
            navigate('/')
        } catch (err) {
            if(err.code === 'auth/email-already-in-use'){
                toast.error('Email is already in use')
                return
            }
            toast.error('Incorrect information')
            console.log(err.code)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
            navigate('/')
        } catch(err){
            toast.error('Error occured while Logging in')
            return err.message
        }
    }
    return (
        <div className="min-h-[calc(100vh-90px)]">
            <h1 className="text-5xl font-bold text-center text-primary mt-10 mb-8">Signup now!</h1>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left ">
                        <img src={signupImg} className='w-lg hidden lg:block' alt="" />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleRegister)}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" className="input" {...register('name', {required: true})} placeholder="Name" />
                                    {errors.name?.type === 'required' && (
                                        <p className="text-red-600">* Name is required.</p>
                                    )}
                                    <label className="label">Email</label>
                                    <input type="email" className="input" {...register('email', {required: true})} placeholder="Email" />
                                    {errors.email?.type === 'required' && (
                                        <p className="text-red-600">* Email is required.</p>
                                    )}
                                    <label className="label">Password</label>
                                    <input type="password" className="input" {...register('password', {
                                        required: true,
                                        minLength: 6,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
                                    })} placeholder="Password" />
                                    {errors.password?.type === 'required' && (
                                        <p className="text-red-600">* Password is required.</p>
                                    )}
                                    {errors.password?.type === 'minLength' && (
                                        <p className="text-red-600">* Password  must be at least 6 characters.</p>
                                    )}
                                    {errors.password?.type === 'pattern' && (
                                        <p className="text-red-600">{invalidPassErr}</p>
                                    )}
                                    <label className="label">Photo URL</label>
                                    <input type="text" className="input" {...register('photoUrl')} placeholder="abc.jpg" />
                                    <button className="btn btn-primary mt-4">Signup</button>
                                    {/* Google */}
                                    
                                </fieldset>
                            </form>
                            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] mt-2">
                                <svg aria-label="Google logo" width="16" height="16"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g>
                                        <path d="m0 0H512V512H0" fill="#fff"></path>
                                        <path fill="#34a853"
                                            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                        <path fill="#4285f4"
                                            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73">
                                        </path><path fill="#ea4335"
                                            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55">
                                        </path></g></svg>
                                Signup with Google
                            </button>
                            <div className='mt-2'>
                                        Already have an account? <Link to='/login' className="link link-hover text-primary">Login Now.</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;