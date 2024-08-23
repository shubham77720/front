import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default function CustomerDetail(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrder, settotalOrder] = useState("");
  const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
   const apiKey = "https://backenddata77720.onrender.com"


useEffect(() => {
    fetchuser(currentPage)
}, []);

 

const fetchuser = async (page) => {
  try {
      // Define the headers including the authtoken
      const headers = {
          'authtoken': localStorage.getItem("token")
      };

      // Make the GET request with headers and parameters
      const response = await axios.get(`${apiKey}/api/order/customerdetail/${page}`, { headers });

      settotalOrder(response.data.totalCount);

      if (response.data.customerDetail.length === 0) {
          setHasMore(false); // No more data to load
          setData(response.data);
      } else {
          setData(response.data);
          setHasMore(true);
      }
      setLoading(false);
  } catch (error) {
      setError(error);
      setLoading(false);
  }
};


  
const Previous = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => {
      const newPage = prevPage - 1;

      //console.log(newPage)
      fetchuser(newPage);
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
      fetchuser(newPage);
      return newPage;
    });
  }
};
const numclick = (number) => {
   
  if (hasMore) {
    setCurrentPage((prevPage) => {
      const newPage = number
      //console.log(newPage)
      fetchuser(newPage);
      return newPage;
    });
  }
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

   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (

    <div className="md:w-[85%] lg:w-[90%] w-full px-4 mt-16">
    <div className="flex justify-between text-white w-full mb-4">
      <div className="lg:text-xl text-lg font-semibold">Orders</div>
      <div className="flex lg:space-x-6 lg:text-sm text-xs space-x-4">
        <div className="cursor-pointer hover:text-gray-300 transition">Dashboard</div>
        <div className="cursor-pointer hover:text-gray-300 transition">Reports</div>
        <div className="cursor-pointer hover:text-gray-300 transition">All Shipments</div>
      </div>
    </div>
  
    <div className="mt-4 max-w-[1000px] mx-auto">
      <div className="bg-gray-800 text-white flex justify-between px-4 py-2 mb-2">
         <div className="w-[400px] border-l border-white">Address</div>
        <div className="w-[200px] border-l border-white">Pincode</div>
        <div className="w-[200px] border-l border-white">MobNo</div>
       </div>
       
      {data?.customerDetail?.map((person) => (
         <div key={person._id} className="bg-gray-100 flex justify-between px-4 py-2 mb-1 items-center">
          <div className="w-[400px]">{person.Address}</div>
          <div className="w-[200px]">{person.Pincode}</div>
          <div className="w-[200px]">{person.MobNo}</div>

        </div>
      ))}
    </div>
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
  
   
  );
}
