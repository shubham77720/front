import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdEdit ,MdDelete ,MdOutlineSystemSecurityUpdate } from "react-icons/md";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";


export default  function Products1 (params) {
  
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [showedit, setshowedit] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [totalOrder, settotalOrder] = useState("");
const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
  const apiKey = "https:/backenddata77720.onrender.com";
 
 
const [serialRES, setSerialRES] = useState('');
const [formData, setFormData] = useState({
  id: '',
  name: '',
  category: '',
  MRP: '',
  salingprice: '', 
  Serialrequired:""
  
});
const [serialInput, setSerialInput] = useState('');
const [serialNumbers, setSerialNumbers] = useState([]);
useEffect(() => {
    fetchproduct(currentPage)
}, []);

  



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
 if( Math.ceil(totalOrder/20)){}
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
    const response = await axios.get(`${apiKey}/api/product/fetchproductforadmin/${page}`,{method: 'GET',
      headers:{
           
          'authtoken': token
      },
     });
    settotalOrder(response.data.totalCount)

    if (response.data.products.length === 0) {
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

const handleSubmitedit = async (e) => {

    try {let token = localStorage.getItem('token')
        const response = await axios.put(`${apiKey}/api/product/updateproduct/${formData.id}`, formData,{method: 'PUT',
          headers:{
               
              'authtoken': token
          },
         });
        //console.log(response.data);
        alert('Order updated successfully');
        fetchproduct(currentPage)
        setshowedit(false)
    } catch (error) {
        console.error(error);
        alert('Error updating order');
    }
  };

    

  const handleChangeedit = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let onclickedit =(person)=>{
    setFormData({
        id:person._id,
        name:person.name,
        category: person.category,
        MRP:person.MRP,
        Serialrequired:person.Serialrequired,
        salingprice:person.salingprice,
     })
     if(person?.othername){

      setSerialNumbers(person.othername)
    }else{
      
      setSerialNumbers([])
    }
     setshowedit(true)
   
  }


   let deleteproduct = (id)=>{
    let token = localStorage.getItem('token')
    axios.delete(`${apiKey}/api/product/deleteproduct/${id}`,{method: 'DELETE',
      headers:{
           
          'authtoken': token
      },
     })
    fetchproduct(currentPage)
}

let confirm11 =(id)=>{
 setshowedit(false)
 if (window.confirm("Do you really want to delete?")) {
   deleteproduct(id)       
     }
    
}


const handleChange = (e) => {
   setSerialInput(e.target.value);
};

const handleAddSerial = () => {
  if (serialInput.trim() && !serialNumbers?.includes(serialInput.trim())) {
    setSerialNumbers([...serialNumbers, serialInput.trim()]);
 
      setFormData({
        ...formData,othername:[...serialNumbers, serialInput.trim()]
      })
    
     
    setSerialInput('');
  }
  
};


const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleAddSerial();
  }
};


const handleRemoveSerial = (serialToRemove) => {
  setSerialNumbers(serialNumbers.filter(serial => serial !== serialToRemove));

 
    setFormData({
      ...formData,othername:serialNumbers.filter(serial => serial !== serialToRemove)
    })
 
   
  
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


const options = [
  { value: 'YES', label: 'YES' },
  { value: 'NO', label: 'NO' },
];

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

    return(
        <>
      {showedit && (
  <div className="flex absolute items-center md:w-[80%]  lg:w-[85%]   w-[90%] justify-center  z-30">
    <div className="bg-white p-6 rounded-lg border-gray-300 border w-[90%] md:w-[80%] lg:w-[70%] shadow-xl">
      <div 
        onClick={() => setshowedit(false)} 
        className="rounded-full cursor-pointer w-6 h-6  -block text-center border-black border-2 flex items-center justify-center bg-red-500 text-white">
        x
      </div>
      
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-semibold text-gray-700">Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={handleChangeedit} 
            placeholder="Name" 
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            required 
          />
        </div>

        {/* Category Field */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 text-sm font-semibold text-gray-700">Category</label>
          <input 
            type="text" 
            id="category"
            name="category" 
            value={formData.category} 
            onChange={handleChangeedit} 
            placeholder="Category" 
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            required 
          />
        </div>

        {/* MRP Field */}
        <div className="flex flex-col">
          <label htmlFor="MRP" className="mb-1 text-sm font-semibold text-gray-700">MRP</label>
          <input 
            type="text" 
            id="MRP"
            name="MRP" 
            value={formData.MRP} 
            onChange={handleChangeedit} 
            placeholder="MRP" 
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            required 
          />
        </div>

        {/* Selling Price Field */}
        <div className="flex flex-col">
          <label htmlFor="salingprice" className="mb-1 text-sm font-semibold text-gray-700">Selling Price</label>
          <input 
            type="text" 
            id="salingprice"
            name="salingprice" 
            value={formData.salingprice} 
            onChange={handleChangeedit} 
            placeholder="Selling Price" 
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            required 
          />
        </div>

        {/* Serial Required Field */}
        <div className="md:col-span-2 flex flex-col">
          <label htmlFor="Serialrequired" className="mb-1 text-sm font-semibold text-gray-700">Serial Required</label>
          <select
            id="Serialrequired"
            name="Serialrequired"
            onChange={handleChangeedit}
            value={formData.Serialrequired}
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Serialrequired">Serial Required</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Add Serial Numbers */}
        <div className="md:col-span-2 flex flex-col">
          <label htmlFor="serialNumbers" className="mb-1 text-sm font-semibold text-gray-700">Add Serial Numbers</label>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              id="serialNumbers"
              onChange={(e) => handleChange(e)} 
              onKeyPress={(e) => handleKeyPress(e)} 
              value={serialInput} 
              name="serialNumbers" 
              placeholder="Enter other name" 
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
            />
            <button 
              type="button" 
              onClick={(e) => handleAddSerial(e)} 
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200">
              Add Name
            </button>
          </div>

          {serialNumbers?.length > 0 && (
            <div className="mt-4">
              <h2 className="font-bold text-lg">Other Names:</h2>
              <ul className="mt-2 grid gap-2">
                {serialNumbers.map((serial, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-center justify-between bg-gray-100 px-3 py-2 border border-gray-300 rounded-md">
                    {serial} 
                    <button 
                      onClick={() => handleRemoveSerial(serial)} 
                      className="text-red-500 font-bold">
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Update Button */}
      <button 
        onClick={() => handleSubmitedit()} 
        className="mt-6 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200">
        Update Order
      </button>
    </div>
  </div>
)}


        <div className=" ">
        
         <div className="  mt-4 lg:w-full h-[550px] w-[1000px] ">
            <div className="bg-[#464646] flex   text-white mb-2  px-2 items-center justify-between">
                <div className=" border-white  px-3 py-1  w-[160px] ">Product Name</div>
                <div className=" border-white border-l-[1px] px-3 py-1  w-[160px] ">Category</div>
                <div className=" border-l-[1px]  border-white w-[80px]  px-3 py-1 ">MRP</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">Saling price</div>
                 <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">NewOrder</div>
                <div className="border-l-[1px] border-white w-[70px]  px-3 py-1 ">Available</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">In stock</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">damage</div>
                
                 
            </div>
            {data?.products?.map((person) => {
         let purchase = person.purchasestock
         let totalsale = person.totalsale
         // eslint-disable-next-line use-isnan, eqeqeq
         if(purchase === NaN || purchase == 0 || !purchase){
             purchase = 0
            }
            
         // eslint-disable-next-line use-isnan, eqeqeq
         if(totalsale === NaN || totalsale == 0 || !totalsale){
            totalsale = 0
            }
          
       
         return (
            <div key={person._id} className="bg-[#f2f2f2] flex mt-3   text-black  px-2 justify-between items-center ">
                <div className="  px-3 py-1  w-[170px] ">{person.name}</div>
                <div className="  px-3 py-1  w-[170px] ">{person.category} </div>
                <div className=" w-[80px]  px-3 py-1 ">{person?.MRP}</div>
                <div className=" w-[130px]  px-3 py-1 ">{person.salingprice}</div>
                 <div className=" w-[100px]  px-3 py-1 ">{person.ordercome}</div>
                <div className=" w-[70px]  px-3 py-1 ">{(purchase-totalsale)-person.ordercome}</div>
                <div className=" w-[130px]  px-3 py-1 ">{purchase-totalsale}</div>
                <div className="border-l-[1px] border-white w-[90px]  px-3 py-1 ">damage</div>

                <div className=" sticky right-0 flex   bg-black bottom-1 z-10">

 
<div    onClick={()=>{onclickedit(person)}}
  className="bg-black rounded-full w-6 h-6 flex justify-center items-center  absolute bottom-1 right-8 text-white     text-[16px]  "
 >
 <MdEdit />   
</div>
<div  onClick={()=>{confirm11(person._id)}}
  className="bg-red-400 rounded-full absolute bottom-1 right-0 w-6 h-6 flex justify-center items-center  text-white    text-[16px]  "
 >
  < MdDelete />    
</div>
</div>
                 
            </div>
          )})}
        
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

