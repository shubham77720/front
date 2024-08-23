import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../usecontext/DataContext';
import { useNavigate } from 'react-router-dom';

export default  function Createuser (params) {
  const { updateOrderStatus ,userrole} = useContext(DataContext);
  const apiKey = process.env.REACT_APP_API_KEY;

  const [productdata, setproductdata] = useState({name:"",Email:"",mobile:"",password:""})
  const navigate = useNavigate();
useEffect(() => {
if(userrole?.role == 0){
  navigate("/home/User");
}
}, [userrole])
 

    const adduser = async (id) => {
        try {
const{name,Email,mobile,password}=productdata
           let name1 = name.toString()
           let Email1 = Email.toString()
           let mobile1 = mobile.toString()
           let password1 = password.toString()
            let token = localStorage.getItem('token');
          await axios.post(`${apiKey}/api/auth/createuser`,
            {name :name1,email:Email1,phone:mobile1,password:password1}, // send productdata as the request body
            {
              headers: { "authtoken": token }
            }
          )
          .then((response) =>  setproductdata({name:"",Email:"",mobile:"",password:""}))
          .catch((err) => console.log(err));
        } catch (error) {
          console.error('Error:', error);
        }
      };
    




      const onchange =(e)=>{
        setproductdata({...productdata,[e.target.name]:[e.target.value]})
        //console.log(productdata)
    }
    return(
        <>
        <div className=" ">
        
         <div className="  mt-4 lg:w-full   ">
            
            <div className="bg-[#f2f2f2] grid    md:grid-cols-2 text-black  px-2 gap-6 md:gap-12 items-center ">
                <input type='text' name='name' onChange={onchange} value={productdata.name} placeholder='name' className=" px-3 py-1 border-black border-[2px] rounded-md"/>
                <input type='text' name='Email' onChange={onchange} value={productdata.Email} placeholder='Email' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                <input type='text' name='mobile' onChange={onchange} value={productdata.mobile} placeholder='mobile' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                <input type='text' name='password' onChange={onchange} value={productdata.password} placeholder='password' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                   
            </div>
        <div className='flex justify-center mt-5 w-full'>
        <button 
        onClick={() => adduser()} // Replace 1 with the actual product ID you want to add
        className="bg-blue-500 text-white font-bold py-2 px-4 w-[50%] rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Create User
      </button>        </div>
         </div>
        </div>
        </>
    )
}

