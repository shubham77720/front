

import { MdSpaceDashboard ,MdProductionQuantityLimits,MdDeliveryDining  } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
 import { MdReport } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "../usecontext/DataContext";

export default  function Platform1 (params) {

   const apiKey = "https:/backenddata77720.onrender.com";
 
 
  const {  platformdata,fetchplatform} = useContext(DataContext);


  //console.log(platformdata)
   // fetchallcourier
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
  
  useEffect(() => {
      fetchplatform()
  }, []);
  
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
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Define the headers including the authtoken
        const headers = {
            'authtoken': token
        };

        // Make an API call to update the platform
        const response = await axios.put(`${apiKey}/api/Platform/updateplatform/${id}`, {
            name: newName,
        }, { headers }); // Add headers here

        // Update the local state if the API call is successful
        if (response.status === 200) {
            setData((prevData) =>
                prevData.map((platform) =>
                    platform.id === id ? { ...platform, name: newName } : platform
                )
            );
            setEditingId(null);
            fetchplatform();
            setNewName('');
        } else {
            console.error('Failed to update platform:', response.status);
        }
    } catch (error) {
        console.error('Error updating platform:', error);
    }
};









 let deleteproduct = (id)=>{
  let token = localStorage.getItem("token")
   axios.delete(`${apiKey}/api/Platform/deleteplatform/${id}`, {method: 'DELETE',
    headers:{
         
        'authtoken': token
    },
   })

   fetchplatform()
}

let confirm11 =(id)=>{
 if (window.confirm("Do you really want to delete?")) {
  deleteproduct(id)       
  fetchplatform()

    }
   
}

   if (error) return <p>Error: {error.message}</p>;
   
    return(
        <>
       <div className="  ">
         
      
         <div className="space-y-5 pb-3 mt-3">
            
            <div >
            <div className="flex flex-wrap gap-2 md:gap-1">
      {platformdata?.map((person) => (
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
            </div>
         </div>
        </div>
        </>
    )
}

