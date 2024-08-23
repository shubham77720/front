

import { MdSpaceDashboard ,MdProductionQuantityLimits,MdDeliveryDining  } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
 import { MdReport } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default  function Courier1 (params) {
   // fetchallcourier
   const [data, setData] = useState([]);
   const [courierdata, setcourierdata] = useState([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const apiKey = "https:/backenddata77720.onrender.com";
  
  useEffect(() => {
      fetchcourier()
      fetchcourierdetail()
  }, []);

   let fetchcourier = ()=>{
    let token = localStorage.getItem('token')

      axios.get(`${apiKey}/api/courier/fetchallcourier`,{
        method: 'GET',
        headers:{
             
            'authtoken': token
        },
    })
      .then(response => {
          setLoading(false);
        setData(response.data);
       })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  
  let fetchcourierdetail = ()=>{
    let token = localStorage.getItem("token")
      axios.get(`${apiKey}/api/courier/fetchallcourierdetail`,{
        method: 'GET',
        headers:{
             
            'authtoken': token
        },
    })
      .then(response => {
          setLoading(false);
          setcourierdata(response.data);
       })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }
   



  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');

  const handleEditClick = (person) => {
    setEditingId(person._id);
    //console.log(person)
    setNewName(person.name); // Pre-fill the input with the current name
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
    //console.log(e.target.value)
  };

  const handleEditSubmit = async (id) => {
    try {    let token = localStorage.getItem("token")

        // Define the headers including the authtoken
        const headers = {
            'authtoken': token
        };

        // Make an API call to update the product
        const response = await axios.put(`${apiKey}/api/courier/updatecourier/${id}`, {
            name: newName,
        }, { headers }); // Add headers here

        // Update the local state if the API call is successful
        if (response.status === 200) {
            setData((prevData) =>
                prevData.map((product) =>
                    product.id === id ? { ...product, name: newName } : product
                )
            );
            setEditingId(null);
            fetchcourier();
            setNewName('');
        } else {
            console.error('Failed to update product:', response.status);
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
};








 let deleteproduct = (id)=>{
  let token = localStorage.getItem("token")
   axios.delete(`${apiKey}/api/courier/deletecourier/${id}`,{
    method: 'DELETE',
    headers:{
         
        'authtoken': token
    },
})

   fetchcourier()
}

let confirm11 =(id)=>{
 if (window.confirm("Do you really want to delete?")) {
  deleteproduct(id)       
  fetchcourier()

    }
   
}



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
   
    return(
        <>
       <div className="  ">
         
      
         <div className="space-y-5 pb-3 mt-3">
            
            <div >
            <div className="flex flex-wrap gap-2 md:gap-1">
      {data?.map((person) => (
        <div
          key={person.id}
          className="bg-gradient-to-tl from-green-300 px-5 flex items-center via-green-600 text-white to-green-500 shadow-xl rounded-md py-2"
        >
          <div>
            {editingId === person._id ? (
              // Edit form
              <div>
                <input
                  type="text"
                  value={newName}
                  onChange={handleInputChange}
                  className="border-gray-300 px-3 py-2 font-semibold md:text-sm text-center text-[16px] border-b-[1px] bg-white text-black rounded-md"
                />
                <button
                  onClick={() => handleEditSubmit(person._id)}
                  className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md"
                >
                  Save
                </button>
              </div>
            ) : (
              // Display name and edit button
              <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm text-center text-[16px] border-b-[1px]">
                {person.name}
                <button
                  onClick={() => handleEditClick(person)}
                  className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-md"
                >
                  Edit
                </button>
              </div>
            )}
            
            
          </div>
          <button
                  onClick={() => confirm11(person._id)}
                  className="ml-2 bg-red-500 hover:bg-red-600 h-8 text-white font-bold py-1 px-2 rounded-md"
                >
                  delete
                </button>
               
        </div>
      ))}
    </div>
              <div className="flex  mt-3 flex-wrap gap-2 md:gap-1  ">
            {courierdata?.map((person) => {
               
         //console.log(person)
         return (
            <>
              { person._id !== null && <div key={person._id}  className="bg-gradient-to-tl from-green-300  px-5   via-green-600  text-white   to-green-500 shadow-xl rounded-md  py-2 w-[48%] md:w-[33%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm text-center text-[16px] border-b-[1px]">{person._id}</div>
               </div>
               <div className="space-y-3 py-4">
              
               <div className="px-3  flex justify-between">
               <div className="font-semibold">Total Shipment</div>
               <div >{person.totalSalesQ
               }</div>
               
               </div>
               <div className="px-3  flex justify-between">
               <div className="font-semibold">Total delivered</div>
              
               <div >{person.totaldeliverdQ}</div>
               
               </div>
               <div className="px-3  flex justify-between">
               <div className="font-semibold">Total Lost</div>
                <div >{person.totalLOSTQ}</div>
               
               </div>
               <div className="px-3  flex justify-between">
                <div className="font-semibold">Total RTO</div>
               <div >{person.totalRTOQ}</div>
               
               </div>
               </div>
              </div>   }         </>
)})}

              
               
             
              
              
              </div>
            </div>
         </div>
        </div>
        </>
    )
}

