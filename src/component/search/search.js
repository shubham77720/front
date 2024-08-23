import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

import { MdEdit, MdDelete, MdOutlineSystemSecurityUpdate } from "react-icons/md";
import DataContext from "../usecontext/DataContext";

export default function Searchitems(params) {
  const { updateOrderStatus, setexceldata, setsingleorderid } = useContext(DataContext);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [id, setId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const {  setsearcheddata,searcheddata ,date} = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrder, settotalOrder] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [searchdata, setsearchdata] = useState(true);
  useEffect(() => {
    getOrderMasterSearch( currentPage)
  }, [date,searcheddata]);
<<<<<<< HEAD
  const apiKey = "https:/backenddata77720.onrender.com";
=======
  const apiKey = "https://backenddata77720.onrender.com"
>>>>>>> 706b6992e25965e3bf1b9cd68d6a285071e5dfc8
  const Previous = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
  
        //console.log(newPage)
        getOrderMasterSearch(newPage);
        return newPage;
      });
    }
  };
  
  const Next = () => {
    //console.log(hasMore)
   if( Math.ceil(totalOrder/20)){}
    if (hasMore) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        //console.log(newPage)
        getOrderMasterSearch(newPage);
        return newPage;
      });
    }
  };
  const numclick = (number) => {
     
    if (hasMore) {
      setCurrentPage((prevPage) => {
        const newPage = number
        //console.log(newPage)
        getOrderMasterSearch(newPage);
        return newPage;
      });
    }
  };

  const getOrderMasterSearch = async (page) => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Define the headers including the authtoken
        const headers = {
            'authtoken': token
        };

        // Make a GET request with parameters
        const response = await axios.get(`${apiKey}/api/order/mastersearch/${page}`, {
            headers, // Add headers here
            params: { name: searcheddata, startDate: date.startDate, endDate: date.endDate } // Pass the parameters object
        });

        // Handle the response
        settotalOrder(response.data.totalDocuments);
        if (response.data.results.length === 0) {
            setHasMore(false); // No more data to load
            setsearchdata(response.data.results);
            setexceldata(response.data.results);
            //console.log(response.data);
        } else {
            setexceldata(response.data.results);
            setsearchdata(response.data.results);
            setHasMore(true); 
        }
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
};


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  let [productdata, setProductData] = useState({ billno: "", billdate: "", LRNO: "", shippingcharges: "", Trackingid: "", Courier: "", Deliverybydate: "" });

  const [openItemId, setOpenItemId] = useState(null);

  const toggleOpen = (id) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  const changeStatus = (status, iddata) => {
    setSelectedStatus(status);
    setShowPopup(status === "Lost");
    setId(iddata);
  };

  const update = async (status, id) => {
    await updateOrderStatus(status, id, productdata);
  };


  const range = (start, end, step = 1) => {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  };
  
  
  const totalPages = Math.ceil(totalOrder / 20);
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pageWidth = 50; 
  const scrollLeft = () => {
    if (containerRef.current) {
      const newPosition = scrollPosition - pageWidth;
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current) {
      const newPosition = scrollPosition + pageWidth;
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };  
  

  return (
    <>
      <div className="md:w-[85%] lg:w-[90%] w-full px-5 mt-16">
        <div className="flex justify-between text-white w-full bg-gray-800 p-3 rounded-md shadow-lg mb-4">
          <div className="lg:text-xl text-lg font-semibold">Orders</div>
          <div className="flex lg:space-x-4 lg:text-sm text-xs space-x-2">
            <div>Dashboard</div>
            <div>Reports</div>
            <div>All Shipment</div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="scroll-container pb-3" style={{ overflowX: 'auto' }}>
            {showPopup && (
              <div className="flex justify-center">
                <div className="w-[40%] bg-white shadow-xl border border-gray-300 py-5 my-6 rounded-md relative">
                  <div onClick={() => setShowPopup(false)} className="absolute top-2 right-2 cursor-pointer w-8 h-8 flex items-center justify-center text-lg border border-gray-300 rounded-full">
                    <span>x</span>
                  </div>
                  <div className="flex justify-center py-2 text-lg font-semibold">Update Information</div>
                  <div className="grid grid-cols-1 text-black px-2 gap-2 items-center">
                    <input
                      type='text'
                      name='Retrunstatus'
                      onChange={(e) => setProductData({ ...productdata, Retrunstatus: e.target.value })}
                      value={productdata.Retrunstatus}
                      placeholder='Return Status'
                      className="px-3 py-2 border-gray-300 border rounded-md"
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button className="bg-blue-600 text-white rounded-full w-1/2 py-2" onClick={() => update(selectedStatus, id)}>Update</button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 w-[1200px] h-[600px]">
              <div className="bg-gray-800 flex text-white mb-2 justify-between px-2 items-center text-xs font-semibold rounded-t-md">
                <div className="w-[100px] px-3 py-2">Status</div>
                <div className="border-l border-white w-[130px] px-3 py-2">Order ID</div>
                <div className="border-l border-white w-[120px] px-3 py-2">Product</div>
                <div className="border-l border-white w-[120px] px-3 py-2">Quantity</div>
                <div className="border-l border-white w-[120px] px-3 py-2">Amount</div>
                <div className="border-l border-white w-[150px] px-3 py-2">State</div>
                <div className="border-l border-white w-[180px] px-3 py-2">Platform</div>
              </div>

              {searchdata?.results?.map((person) => (
                <div key={person._id} className="bg-gray-100 flex justify-between text-black px-2 items-center text-sm">
                  <Link onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="w-[100px] px-3 py-2">{person.status}</Link>
                  <Link onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="w-[130px] px-3 py-2">{person.OrderId}</Link>
                  <Link onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="w-[120px] px-3 py-2">{person.Product}</Link>
                  <Link onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="w-[120px] px-3 py-2">{person.Quntity}</Link>
                  <Link onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="w-[120px] px-3 py-2">{person.Salesamount}</Link>
                  <Link onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="w-[150px] px-3 py-2">{person.State}</Link>
                  <Link onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="w-[180px] px-3 py-2">{person.Platform?.name}</Link>

                  {openItemId === person._id && (
                    <div className="relative flex gap-2 z-10">
                      <div className="absolute top-[-2rem] right-0 bg-white border border-gray-300 shadow-lg p-2 rounded-md">
                        <div className="flex flex-col gap-2">
                          <button
                            className={`text-xs px-2 py-1 rounded-md ${selectedStatus === "Delivered" ? 'bg-blue-400' : 'bg-gray-200'}`}
                            onClick={() => changeStatus("Delivered", person._id)}
                          >
                            Delivered
                          </button>
                          <button
                            className={`text-xs px-2 py-1 rounded-md ${selectedStatus === "RTO" ? 'bg-blue-400' : 'bg-gray-200'}`}
                            onClick={() => changeStatus("RTO", person._id)}
                          >
                            RTO
                          </button>
                          <button
                            className={`text-xs px-2 py-1 rounded-md ${selectedStatus === "Lost" ? 'bg-blue-400' : 'bg-gray-200'}`}
                            onClick={() => changeStatus("Lost", person._id)}
                          >
                            Lost
                          </button>
                        </div>
                        {selectedStatus !== "Lost" && (
                          <div className="flex justify-center mt-2">
                            <button
                              className="bg-blue-600 text-white rounded-full px-3 py-1 text-xs"
                              onClick={() => update(selectedStatus, id)}
                            >
                              Update
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .scroll-container::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: white;
            border: 1px #888888 solid;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
          <div className="    absolute md:w-[80%]  lg:w-[85%]   w-[90%] mt-10    ">
        <div className="text-white w-[100%] pb-5 flex gap-10 justify-center ">
          {currentPage !== 1 ?<button   onClick={()=>{Previous()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>:
          <button disabled  onClick={()=>{Previous()}} className="bg-blue-400   w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>}
<div className="text-black border-black border-[1px] px-2 rounded-md">{currentPage}</div>
         { currentPage !== Math.ceil(totalOrder/20)  && totalOrder !== 0 ?  <button onClick={()=>{Next()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2">Next<FaArrowAltCircleRight /></div> </button>:
          <button disabled onClick={()=>{Next()}} className="bg-blue-400   w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2">Next<FaArrowAltCircleRight /></div> </button>}
        </div>
        <div className="w-[100%] pb-5 flex gap-10  justify-center ">
        

        <div className="flex items-center">
      {/* Scroll Left Button */}
      <button
        onClick={scrollLeft}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 mb-2 py-1 rounded-md mr-2"
        disabled={scrollPosition <= 0}
      >
        &lt;
      </button>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="relative overflow-x-auto hide-scrollbar"
        style={{ maxWidth: "150px", whiteSpace: "nowrap" }}
      >
        <div className="flex gap-2">
          {range(1, totalPages+1).map(number => (
            <div onClick={()=>{numclick(number)}}
              key={number}
              className="border-black text-center cursor-pointer border-[1px] px-2"
              style={{ width: pageWidth }}
            >
              {number}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={scrollRight}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 mb-2 rounded-md ml-2"
        disabled={scrollPosition >= (containerRef.current?.scrollWidth - containerRef.current?.clientWidth)}
      >
        &gt;
      </button>
    </div>
        </div>
        </div>
      </div>
    </>
  );
}
