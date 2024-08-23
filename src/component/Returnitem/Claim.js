import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";
import DataContext from "../usecontext/DataContext";

export default  function Claim (params) {

   const apiKey = "https://backenddata77720.onrender.com"
 

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const { updateOrderStatus ,setexceldata,setsingleorderid} = useContext(DataContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrder, settotalOrder] = useState("");
   const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
   useEffect(() => {
    Fetchproduct(currentPage);
    // fetchcourier();
  }, [ ]);



  const Previous = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;

        //console.log(newPage)
        Fetchproduct(newPage);
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
        Fetchproduct(newPage);
        return newPage;
      });
    }
  };
  const numclick = (number) => {
     
    if (hasMore) {
      setCurrentPage((prevPage) => {
        const newPage = number
        //console.log(newPage)
        Fetchproduct(newPage);
        return newPage;
      });
    }
  };

   
  const Fetchproduct = async (page) => {
    //console.log(page, "this is my fetching page");
  let token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${apiKey}/api/order/fetchallordersforadmin/Claim/${page}`,{method: 'GET',
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
        
         <div className="  mt-4 w-[2050px] h-[510px] ">
            <div className="bg-[#464646] flex sticky top-3 z-20  text-white mb-2  px-2 items-center ">
                <div className=" border-white  px-3 py-1  w-[160px] ">Platform</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Bill NO</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">Order Id</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Product</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">Quntity</div>
                <div className="border-l-[1px] border-white w-[150px]  px-3 py-1 ">Amount</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">State</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Courier</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Tracking Id</div>
                 <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">LR no.</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Return Status</div>
                <div className="border-l-[1px] border-white w-[200px]  px-3 py-1 ">Claim Required</div>
                <div className="border-l-[1px] border-white w-[200px]  px-3 py-1 ">Claim Applied</div>
                <div className="border-l-[1px] border-white w-[200px]  px-3 py-1 ">Claim Status</div>
                <div className="border-l-[1px] border-white w-[200px]  px-3 py-1 ">Claim Amount</div>
                <div className="border-l-[1px] border-white w-[200px]  px-3 py-1 ">Claim Date</div>
                  
            </div>
            {data?.orders?.map((person) => {
  const bdate = new Date(person.claimdate);
  const boptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
 let claimdate = bdate.toLocaleDateString('en-IN', boptions);
 claimdate = claimdate.split('/').join('-');
         
 return (
            <div  key={person._id} className="bg-[#f2f2f2] flex   text-black  px-2  items-center ">
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className="px-3 py-1 overflow-x-auto w-[160px] ">{person.Platform?.name} </Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className="px-3 py-1 overflow-x-auto w-[160px] ">{person.Platform?.name} </Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto  px-3 py-1 ">{person.Billno}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[130px] overflow-x-auto  px-3 py-1 ">{person.OrderId}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto  px-3 py-1 ">{person.Product}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[130px] overflow-x-auto  px-3 py-1 ">{person.Quntity}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[150px] overflow-x-auto  px-3 py-1 ">{person.Salesamount}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto  px-3 py-1 ">{person.State}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto  px-3 py-1 ">{person.courier}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[180px] overflow-x-auto  px-3 py-1 ">{person.trackingnumber}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto  px-3 py-1 ">{person.Lrno}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className="w-[180px] overflow-x-auto  px-3 py-1 ">{person.refundCondition}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[200px] overflow-x-auto  px-3 py-1 ">{person.claimrequired}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[200px] overflow-x-auto  px-3 py-1 ">{person.claimapplied}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[200px] overflow-x-auto  px-3 py-1 ">{person.claimstatus}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[200px] overflow-x-auto  px-3 py-1 ">{person.claimamount}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[200px] overflow-x-auto  px-3 py-1 ">{claimdate}</Link>
             </div>)})}
        
         </div>
         <div className="    absolute md:w-[80%]  lg:w-[85%]   w-[90%] mt-10    ">
        <div className="text-white w-[100%] pb-5 flex gap-10 justify-center ">
          {currentPage !== 1 ?<button   onClick={()=>{Previous()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>:
          <button disabled  onClick={()=>{Previous()}} className="bg-blue-400   w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>}
<div className="text-black border-black border-[1px] px-2 rounded-md">{currentPage}</div>
         { currentPage !== Math.ceil(totalOrder/10)  && totalOrder !== 0 ?  <button onClick={()=>{Next()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2">Next<FaArrowAltCircleRight /></div> </button>:
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

