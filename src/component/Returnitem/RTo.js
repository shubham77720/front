import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { MdEdit ,MdDelete ,MdOutlineSystemSecurityUpdate } from "react-icons/md";
import DataContext from "../usecontext/DataContext";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";


export default  function RTO (params) {


    const { updateOrderStatus ,setexceldata,setsingleorderid} = useContext(DataContext);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [id, setid] = useState('');
    const [showpopup, setshowpopup] = useState(false);

    const [loading, setLoading] = useState(true);
    const [returnserial, setreturnserial] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrder, settotalOrder] = useState("");
   const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
    let [productdata, setproductdata] = useState({   billno:"", billdate:"", LRNO:"" ,shippingcharges:"" ,Trackingid:"" ,Courier:"",   Deliverybydate:"",Retrunstatus:"",Condition:""})
     const apiKey = "https:/backenddata77720.onrender.com";
   
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
    
      try {
        // Define headers including the auth token
        const headers = {
          'authtoken': localStorage.getItem("token")
        };
    
        const response = await axios.get(`${apiKey}/api/order/fetchallordersforadmin/RTO/${page}`, { headers });
    
        settotalOrder(response.data.totalOrder);
    
        if (response.data.orders.length === 0) {
          setHasMore(false); // No more data to load
          setData(response.data);
        } else {
          // Update state with the new data
          setexceldata(response?.data?.orders);
          setData(response.data);
          setHasMore(true);
        }
    
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    

    const [openItemId, setOpenItemId] = useState(null);
    const [productids, setproductids] = useState("");

    const toggleOpen = (id) => {
      setOpenItemId((prevId) => (prevId === id ? null : id));
    };
 
 let changestatus =(status,iddata)=>{
    setSelectedStatus(status)
    setreturnserial(iddata.returnserial)
    setproductids(iddata.productdata)
    //console.log(iddata)
        setshowpopup(true)  
   
    setid(iddata._id)
  }
  let update =async(status,id)=>{
    if(serialNumbers){
      matchserialnum(serialNumbers)
    }
    if(productids){
      matchProductIds(productids)
    }
     await updateOrderStatus(status,id,productdata)
     Fetchproduct(currentPage)
    }  

    //serial 

    const [serialNumbers, setSerialNumbers] = useState([]);
    const [newSerial, setNewSerial] = useState('');
  
    // Function to add a new serial number
    const addSerialNumber = () => {
      // Check if the input is in the allowed list and not already in the list
      if (newSerial && returnserial.includes(newSerial) && !serialNumbers.includes(newSerial)) {
        setSerialNumbers(prevSerialNumbers => [
          ...prevSerialNumbers,
          newSerial
        ]);
        setNewSerial(''); // Clear input field
      }
    };
    // Function to remove a serial number
    const removeSerialNumber = (numberToRemove) => {
      setSerialNumbers(prevSerialNumbers =>
        prevSerialNumbers.filter(number => number !== numberToRemove)
      );
    };


    const [selectedProducts, setSelectedProducts] = useState([]);

    // Handle checkbox change
    const handleCheckboxChange = (id) => {
      setSelectedProducts(prevState => {
        if (prevState.includes(id)) {
          // Remove ID if already in the array (unchecked)
          return prevState.filter(productId => productId !== id);
        } else {
          // Add ID if not in the array (checked)
          return [...prevState, id];
        }
      });
    };
 

//select ids for return function
 
async function matchProductIds(productIds) {
  let token =localStorage.getItem('token')
  try {
    const response = await fetch(`${apiKey}/api/order/matchproductids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': token
      },
      body: JSON.stringify({ productIds }), // Sending the product IDs in the request body
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle response data
    //console.log('Response data:', data);
    return data;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

//select serial for return function

async function matchserialnum(serialNumbers) {
  try {
    let token =localStorage.getItem('token')
    const response = await fetch(`${apiKey}/api/order/matchserialnum`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': token
      },
      body: JSON.stringify({ serialNumbers }), // Sending the product IDs in the request body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle response data
    //console.log('Response data:', data);
    return data;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



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

const onchange = (e) => {
  setproductdata({...productdata, [e.target.name]: e.target.value});
};
//console.log(productdata);

    return(
        <>
        <div className=" ">
        { showpopup && selectedStatus == "Received" &&<div className=" flex justify-center ">
        <div className="w-[40%] bg-white shadow-xl shadow-gray-300 z-20 border-[1px] border-gray-300 py-5 my-6 rounded-md  absolute">
          <div onClick={()=>{setshowpopup(false)}} className="rounded-full cursor-pointer w-6 h-6 inline-block  ml-2  text-center justify-self-center border-black border-[1px] ">
          <div className="relative bottom-[7px] text-[20px]">x
            </div>
            </div>
          <div className="flex justify-center py-2">
            <div>Update some info</div>
          </div>
          <div className="grid    md:grid-cols-1 text-black  px-2 gap-2 md:gap-3 items-center">

          <select
name="Retrunstatus"
onChange={onchange}
value={productdata.Retrunstatus}
className="px-3 py-1 border-black border-[2px] rounded-md"
>
<option value="Retrunstatus"  >
Retrunstatus
</option>
 
  <option key={"YES"} value={"YES"}>
  YES  </option>
  <option key="NO" value="NO">
  NO
  </option>
   
 
</select>
        
                <select
name="Condition"
onChange={onchange}
value={productdata.Condition}
className="px-3 py-1 border-black border-[2px] rounded-md"
>
<option value="Condition"  >
Condition
</option>
 
  <option key={"ok"} value={"ok"}>
  Ok  </option>
  <option key="damaged" value="damaged">
  Damaged
  </option>
  <option key="partial" value="partial">
  Partial
  </option>
  <option key="fraud" value="fraud">
  Fraud
  </option>
 
</select>          


{returnserial ?<div>
      <h1>Serial Number Manager</h1>
      <input
        type="text"
        value={newSerial}
        onChange={(e) => setNewSerial(e.target.value)}
        placeholder="Enter serial number"
      />
      <button onClick={addSerialNumber}>Add Serial Number</button>
      <ul>
        {serialNumbers?.map(number => (
          <li key={number}>
            {number}
            <button onClick={() => removeSerialNumber(number)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>:<div><form className="flex gap-2 flex-wrap" >
        {productids?.map(product => (
          <div  key={product._id}>
            <label >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product._id)}
                onChange={() => handleCheckboxChange(product._id)}
              />
              {product.name}
            </label>
          </div>
        ))}
       </form></div>}
                </div>   
                <div className="flex justify-center mt-1">
      <button className="text-[16px] bg-blue-600 rounded-full w-[50%] items-center mt-3  text-white px-2 py-[3px]" onClick={()=>{update(selectedStatus,id)}}>Update</button>
    </div>     
                 
</div>
</div>}
         <div className="  mt-4 w-[1350px] h-[510px] ">
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
                <div className="border-l-[1px] border-white w-[160px]  px-3 py-1 ">Return Date</div>
                 
            </div>
            
            {data?.orders?.map((person) => {
 
 const returndate1 = new Date(person.returndate);
 const doptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let returndate = returndate1.toLocaleDateString('en-IN', doptions);
returndate = returndate.split('/').join('-');

 return (
            <div key={person._id} className="bg-[#f2f2f2] flex   text-black  px-2  items-center ">
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" px-3 py-1 overflow-x-auto w-[160px] ">{person.Platform.name} </Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Billno}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[130px] overflow-x-auto px-3 py-1 ">{person.OrderId}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Product}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Quntity}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[150px] overflow-x-auto px-3 py-1 ">{person.Salesamount}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.State}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[180px] overflow-x-auto px-3 py-1 ">{person.courier}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[140px] overflow-x-auto px-3 py-1 ">{person.trackingnumber}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Lrno}</Link>
                <Link to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[160px] overflow-x-auto px-3 py-1 ">{returndate}</Link>
                   
                { openItemId === person._id &&<div className=" sticky right-0 flex gap-2     z-10">
          <div className=" top-[-19px]  absolute right-28  bg-white  border-black border-[1px] p-2  ">
      


<div className="opstion  ">
      
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="Received"&&'bg-blue-400'}`} onClick={()=>{changestatus("Received",person)}} value="pending">Received</option>
    
         <option className={`text-[12px] cursor-pointer ${selectedStatus=="Lost"&&'bg-blue-400'}`} onClick={()=>{changestatus("Lost",person)}} value="canceled">Lost</option>
    
    </div>
 {selectedStatus=="Lost" && <div className="flex justify-center mt-1">
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
          {range(1, totalPages+1)?.map(number => (
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

