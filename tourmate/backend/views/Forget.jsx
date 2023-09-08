// import { useRef, useState, useEffect } from 'react';
// import useAuth from '../../frontend/src/hooks/useAuth';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import useInput from '../../frontend/src/hooks/useInput';
// import useToggle from '../../frontend/src/hooks/useToggle';
// import React from 'react';
// import logo from '../../frontend/src/image/1.png';
// import back from '../../frontend/src/assert/back.jpg'
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from '../../frontend/src/api/axios';


// const Forget_URL = '/forget';

// function Forget() {
//     //const { setAuth } = useAuth();
//     console.log("logn jsx")
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

   
//     const { auth,setAuth } = useAuth();
  
//     const [pwd, setPwd] = useState('');

//     const [showPassword, setShowPassword] = useState(false);

    

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//           console.log("response");
//             const response = await axios.post(LOGIN_URL,
//                 JSON.stringify({ user, pwd }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             const accessToken = response?.data?.accessToken;
//             const roles = response?.data?.roles;
//             setAuth({ user, roles, accessToken });
//             resetUser();
          
//             setPwd('');
//             console.log(accessToken);
//             const isRolesEqual = roles.includes(5150);

// toast.success("Login successfully");
//             //console.log(roles)
//             if (roles.includes(5150)) {
//                 navigate("/admin/getDep", { replace: true }); // Navigate to admin path
//             } else if (roles.includes(1984)) {
//                 navigate("/ag/dashboard", { replace: true }); // Navigate to ag path
//             } else {
//                 navigate("/employee/employeeform", { replace: true }); // Navigate to original path
//             }
//         } catch (err) {
//             if (!err?.response) {
//                 toast.error('No Server Response');
//             } else if (err.response?.status === 400) {
//               toast.error('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//               toast.error('Invalid Credentials');
//             } else {
//               toast.error('Login Failed');
//             }
//           //  errRef.current.focus();
//         }
//     }


   


//     const handlePasswordChange = (e) => {
//       setPwd(e.target.value);
//     };
  
//     const togglePasswordVisibility = () => {
//       setShowPassword((prevState) => !prevState);
//     };
//     return (
//       <section>
//         <div
//           className="flex items-center justify-center h-screen  bg-teal-900"
          
//         >
         
//             <div
//               className="absolute left-0 top-0 w-[700px] h-[700px] bg-no-repeat opacity-20 rounded-[65px]"
//               style={{
//                 backgroundImage: `url(${logo})`,
//                 backgroundSize: "cover",
//               }}
//             ></div>
//             <div className="relative flex flex-col items-center justify-center h-full  ">
//               <h1 className="text-white text-4xl font-bold mb-10">New Password</h1>
//               <form
//                 className="flex flex-col items-center "
//                 onSubmit={handleSubmit}
//               >
                
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"} // Update input type based on showPassword state
//                     placeholder="Password"
//                     className="w-72 h-12 px-4 mb-8 rounded pr-10" // Added pr-10 to reserve space for the icon
//                     value={pwd}
//                     onChange={handlePasswordChange}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="absolute right-3 top-1/2 transform -translate-y-2/3 text-gray-500 flex items-center justify-center h-full focus:outline-none"
//                     style={{ transformOrigin: "center" }} // Center icon vertically
//                   >
//                     {showPassword ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 4.586l-6.707-6.707-1.414 1.414L8.586 10l-6.707 6.707 1.414 1.414L10 13.414l6.707 6.707 1.414-1.414L11.414 10l6.707-6.707-1.414-1.414L10 4.586zM5.293 13L10 17.707l4.707-4.707L15.293 13 10 18.293 4.707 13 5.293 13zm0-6l4.707 4.707-1.414 1.414L4.879 8l4.707-4.707 1.414 1.414L5.293 7zm7.414-3.707L10 2.293l1.293 1.293L12.707 4.5l-2-2zM13 6.707l1.707-1.707 1.414 1.414L14.5 8l2 2-1.414 1.414L13 9.293l-2 2-1.414-1.414L11.5 8l-2-2L8.293 4.293 10 2.586 13 5.586zm3.707 7.414L17.707 13l-4.707 4.707-1.414-1.414L16.5 13l-4.707-4.707 1.414-1.414L18.707 12l-1.707 1.707z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M7.86 5.14A4 4 0 0110 6c1.418 0 2.824.567 3.868 1.645a1 1 0 101.732-.993A6 6 0 0010 4a6 6 0 00-6 6c0 1.418.567 2.824 1.645 3.868a1 1 0 00.993 1.732A6 6 0 014 10a6 6 0 016-6c.97 0 1.918.231 2.773.667a1 1 0 00.874-1.82A7.963 7.963 0 0010 2a8 8 0 00-8 8c0 2.183.88 4.15 2.31 5.59a1 1 0 101.42-1.42A6.004 6.004 0 014 18a6 6 0 01-6-6c0-1.183.34-2.32.985-3.29a1 1 0 10-1.83-.88A7.963 7.963 0 000 10a8 8 0 008 8c3.453 0 6.39-2.177 7.536-5.218a1 1 0 10-1.85-.765A6.02 6.02 0 0114 14a6 6 0 01-3.532-1.146a1 1 0 00-.768-.106l-.105.046z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 <button className="w-32 h-10 bg-[#E65F2B] text-white font-bold rounded">
//                   Submit
//                 </button>
               
               
//               </form>
             
//             </div>
//           </div>
       
//       </section>
//     );
// }

// export default Forget;
