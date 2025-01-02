import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import emailjs from 'emailjs-com'; // Commented out emailjs import

const defaultUsers = [
  {
    username: "admin",
    password: "admin123",
    roles: ["admin"],
    email: "ugtromen@gmail.com",
    userid: 1
  },
  {
    username: "user",
    password: "user123",
    roles: ["user"],
    email: "user@example.com",
    userid: 2
  }
];

const LoginPage = () => {
  const { login, user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    }
  }, [user, navigate, location]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const users = JSON.parse(localStorage.getItem('users')) || defaultUsers;
      const user = users.find(u => u.username === username);

      if (user && user.password === password) {
        const safeUserData = {
          username: user.username,
          role: user.roles[0],
          email: user.email,
          userid: user.userid
        };
        
        login(safeUserData);
        navigate('/');
      } else {
        setErrorMessage('Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Commenting out the sendAuthCode function
  // const sendAuthCode = async (user) => {
  //   const code = Math.floor(100000 + Math.random() * 900000).toString();
  //   localStorage.setItem('authCode', code);
  //   localStorage.setItem('authUserId', user.userid);

  //   await emailjs.send(
  //     "service_zvud0ul",
  //     "template_y2bdy4n",
  //     {
  //       to_email: user.email,
  //       auth_code: code
  //     },
  //     "nFG5XITvMdXsXmRVm"
  //   );
  //   setIs2FA(true);
  //   setShowResend(false);
  //   setResendTimer(30);
  // };

  // Commenting out the handleResendCode function
  // const handleResendCode = async () => {
  //   setIsLoading(true);
  //   setErrorMessage('');
  //   const authUserId = localStorage.getItem('authUserId');
  //   const users = JSON.parse(localStorage.getItem('users')) || [];

  //   if (Array.isArray(users)) {
  //     const user = users.find((user) => user.userid === parseInt(authUserId));

  //     if (user) {
  //       try {
  //         await sendAuthCode(user);
  //         setShowResend(false);
  //       } catch (error) {
  //         setErrorMessage('Error resending code. Please try again.');
  //       }
  //     }
  //   } else {
  //     setErrorMessage('Users data is not an array. Please check localStorage.');
  //   }

  //   setIsLoading(false);
  // };

  // Commenting out the handle2FA function
  // const handle2FA = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setErrorMessage('');

  //   const storedCode = localStorage.getItem('authCode');
  //   const authUserId = parseInt(localStorage.getItem('authUserId'));
  //   console.log('Stored code:', storedCode);
  //   console.log('User ID from localStorage:', authUserId);

  //   if (authCode === storedCode && authUserId) {
  //     localStorage.removeItem('authCode');
  //     localStorage.removeItem('authUserId');

  //     const users = JSON.parse(localStorage.getItem('users')) || [];

  //     if (Array.isArray(users)) {
  //       const user = users.find((user) => user.userid === authUserId);

  //       if (user) {
  //         console.log('User authenticated with 2FA:', user);
  //         login({ username: user.username, role: user.roles[0], email: user.email });
  //         navigate('/');
  //       }
  //     } else {
  //       setErrorMessage('Users data is not an array. Please check localStorage.');
  //     }
  //   } else {
  //     setErrorMessage('Invalid authentication code. Please try again.');
  //   }

  //   setIsLoading(false);
  // };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-16 -translate-y-16 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-100 rounded-full translate-x-16 translate-y-16 mix-blend-multiply"></div>
        
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">
              Enter your credentials to login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium text-lg shadow-lg"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center animate-fade-in">
              {errorMessage}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Protected by two-factor authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
