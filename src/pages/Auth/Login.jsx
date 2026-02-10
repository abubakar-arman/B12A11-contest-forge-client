import { Link, useLocation, useNavigate } from 'react-router';
import loginImg from '../../assets/login.png';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import api from '../../config/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const from = location.state?.from || '/';

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user) => api.post('/api/users', user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('New user found! Registered in System.');
      navigate(from);
    },
    onError: (err) => console.error('Mutation Failed :', err)
  });

  const invalidPassErr = `Enter a valid password:
- Must have an Uppercase letter
- Must have a Lowercase letter`;

  const handleEmailLogin = async (data) => {
    try {
      await login(data.email, data.password);
      navigate(from);
    } catch {
      toast.error('Invalid email or password');
    }
  };

  const isUserExist = async (email) => {
    const res = await api.get(`/api/user/exists/${email}`);
    return res.data.msg;
  };

  const handleGoogleLogin = async () => {
    try {
      const creds = await loginWithGoogle();
      const { email, displayName: name, photoURL: photoUrl } = creds.user;

      const userExists = await isUserExist(email);
      if (userExists) {
        toast.success('User already exists. Logged in');
        navigate(from);
        return;
      }

      mutation.mutate({ email, name, photoUrl, password: null });
    } catch {
      toast.error('Error occurred while logging in');
    }
  };

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary mt-8 mb-6">
        Login now!
      </h1>

      <div className="flex-1 bg-base-200 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-10">

          {/* Image (desktop only) */}
          <div className="hidden lg:block">
            <img src={loginImg} className="max-w-md" alt="Login" />
          </div>

          {/* Login Card */}
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <div className="card-body">
              <form
                onSubmit={handleSubmit(handleEmailLogin)}
                className="space-y-4"
              >
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    {...register('email', { required: true })}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">Email is required</p>
                  )}
                </div>

                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    {...register('password', {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    })}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm">{invalidPassErr}</p>
                  )}
                </div>

                <div className="text-right">
                  <Link
                    to="/recover-password"
                    className="text-sm link link-hover"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button className="btn btn-primary w-full">
                  Login
                </button>
              </form>

              <button
                onClick={handleGoogleLogin}
                className="btn w-full mt-3 bg-white text-black border"
              >
                Login with Google
              </button>

              <p className="text-center mt-4 text-sm">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-primary font-semibold">
                  Register now
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
