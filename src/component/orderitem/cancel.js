import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import DataContext from "../usecontext/DataContext";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default  function Cancel (params) {


    const {setexceldata,setsingleorderid} = useContext(DataContext);
     const apiKey = "https:/backenddata77720.onrender.com";
  
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrder, settotalOrder] = useState("");
   const [hasMore, setHasMore] = useState(true); // To track if there are more items to load

   useEffect(() => {
    fetchproduct(currentPage);
   }, [ ]);
  
 

 
  const Previous = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;

        //console.log(newPage)
        fetchproduct(newPage);
        return newPage;
      });
    }
  };

  const Next = () => {
    //console.log(hasMore)
   if( Math.ceil(totalOrder/10)){}
    if (hasMore) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        //console.log(newPage)
        fetchproduct(newPage);
        return newPage;
      });
    }
  };
  const numclick = (number) => {
     
    if (hasMore) {
      setCurrentPage((prevPage) => {
        const newPage = number
        //console.log(newPage)
        fetchproduct(newPage);
        return newPage;
      });
    }
  };

 


    const fetchproduct = async (page) => {
        //console.log(page, "this is my fetching page");
      let token = localStorage.getItem('token')
        try {
          const response = await axios.get(`${apiKey}/api/order/fetchallordersforadmin/Cancel/${page}`,{method: 'GET',
            headers:{
                 
                'authtoken': token
            },
           });
          settotalOrder(response.data.totalOrder)
    
          if (response.data.orders.length === 0) {
            setHasMore(false); // No more data to load
            setData(response.data);
    
           } else {
            // setData(prevData => ({
            //   ...prevData,
            //   orders: [...prevData.orders, ...response.data.orders]
            // }));
            
            await setexceldata(response?.data?.orders);
            setData(response.data);
            setHasMore(true); 
           }
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      const range = (start, end, step = 1) => {
        const result = [];
        for (let i = start; i < end; i += step) {
          result.push(i);
        }
        return result;
      };
      
      
      const totalPages = Math.ceil(totalOrder / 10);
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
      
    return(
        <>
        <div className=" ">
        
         <div className="  mt-3 w-[1300px] h-[510px]">
            <div className="bg-[#464646] flex sticky top-3 z-20  text-white mb-2  px-2 items-center lg: ">
                 <div className="  w-[100px]  px-3 py-1 ">Bill No</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Bill Date</div>
                <div className="border-l-[1px] border-white w-[110px]  px-3 py-1 ">Order Id</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Product</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Quntity</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Amount</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">State</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Platform</div>
                <div className="border-l-[1px] border-white w-[150px]  px-3 py-1 ">Courier</div>
                <div className="border-l-[1px] border-white w-[140px]  px-3 py-1 ">Tracking ID</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">LR NO.</div>

            </div>
            {data?.orders?.map((person) => {
 
 const bdate = new Date(person.Billdate);
 const boptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let Billdate = bdate.toLocaleDateString('en-IN', boptions);
Billdate = Billdate.split('/').join('-');
 return (
            <div  key={person._id} className="bg-[#f2f2f2] flex   text-black   px-2 items-center ">
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Billno}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{Billdate}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[110px] overflow-x-auto px-3 py-1 ">{person.OrderId}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Product}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Quntity}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Salesamount}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.State}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Platform.name}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[150px] overflow-x-auto px-3 py-1 ">{person.courier}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[140px] overflow-x-auto px-3 py-1 ">{person.trackingnumber}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Lrno}</Link>
                
            </div>)})}
            
        
         </div>
         <div className="    absolute md:w-[80%]  lg:w-[85%]   w-[90%] mt-10    ">
        <div className="text-white w-[100%] pb-5 flex gap-10 justify-center ">
          {currentPage !== 1 ?<button   onClick={()=>{Previous()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>:
          <button disabled  onClick={()=>{Previous()}} className="bg-blue-400   w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>}
<div className="text-black border-black border-[1px] px-2 rounded-md">{currentPage}</div>
         { currentPage !== Math.ceil(totalOrder/10) ? <button onClick={()=>{Next()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2">Next<FaArrowAltCircleRight /></div> </button>:
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

