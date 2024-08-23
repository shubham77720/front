import axios from 'axios';
import { useState } from 'react';

export default  function Createcourier (params) {
     const apiKey = "https://backenddata77720.onrender.com"
 

    const [productdata, setproductdata] = useState({name:""})

 

    const addcourier = async (id) => {
        try {
const{name}=productdata
           let name1 = name.toString()
           
           let token = localStorage.getItem('token');
          await axios.post(
            `${apiKey}/api/courier/addcourier`,
            {name :name1}, // send productdata as the request body
            {
              headers: { "authtoken": token }
            }
          )
          .then((response) => console.log("response.data"))
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
            
            <div className="bg-[#f2f2f2]  w-[100%]    text-black  px-2 gap-6     ">
              <div className='bg-red-300 w-[70%] m-auto'>

                <input type='text' name='name' onChange={onchange} value={productdata.name} placeholder='Courier name' className=" px-3 py-1 border-black border-[2px] w-[100%] rounded-md"/>
              
              </div>
                  
            </div>
        <div className='flex justify-center mt-5 w-full'>
        <button 
        onClick={() => addcourier()} // Replace 1 with the actual product ID you want to add
        className="bg-blue-500 text-white font-bold py-2 px-4 w-[50%] rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Courier
      </button>        </div>
         </div>
        </div>
        </>
    )
}

