import axios from 'axios';
import { useState } from 'react';

export default  function Createsupplier (params) {
<<<<<<< HEAD
  const apiKey = "https:/backenddata77720.onrender.com";
=======
  const apiKey = "https://backenddata77720.onrender.com"
>>>>>>> 706b6992e25965e3bf1b9cd68d6a285071e5dfc8


    const [productdata, setproductdata] = useState({name:"",GSTIN:"",mobile:"",addresh:"",Cost:""})

 

    const addsupplier = async (id) => {
        try {
const{name,GSTIN,mobile,addresh}=productdata
           let name1 = name.toString()
           let GSTIN1 = GSTIN.toString()
           let mobile1 = mobile.toString()
           let addresh1 = addresh.toString()
            let token = localStorage.getItem('token');
          await axios.post(
            `${apiKey}/api/supplier/addsupplier`,
            {name :name1,GSTIN:GSTIN1,mobile:mobile1,addresh:addresh1}, // send productdata as the request body
            {
              headers: { "authtoken": token }
            }
          )
          .then((response) => console.log(response.data))
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
                <input type='text' name='name' onChange={onchange} value={productdata.name} placeholder='supplier name' className=" px-3 py-1 border-black border-[2px] rounded-md"/>
                <input type='text' name='GSTIN' onChange={onchange} value={productdata.GSTIN} placeholder='GSTIN' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                <input type='text' name='mobile' onChange={onchange} value={productdata.mobile} placeholder='mobile' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                <input type='text' name='addresh' onChange={onchange} value={productdata.addresh} placeholder='addresh' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                   
            </div>
        <div className='flex justify-center mt-5 w-full'>
        <button 
        onClick={() => addsupplier()} // Replace 1 with the actual product ID you want to add
        className="bg-blue-500 text-white font-bold py-2 px-4 w-[50%] rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Supplier
      </button>        </div>
         </div>
        </div>
        </>
    )
}

