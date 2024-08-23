import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../usecontext/DataContext";

export default function Userdata(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateOrderStatus ,userrole} = useContext(DataContext);
    const apiKey = "https://backenddata77720.onrender.com"
 
  const navigate = useNavigate();
  useEffect(() => {
  if(userrole?.role == 0){
    navigate("/home/User");
  }
  }, [userrole])
 

useEffect(() => {
    fetchuser()
}, []);

const fetchuser = async () => {
  try {
      // Define the headers including the authtoken
      const headers = {
          'authtoken': localStorage.getItem("token")
      };

      // Make the GET request with headers
      const response = await axios.get(`${apiKey}/api/auth/getalluser`, { headers });
      setLoading(false);
      setData(response.data);
  } catch (error) {
      setError(error);
      setLoading(false);
  }
};


  let changeUserRole = async(id,role)=> {
        
   
    let token = localStorage.getItem('token')
    try {
      
  
   
   if(token){

   
     let data =  await axios.put(`${apiKey}/api/auth/changeuser/${id}`,{role:role},{
       headers:{"authtoken": token}
      }) 

    fetchuser()
    }
     } catch (error) {
      
    }
    };

  //console.log(data?.User)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-4 max-w-[1000px] mx-auto">
     <div className="bg-gray-800 text-white flex flex-wrap md:flex-nowrap justify-between px-4 py-2 mb-2">
      <div className="w-full md:w-[200px] py-1">Name</div>
      <div className="w-full md:w-[250px] border-l border-white py-1">Email</div>
      <div className="w-full md:w-[200px] border-l border-white py-1">Mobile No</div>
      <div className="w-full md:w-[100px] border-l border-white text-center py-1">Actions</div>
      

    
     </div>
  
    {data?.User?.map((person) => (
      <div key={person._id} className="bg-gray-100 flex flex-wrap md:flex-nowrap justify-between px-4 py-2 mb-1 items-center">
        <div className="w-full md:w-[200px] py-1">{person.name}</div>
        <div className="w-full md:w-[250px] py-1">{person.email}</div>
        <div className="w-full md:w-[200px] py-1">{person.phone}</div>
        <div className="w-full md:w-[100px] text-center py-1">
          {person.role === 0 && (
            <button
              onClick={() => changeUserRole(person._id, 5)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Block
            </button>
          )}
          {person.role === 5 && (
            <button
              onClick={() => changeUserRole(person._id, 0)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Unblock
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
  
  );
}
