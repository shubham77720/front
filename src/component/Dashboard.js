import axios from "axios";
import { useEffect, useRef, useState } from "react";




export default  function Dashboard (params) {
   document.body.style.backgroundColor ="#f6f6f6"
 

const [products, setProducts] = useState([]);
const [statedata, setstate] = useState([]);
const [pincode, setpincode] = useState([]);
const [totaldata, settotaldata] = useState({});
 const apiKey = "https:/backenddata77720.onrender.com";
  
const getAuthToken = () => localStorage.getItem("token");

// Set headers for Axios requests
const getHeaders = () => ({
    headers: { 'authtoken': getAuthToken() }
});

useEffect(() => {
    const fetchTopProducts = async () => {
        try {
            const response = await axios.get(`${apiKey}/api/product/top5products`, getHeaders());
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching top products", error);
        }
    };

    const fetchTopStates = async () => {
        try {
            const response = await axios.get(`${apiKey}/api/order/top5states`, getHeaders());
            setstate(response.data);
        } catch (error) {
            console.error("Error fetching top states", error);
        }
    };

    const fetchTopPincode = async () => {
        try {
            const response = await axios.get(`${apiKey}/api/order/top5pincode/rto-dto`, getHeaders());
            setpincode(response.data);
        } catch (error) {
            console.error("Error fetching top pincode", error);
        }
    };

    

    
    fetchTopProducts();
    fetchTopStates();
    totalorders();
    fetchTopPincode();
}, []);

const totalorders = async (startDate = "", endDate = "") => {
  try {
    // Define headers including the auth token
    const headers = {
      'authtoken': localStorage.getItem("token")
    };

    // Construct the URL with query parameters
    const response = await axios.get(`${apiKey}/api/order/totalorders`, {
      headers, // Include headers with the auth token
      params: {
        startDate: startDate,
        endDate: endDate
      }
    });

    // Handle the response
    settotaldata(response.data);
   } catch (error) {
    console.error("Error fetching total orders", error);
  }
};


const [dateRange, setDateRange] = useState('Today');
const [showCustomDateInputs, setShowCustomDateInputs] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);
const [customStartDate, setCustomStartDate] = useState('');
const [customEndDate, setCustomEndDate] = useState('');
const dropdownRef = useRef(null);

const handleDateRangeChange = (range) => {
  setDateRange(range);
  setShowCustomDateInputs(range === 'Custom');
  setShowDropdown(false);
  
  // Fetch data based on the selected date range
  const currentDate = new Date();
  let startDate, endDate;

  switch (range) {
    case 'Today':
      startDate = endDate = currentDate.toISOString().split('T')[0];
      break;
    case 'Last7Days':
      startDate = new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString().split('T')[0];
      endDate = new Date().toISOString().split('T')[0];
      break;
    case 'Last30Days':
      startDate = new Date(currentDate.setDate(currentDate.getDate() - 30)).toISOString().split('T')[0];
      endDate = new Date().toISOString().split('T')[0];
      break;
    default:
      startDate = endDate = '';
  }
  
   // Fetch data based on the date range here
  totalorders(startDate,endDate)
};

const handleCustomDateChange = () => {
  setDateRange('Custom');
  setShowDropdown(false);
  setShowCustomDateInputs(false);

  if (customStartDate && customEndDate) {
     // Fetch data based on the custom date range here
    totalorders(customStartDate,customEndDate)
  } else {
    console.error('Custom dates are not set properly');
  }
};

const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setShowDropdown(false);
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


    return(
        <>
        <div className=" md:w-[85%] lg:w-[90%]  w-[100%] px-[20px] mt-16 pb-8 ">

        
         <div className="flex justify-between text-white  w-[100%]">
            <div className="lg:text-xl text-lg font-bold">Welcome <span className="text-yellow-500 capitalize">{params?.userdata?.name}</span>,</div>
            
         </div>
         <div className="bg-[white] rounded-md mt-2 px-3 py-6">
            
      
         
       
               
                     
          
       
 
  
         </div>
         <div className="space-y-5 pb-3 mt-3">
            <div className="flex gap-3 lg:flex-row flex-col">
            <div className="bg-gradient-to-tl from-green-300 lg:w-[50%] px-5 py-3 via-green-600 text-white rounded-md to-green-500">
      {/* Dropdown Menu for Date Range Selection */}
      <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>Select Date Range</button>
      {showDropdown && (
        <div ref={dropdownRef} className="dropdown gap-5 absolute bg-gray-600 px-2 py-2 rounded-md flex ">
          <div className="flex   flex-col"> 

          <button onClick={() => handleDateRangeChange('Today')}>Today</button>
          <button onClick={() => handleDateRangeChange('Last7Days')}>Last 7 Days</button>
          <button onClick={() => handleDateRangeChange('Last30Days')}>Last 30 Days</button>
          <button onClick={() => handleDateRangeChange('Custom')}>Custom</button>
          </div>
          {showCustomDateInputs && (
            <div className="flex flex-col">
              <input className="text-black"
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <input  className="text-black"
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
              <button onClick={handleCustomDateChange}>Apply Custom Dates</button>
            </div>
          )}
        </div>
      )}
    </div>
      {/* Sales Data Section */}
      <div className="flex flex-col space-y-4 mt-6">
        <div className="flex justify-center w-[100%]">
          <div className="font-bold text-xl">Sales</div>
        </div>

        <div className="mt-3 space-y-2 lg:space-y-0">
          <div className="flex justify-between w-[100%]">
            <div className="w-[33%]">Total Sales</div>
            <div className="w-[40%] text-center">{totaldata?.totalOrders}</div>
            <div className="w-[26%] text-center">₹ {totaldata?.totalAmount}</div>
          </div>

          <div className="flex justify-between w-[100%]">
            <div className="w-[33%]">Cancel</div>
            <div className="w-[40%] text-center">{totaldata?.totalCancelCount}</div>
            <div className="w-[26%] text-center">₹ {totaldata?.totalCancelamount}</div>
          </div>

          <div className="flex justify-between w-[100%]">
            <div className="w-[33%]">Net Proceed</div>
            <div className="w-[40%] text-center">{totaldata?.netproced}</div>
            <div className="w-[26%] text-center">₹ {totaldata?.netprocedamount}</div>
          </div>

          <div className="flex justify-between w-[100%]">
            <div className="w-[33%]">Return</div>
            <div className="w-[40%] text-center">{totaldata?.totalretrunCount}</div>
            <div className="w-[26%] text-center">₹ {totaldata?.totalreturnamount}</div>
          </div>

          <div className="flex justify-between w-[100%]">
            <div className="w-[33%]">Net Sale</div>
            <div className="w-[40%] text-center">{totaldata?.netsale}</div>
            <div className="w-[26%] text-center">₹ {totaldata?.netsaleamount}</div>
          </div>
        </div>
      </div>
    </div>
                 
                 <div className="lg:w-[50%]   ">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-semibold">Shipment Details</div>
                 </div>
                <div className="flex justify-between flex-wrap  ">
                    <div className="w-[32%] bg-white mt-2 rounded-md border-b-[14px] py-2 border-gray-300  "> 
                    <div className="flex justify-center items-center gap-1  w-[100%]">
                 <div className="font-bold text-xl">{totaldata?.Unshipped}</div>   
                 <div className="text-gray-500 font-medium text-sm ">({((totaldata?.Unshipped / totaldata?.totalOrder) * 100).toFixed(1)})%</div>
                    </div>
                    <div className="flex justify-center items-center gap-2  w-[100%]">
                 <div className="font-normal text-sm">Unshipped</div>   
                     </div>
                     </div>

                   
                    <div className="w-[32%] bg-white mt-2 rounded-md border-b-[14px] py-2 border-red-300  "> 
                    <div className="flex justify-center items-center gap-1  w-[100%]">
                 <div className="font-bold text-xl">{totaldata?.InTransit}</div>   
                 <div className="text-gray-500 font-medium text-sm ">({((totaldata?.InTransit / totaldata?.totalOrder) * 100).toFixed(1)})%</div>
                    </div>
                    <div className="flex justify-center items-center gap-2  w-[100%]">
                 <div className="font-normal text-sm">In-Transit</div>   
                     </div>
                     </div>


                     <div className="w-[32%] bg-white mt-2 rounded-md border-b-[14px] py-2 border-red-500  "> 
                    <div className="flex justify-center items-center gap-1  w-[100%]">
                 <div className="font-bold text-xl">{totaldata?.OFD}</div>   
                 <div className="text-gray-500 font-medium text-sm ">({((totaldata?.OFD / totaldata?.totalOrder) * 100).toFixed(1)})%</div>
                    </div>
                    <div className="flex justify-center items-center gap-2  w-[100%]">
                 <div className="font-normal text-sm">OFD</div>   
                     </div>
                     </div>
                    <div className="w-[32%] bg-white mt-2 rounded-md border-b-[14px] py-2 border-green-300  "> 
                    <div className="flex justify-center items-center gap-1  w-[100%]">
                 <div className="font-bold text-xl">{totaldata?.Delivered}</div>   
                 <div className="text-gray-500 font-medium text-sm ">({((totaldata?.Delivered / totaldata?.totalOrder) * 100).toFixed(1)})%</div>
                    </div>
                    <div className="flex justify-center items-center gap-2  w-[100%]">
                 <div className="font-normal text-sm">Delivered</div>   
                     </div>
                     </div>
                    
                  
                    <div className="w-[32%] bg-white mt-2 rounded-md border-b-[14px] py-2 border-yellow-500  "> 
                    <div className="flex justify-center items-center gap-1  w-[100%]">
                 <div className="font-bold text-xl">{totaldata?.RTO}</div>   
                 <div className="text-gray-500 font-medium text-sm ">({((totaldata?.RTO / totaldata?.totalOrder) * 100).toFixed(1)})%</div>
                    </div>
                    <div className="flex justify-center items-center gap-2  w-[100%]">
                 <div className="font-normal text-sm">RTO</div>   
                     </div>
                     </div>
                    <div className="w-[32%] bg-white mt-2 rounded-md border-b-[14px] py-2 border-green-500  "> 
                    <div className="flex justify-center items-center gap-1  w-[100%]">
                 <div className="font-bold text-xl">{totaldata?.DTO}</div>   
                 <div className="text-gray-500 font-medium text-sm ">({((totaldata?.DTO / totaldata?.totalOrder) * 100).toFixed(1)})%</div>
                    </div>
                    <div className="flex justify-center items-center gap-2  w-[100%]">
                 <div className="font-normal text-sm">DTO</div>   
                     </div>
                     </div>
                     
                    
                    
                    
                </div>
              </div>
            </div>
            <div >
            <div className="flex  lg:justify-between lg:gap-0 gap-2 justify-center flex-wrap ">

              <div className="bg-white shadow-xl rounded-md  py-2 w-[49%] lg:w-[33%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm text-[13px] border-b-[1px]">Top 5 Performing States</div>
               </div>
               <div className="px-3 space-y-3">
               <div className="    md:text-[14px] text-[12px] flex justify-between" >
            <div>State</div>
              <div>totalorders  </div>
               
           </div>
               {statedata?.map(product => (
          <div className="flex  md:text-[14px] text-[12px] justify-between" key={product._id}>
            <div>{product._id}</div>
              <div>{product.totalOrders  }</div>
               
           </div>
        ))}
               </div>
              </div>
              
              <div className="bg-white shadow-xl rounded-md  py-2 w-[49%] lg:w-[33%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm text-[13px]  border-b-[1px]">Top 5 Products</div>
               </div>
               <div className="px-3 space-y-3">
               <div className="flex  md:text-[14px] text-[12px] justify-between" >
            <div>productname</div>
              <div>totalsale  </div>
              <div>instock</div>
           </div>
               {products?.map(product => (
          <div className="flex    md:text-[14px] text-[12px] justify-between" key={product._id}>
            <div>{product.name}</div>
              <div>{product.totalsale  }</div>
              <div>{(product.purchasestock)-(product.instock)}</div>
           </div>
        ))}
               </div>
              
              </div>
              
              <div className="bg-white shadow-xl rounded-md w-[100%]  py-2 md:w-[49%] lg:w-[33%]">
               <div>
                  <div className="border-gray-300 px-3 py-2 font-semibold md:text-sm text-[13px]  border-b-[1px]">Top pincode (RTO/DTO)</div>
               </div>
               <div className=" w-[100%] flex">
               <div className="px-3  w-[50%]    border-r-[1px] border-gray-500 space-y-1">
                  <div className="flex justify-center">
                     <div>DTO</div>
                  </div>
               <div className="flex justify-between" >
            <div>Pincode</div>
              <div>Total DTO</div>
               
           </div>
               {pincode?.top5DTOpincode?.map(product => (
          <div className="flex justify-between" key={product._id}>
            <div>{product._id}</div>
              <div>{product.totalDTO  }</div>
               
           </div>
        ))}
               </div>
               <div className="px-3 w-[50%] space-y-1">
               <div className="flex justify-center">
                     <div>RTO</div>
                  </div>
               <div className="flex justify-between" >
            <div>Pincode</div>
              <div>Total RTO</div>
               
           </div>
               {pincode?.top5RTOpincode?.map(product => (
          <div className="flex justify-between" key={product._id}>
            <div>{product._id}</div>
            
              <div>{product.totalRTO}</div>
               
           </div>
        ))}
               </div>
              </div>
              </div>
              
              
              </div>
            </div>
         </div>
        </div>
        </>
    )
}

