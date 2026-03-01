import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import signupImg from '../../assets/signup.png';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Signup = () => {
  const axiosSecure = useAxiosSecure()
  const { signup, user, loginWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user) => axiosSecure.post('/api/users', user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Registration successful');
      navigate('/');
    },
    onError: (err) => console.error('Mutation Failed :', err)
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const invalidPassErr = `Enter a valid password:
- Must have an Uppercase letter
- Must have a Lowercase letter`;

  const isUserExist = async (email) => {
    const res = await axiosSecure.get(`/api/user/exists/${email}`);
    return res.data.msg;
  };

  const handleRegister = async (data) => {
    const { email } = data;

    const userExists = await isUserExist(email);
    if (userExists) {
      setError('email', { type: 'manual', message: 'User already exists' });
      toast.error('User already exists');
      return;
    }

    // console.log('kk', userExists)
    try {
      await signup(data.email, data.password, data.name, data.photoUrl);
      mutation.mutate(data);
      navigate('/');
    } catch (err) {
      toast.error('Incorrect information');
      return err
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const creds = await loginWithGoogle();
      const { email, displayName: name, photoURL: photoUrl } = creds.user;

      const userExists = await isUserExist(email);
      if (userExists) {
        toast.success('User already exists. Logged in');
        navigate('/');
        return;
      }

      mutation.mutate({ email, name, photoUrl, password: null });
    } catch {
      toast.error('Error occurred while logging in');
    }
  };

  return (
    <div className="md:min-h-[calc(75vh)] lg:min-h-[calc(100vh-90px)] flex flex-col">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary mt-8 mb-6">
        Signup now!
      </h1>

      <div className="lg:flex-1 bg-base-200 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-10">

          {/* Image (desktop only) */}
          <div className="hidden lg:block">
            <img src={signupImg} className="max-w-md" alt="Signup" />
          </div>

          {/* Signup Card */}
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">

                <div>
                  <label className="label">Name</label>
                  <input className="input input-bordered w-full"
                    {...register('name', {
                      required: 'Name is required'
                    })}
                    placeholder="Name"
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="label">Email</label>
                  <input className="input input-bordered w-full"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    placeholder="Email"
                  />
                  {errors.email?.message && (
                    <p className="text-red-600 text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be atleast 6 characters'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                        message: invalidPassErr
                      }
                    })}
                    placeholder="Password"
                  />
                  {errors.password?.message && (
                    <p className="text-red-600 text-sm">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Photo URL</label>
                  <input
                    className="input input-bordered w-full"
                    {...register('photoUrl')}
                    placeholder="abc.jpg"
                  />
                </div>

                <button className="btn btn-primary w-full mt-4">
                  Signup
                </button>
              </form>

              <button
                onClick={handleGoogleLogin}
                className="btn w-full mt-3 bg-white text-black border"
              >
                Signup with Google
              </button>

              <p className="text-center mt-3 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold">
                  Login now
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
