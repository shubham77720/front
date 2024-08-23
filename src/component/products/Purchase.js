import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../usecontext/DataContext';
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default  function Purchase (params) {

    const { fetchSinglePurchase} = useContext(DataContext);

      const apiKey = "https://backenddata77720.onrender.com"
 
    const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [totalOrder, settotalOrder] = useState("");
const [hasMore, setHasMore] = useState(true);
useEffect(() => {
    fetchpurchase(currentPage)
}, []);



const Previous = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
  
        //console.log(newPage)
        fetchpurchase(newPage);
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
        fetchpurchase(newPage);
        return newPage;
      });
    }
  };
  const numclick = (number) => {
     
    if (hasMore) {
      setCurrentPage((prevPage) => {
        const newPage = number
        //console.log(newPage)
        fetchpurchase(newPage);
        return newPage;
      });
    }
  };
  

 



const fetchpurchase = async (page) => {
    //console.log(page, "this is my fetching page");
  let token = localStorage.getItem("token")
    try {
      const response = await axios.get(`${apiKey}/api/purchase/fetchpurchase/${page}`,{method: 'GET',
        headers:{
             
            'authtoken': token
        },
       });
      settotalOrder(response.data.totalCount)
  
      if (response.data.purchase.length === 0) {
        setHasMore(false); // No more data to load
        setData(response.data);
  
       } else {
        // setData(prevData => ({
        //   ...prevData,
        //   orders: [...prevData.orders, ...response.data.orders]
        // }));
        
         setData(response.data);
        setHasMore(true); 
       }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
//console.log(data.purchase)
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


    return(
        <>
        <div className=" ">
        
         <div className="  mt-4 lg:w-full w-[1000px] ">
            <div className="bg-[#464646] flex   text-white mb-2  px-2 items-center justify-between">
                <div className=" border-white  px-3 py-1  w-[160px] ">Bill Date</div>
                <div className=" border-l-[1px]  border-white w-[120px]  px-3 py-1 ">Bill No</div>
                <div className=" border-white border-l-[1px] px-3 py-1  w-[160px] ">supplier</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">Amount</div>
                  
                 
            </div> 
 
            {data?.purchase?.map((person) => {
                 

                let total = 0
                person?.name.forEach(purchase => {
                  total += purchase.amount;
                  //console.log(purchase.amount);
                });

                const date = new Date(person?.billdate);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit', };
            let newdate = date.toLocaleDateString('en-IN', options);
            newdate = newdate.split('/').join('-');
                return( 
                    <Link key={person._id} onClick={()=>{fetchSinglePurchase(person._id)}} to='../SinglePurchase' className="rounded-full   child cursor-pointer">
                    <div className="bg-[#f2f2f2] flex mt-1  text-black cursor-pointer px-2 justify-between items-center ">
                <div className="  px-3 py-1  w-[160px] ">{newdate}</div>
                <div className=" w-[120px]  px-3 py-1 ">{person?.billno}</div>
                <div className="  px-3 py-1  w-[160px] ">{person?.Supplier} </div>
                <div className=" w-[130px]  px-3 py-1 ">{total}</div>
                   
            </div></Link>)})}
         
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
        </>
    )
}

