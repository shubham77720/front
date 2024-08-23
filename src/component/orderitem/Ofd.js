import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { MdEdit ,MdDelete ,MdOutlineSystemSecurityUpdate } from "react-icons/md";
import DataContext from "../usecontext/DataContext";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default  function Ofd (params) {
    const { updateOrderStatus ,setexceldata,setsingleorderid,userrole} = useContext(DataContext);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [id, setid] = useState('');
    const [showpopup, setshowpopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrder, settotalOrder] = useState("");
   const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    let [productdata, setproductdata] = useState({   billno:"", billdate:"", LRNO:"" ,shippingcharges:"" ,Trackingid:"" ,Courier:"",   Deliverybydate:""})
     const apiKey = "https:/backenddata77720.onrender.com";
  
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
     let token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${apiKey}/api/order/fetchallordersforadmin/OFD/${page}`,{method: 'GET',
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


    const [openItemId, setOpenItemId] = useState(null);

    const toggleOpen = (id) => {
      setOpenItemId((prevId) => (prevId === id ? null : id));
    };
 
 let changestatus =(status,iddata)=>{
    setSelectedStatus(status)
    if(status=="Lost"){

        setshowpopup(true)  
    }
    else{
        setshowpopup(false)
    }
    setid(iddata)
  }
  let update =async(status,id)=>{
     await updateOrderStatus(status,id,productdata)
     fetchproduct(currentPage)
    }  

    return(
        <>
        <div className=" ">
         { showpopup && <div className=" flex justify-center ">
        <div className="w-[40%] bg-white shadow-xl shadow-gray-300 z-20 border-[1px] border-gray-300 py-5 my-6 rounded-md  absolute">
          <div onClick={()=>{setshowpopup(false)}} className="rounded-full cursor-pointer w-6 h-6 inline-block  ml-2  text-center justify-self-center border-black border-[1px] ">
          <div className="relative bottom-[7px] text-[20px]">x
            </div>
            </div>
          <div className="flex justify-center py-2">
            <div>Update some info</div>
          </div>
          <div className="grid    md:grid-cols-1 text-black  px-2 gap-2 md:gap-3 items-center">

        
        
               <input type='text' name='Retrunstatus' onChange={onchange} value={productdata.Retrunstatus} placeholder='Retrunstatus' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                 
                </div>       
                <div className="flex justify-center mt-1">
      <button className="text-[16px] bg-blue-600 rounded-full w-[50%] items-center mt-3  text-white px-2 py-[3px]" onClick={()=>{update(selectedStatus,id)}}>Update</button>
    </div> 
</div>
</div>}
         <div className="  mt-3 w-[1300px] h-[510px]">
            <div className="bg-[#464646] flex sticky top-3 z-20  text-white mb-2  px-2 items-center lg: ">
                 <div className="  w-[100px]  px-3 py-1 ">Bill No</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">Order Id</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Product</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Quntity</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Amount</div>
                <div className="border-l-[1px] border-white w-[150px]  px-3 py-1 ">State</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Platform</div>
                <div className="border-l-[1px] border-white w-[200px]  px-3 py-1 ">delivery by date</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">OFD date</div>
                 

            </div>


            {data?.orders?.map((person) => {
 
 const bdate = new Date(person.OFDdate);
 const boptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let OFDdate = bdate.toLocaleDateString('en-IN', boptions);
OFDdate = OFDdate.split('/').join('-');

const Deliverybydate1 = new Date(person.Deliverybydate);
const Deliverybydateoptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let Deliverybydate = Deliverybydate1.toLocaleDateString('en-IN', Deliverybydateoptions);
Deliverybydate = Deliverybydate.split('/').join('-');
 return (
            <div  key={person._id} className="bg-[#f2f2f2] flex   text-black   px-2 items-center ">
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Billno}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[130px] overflow-x-auto px-3 py-1 ">{person.OrderId}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Product}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Quntity}</Link>   
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Salesamount}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[150px] overflow-x-auto px-3 py-1 ">{person.State}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Platform.name}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[200px] overflow-x-auto px-3 py-1 ">{Deliverybydate}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[180px] overflow-x-auto px-3 py-1 ">{OFDdate}</Link>
                
                
                { openItemId === person._id &&<div className=" sticky right-0 flex gap-2     z-10">
          <div className=" top-[-19px]  absolute right-28  bg-white  border-black border-[1px] p-2  ">
      


<div className="opstion  ">
      
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="Delivered"&&'bg-blue-400'}`} onClick={()=>{changestatus("Delivered",person._id)}} value="pending">Delivered</option>
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="RTO"&&'bg-blue-400'}`} onClick={()=>{changestatus("RTO",person._id)}} value="pending">RTO</option>
         <option className={`text-[12px] cursor-pointer ${selectedStatus=="Lost"&&'bg-blue-400'}`} onClick={()=>{changestatus("Lost",person._id)}} value="canceled">Lost</option>
    
    </div>
   {selectedStatus !=="Lost" && <div className="flex justify-center mt-1">
      <button className="text-[10px] bg-blue-600 rounded-full   items-center   text-white px-2  " onClick={()=>{update(selectedStatus,id)}}>Update</button>
    </div> }
    </div>
    </div>}
    <div className=" sticky right-0 flex gap-2  bottom-2 z-10">

<div  
  className="bg-black rounded-full w-6 h-6 flex justify-center items-center  absolute bottom-3 right-16 text-white     text-[16px]  "
  onClick={() => toggleOpen(person._id)}
 >
 <MdOutlineSystemSecurityUpdate  />   
</div>
 
 
</div>
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

