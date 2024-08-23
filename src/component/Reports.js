import axios from "axios";
import { useEffect, useState } from "react";

import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Link } from "react-router-dom";

export default  function Reports (params) {

  document.body.style.backgroundColor ="#f6f6f6"
   const apiKey = "https:/backenddata77720.onrender.com";
  
  const [data, setData] = useState([]);
  const [statedata, setStateData] = useState([]);
  const [coustmerdetail, setCoustmerDetail] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');

  useEffect(() => {
    fetchcourier();
    fetchstate();
    fetchfromplatform()
    fetchcoustmerdetail();
  }, []);

 
  const fetchcourier = () => {
    axios.get(`${apiKey}/api/Platform/fetchallPlatform`, {
      headers: { 'authtoken': localStorage.getItem("token") }
    })
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  
  const fetchstate = () => {
    axios.get(`${apiKey}/api/order/fetchallstatedetail`, {
      headers: { 'authtoken': localStorage.getItem("token") }
    })
      .then(response => {
        setLoading(false);
        setStateData(response?.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  
  const fetchcoustmerdetail = () => {
    axios.get(`${apiKey}/api/order/customerdetail/1`, {
      headers: { 'authtoken': localStorage.getItem("token") }
    })
      .then(response => {
        setLoading(false);
        setCoustmerDetail(response?.data?.customerDetail.slice(0, 5));
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  
  const fetchfromplatform = () => {
    axios.get(`${apiKey}/api/platform/fetchallPlatformdetail`, {
      headers: { 'authtoken': localStorage.getItem("token") }
    })
      .then(response => {
        setLoading(false);
        setPlatform(response?.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  
  
  const handleChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };
 
    return(
        <>
        <div className=" md:w-[85%] lg:w-[90%]  w-[100%] px-[20px] mt-16 pb-8 ">
         <div className="flex justify-between text-white  w-[100%]">
            <div className="lg:text-xl text-lg font-bold">Reports</div>
            
         </div>
         <div className="bg-[white] rounded-md mt-2 px-3 py-6">

         </div>
         <div className="space-y-5 pb-3 mt-3">
            
            <div >
            <div className="flex justify-between ">

              
              <div className="bg-white shadow-2xl rounded-md overflow-y-scroll  h-[400px] py-2 w-[49%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm flex justify-between text-[13px]  border-b-[1px]">
                  <div className="flex gap-2">
                    <div>Sales Reports platform</div>  
         
     </div>
                   </div>
                </div>  
               <div className="px-3 flex mt-2 mb-6  ">
               <div className="text-[14px] text-center  w-[20%] ">Platform</div>
               <div className="text-[14px] text-center w-[20%]">Sale</div>
               <div className="text-[14px] text-center  w-[20%] ">RTO</div>
               <div className="text-[14px] text-center  w-[20%]">DTO</div>
               <div className="text-[14px] text-center  w-[20%]">Refund</div>
                </div>
               <div className="px-3 flex mt-2 mb-2  ">
               <div className="text-[14px] text-center  w-[20%] ">Platform</div>
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>Total</div>
                <div>Amount</div>
               </div>
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>Total</div>
                <div>Amount</div>
               </div>          
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>Total</div>
                <div>Amount</div>
               </div>
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>Total</div>
                <div>Amount</div>
               </div>
                </div>
                {platform?.map((person) => {
         return (
               <div key={person._id} className="px-3 flex mt-2   ">
                
               <div className="text-[14px] text-center  w-[20%] "> {person._id}</div>
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>{person.totalSalesQ}</div>
                <div>{person.totalSales} </div>
               </div>
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>{person.totalRTOQ}</div>
                <div>{person.totalRTO}</div>
               </div>
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>{person.totalDTOQ}</div>
                <div>{person.totalDTO}</div>
               </div>
               <div className="text-[12px] flex justify-around    text-center w-[20%]">
                <div>{person.totalrefundQ}</div>
                <div>{person.totalrefund}</div>
               </div>
                 </div>)})}
              </div>
              <div className="bg-white shadow-2xl overflow-scroll rounded-md px-2 h-[400px] py-2 w-[49%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm flex justify-between text-[13px]  border-b-[1px]">
                  <div className="flex gap-2">
                    <div>Sales Reports States</div>  
                    
     </div>
                   
                  </div>
                </div>
               

               
               {statedata?.map((state) => (
  <div key={state._id} className=" flex items-center">
    <div className="w-[280px]">{state._id}</div>  
    {state.platforms.map((platform, index) => (
      <div key={index} className="platform-item mt-2 text-[13px] text-center  ]">
        <p className="font-semibold">Platform:  {platform.Platform}</p>
        <div className="flex">
        <div className="flex">

        <div className="w-[100px]"><div>Total Sales:</div> <div> {platform.totalSales}</div></div>
        <div className="w-[150px]"><div>Total Sales Quantity:</div> <div> {platform.totalSalesQ}</div></div>
         </div>
        <div className="flex">
        <div className="w-[150px]"><div>Total Refund:</div> <div> {platform.totalrefund}</div></div>
        <div className="w-[150px]"><div>Refund Quantity:</div> <div> {platform.totalrefundQ}</div></div>
       </div>
      </div>
      </div>
    ))}
  </div>
))}
              </div>
              
             
              
              </div>
            <div className="flex justify-between mt-5 ">

              
              
            <div className="bg-white shadow-2xl rounded-md  py-2 w-[47%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm flex justify-between text-[13px]  border-b-[1px]">
                  <div className="flex gap-2">
                    <div>customer details</div>  
      
     </div>
                  <Link to= "/home/CustomerDetail" className="text-blue-500 cursor-pointer">View All</Link>
                  </div>
                </div>
               <div className="px-3 flex mt-2  ">
               <div className="text-[14px] font-semibold text-center w-[33%]">address</div>
               <div className="text-[14px] font-semibold text-center  w-[33%] ">Pincode</div>
               <div className="text-[14px] font-semibold text-center  w-[33%]">mobile no.</div>
               </div>
               {coustmerdetail?.map((person) => {
        
         
        return (
               <div key={person._id} className="px-3 flex mt-1 ">
               <div className="text-[13px] text-center w-[33%]">{person.Address.substring(0, 15)}</div>
               <div className="text-[13px] text-center  w-[33%] ">{person.Pincode}</div>
               <div className="text-[13px] text-center  w-[33%]">{person.MobNo}</div>
               </div>)})}
              </div>
              <div className="bg-white shadow-2xl rounded-md  py-2 w-[47%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm flex justify-between text-[13px]  border-b-[1px]">
                  <div className="flex gap-2">
                  <div>Returns RTO/DTO</div> 
          
     </div>
                  <div className="text-blue-500 cursor-pointer">View All</div>
                  </div>
                </div>
               <div className="px-3 flex mt-2 ">
               <div className="text-[13px] text-center w-[15%]">Name</div>
               <div className="text-[13px] text-center  w-[15%] ">Price</div>
               <div className="text-[13px] text-center  w-[20%]">Sale amount</div>
               <div className="text-[13px] text-center  w-[15%]">Quntity</div>
               <div className="text-[13px] text-center  w-[15%] ">Cost</div>
               <div className="text-[13px] text-center  w-[20%] ">Catogory</div>
               </div>
              </div>
              
              </div>
            </div>



            <div className="flex flex-col md:flex-row p-4 bg-gray-100 rounded-lg shadow-lg">
      <ResizableBox
        className="flex-1 bg-white m-2 rounded p-2"
        width={200}
        height={200}
        minConstraints={[100, 100]}
        maxConstraints={[500, 500]}
      >
        <div style={{ width: '100%', height: '100%' }}>
          Box 1
        </div>
      </ResizableBox>
      
      <ResizableBox
        className="flex-1 bg-white m-2 rounded p-2"
        width={200}
        height={200}
        minConstraints={[100, 100]}
        maxConstraints={[500, 500]}
      >
        <div style={{ width: '100%', height: '100%' }}>
          Box 3
        </div>
      </ResizableBox>
    </div>



            
         </div>
        </div>
        </>
    )
}

