import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { MdEdit ,MdDelete ,MdOutlineSystemSecurityUpdate } from "react-icons/md";
import DataContext from "../usecontext/DataContext";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default  function Neworders (params) {
 
  const { updateOrderStatus,userrole ,setexceldata,setsingleorderid} = useContext(DataContext);
  const { products,fetchProducts,    fetchcomboProducts,    comboProducts } = useContext(DataContext);
  
  const {  platformdata,fetchplatform} = useContext(DataContext);  
  const [selectedStatus, setSelectedStatus] = useState('');
  const [id, setid] = useState('');
  const [data, setData] = useState({ orders: [] });
  const [courierdata, setcourierdata] = useState([]);
     const [error, setError] = useState(null);
     const [showpopup, setshowpopup] = useState(false);
     const [showedit, setshowedit] = useState(false);
     const [loading, setLoading] = useState(true);
     let [productdata, setproductdata] = useState({   billno:"", billdate:"", LRNO:"" ,shippingcharges:"" ,Trackingid:"" ,Courier:"",   Deliverybydate:""})
     const [currentPage, setCurrentPage] = useState(1);
     const [totalOrder, settotalOrder] = useState("");
    const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
     const apiKey = "https://backenddata77720.onrender.com"
 
   useEffect(() => {
    Fetchproduct(currentPage);
    fetchplatform()
    fetchProducts()
    fetchcomboProducts()
    fetchcourier();
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
      const response = await axios.get(`${apiKey}/api/order/fetchallordersforadmin/neworder/${page}`,{method: 'GET',
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
  


  
 

 
   let deleteproduct = (id)=>{
    let token = localStorage.getItem("token")
       axios.delete(`${apiKey}/api/order/deleteorder/${id}`,{method: 'DELETE',
        headers:{
             
            'authtoken': token
        },
       })
       Fetchproduct(currentPage)
   }

   let confirm11 =(id)=>{
    setshowedit(false)
    if (window.confirm("Do you really want to delete?")) {
      deleteproduct(id)       
        }
       
}


   
   const [openItemId, setOpenItemId] = useState(null);

   const toggleOpen = (id) => {
     setOpenItemId((prevId) => (prevId === id ? null : id));
   };

let changestatus =(status,iddata)=>{
  setSelectedStatus(status)
  setid(iddata)
  setshowpopup(true)
}
 
const onchange =(e)=>{
  //console.log(e.target.name)
  //console.log(e.target.value)
  setproductdata({...productdata,[e.target.name]:[e.target.value]})
 }

let update =async(status,id)=>{
 await updateOrderStatus(status,id,productdata)
 Fetchproduct(currentPage)
}


const [formData, setFormData] = useState({
  id: '',
  Platform: '',
  OrderId: '',
  billdate: '',
  Product: '',
  Quntity: '',
  TransferPrice: '',
  SalesAmount: '',
  Tax: '',
  orderdate: '',
  Paymentmode: '',
  Address: '',
  Pincode: '',
  State: '',
  status: '',
  MobNo: '',
  Dispatchbydate: ''
});


let onclickedit =(person,value)=>{
  setshowedit(true)
  //console.log(person)
  setQuery(person.Product)
  setFormData({
    id: person._id,
    Platform: person?.Platform?.name,
    OrderId: person.OrderId,
    billdate: '',
    Product: person.Product,
    Quntity: person.Quntity,
    TransferPrice: person.TransferPrice,
    SalesAmount: person.Salesamount,
    Tax: person.Tax,
    orderdate:"",
    Paymentmode:person.Paymentmode,
    Address: person.Address.substring(0, 15),
    Pincode: person.Pincode,
    State: person.State,
     MobNo: person.MobNo,
    
    Dispatchbydate: ''
  });
  
 
}

 

let fetchcourier = ()=>{
  let token = localStorage.getItem('token')
  axios.get(`${apiKey}/api/courier/fetchallcourier`,{method: 'GET',
    headers:{
         
        'authtoken': token
    },
   })
  .then(response => {
      setLoading(false);
      setcourierdata(response.data);
   })
  .catch(error => {
    setError(error);
    setLoading(false);
  });
}


 




const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const [errors, setErrors] = useState('')

const handleSubmit = async (e) => {


  const newErrors = {};
console.log(formData.Platform)
  if (!formData.orderdate) newErrors.orderdate = "Order date is required.";
  if (!formData.billdate) newErrors.billdate = "Bill date is required.";
  if (!formData.Platform) newErrors.Platform = "Platform is required.";
  if (formData.Platform === undefined ) newErrors.Platform = "Platform is required.";
  if (formData.Platform === 'flipcart' ) newErrors.Platform = "Platform is required.";
  if (!formData.OrderId) newErrors.OrderId = "Order ID is required.";
  if (!formData.Product) newErrors.Product = "Product is required.";
  if (!formData.Quntity) newErrors.Quntity = "Quantity is required.";
  if (!formData.TransferPrice) newErrors.TransferPrice = "Transfer Price is required.";
  if (!formData.SalesAmount) newErrors.SalesAmount = "Sales Amount is required.";
  if (!formData.Tax) newErrors.Tax = "Tax is required.";
  if (!formData.Paymentmode) newErrors.Paymentmode = "Payment Mode is required.";
  if (!formData.Address) newErrors.Address = "Address is required.";
  if (!formData.Pincode) newErrors.Pincode = "Pincode is required.";
  if (!formData.State) newErrors.State = "State is required.";
  if (!formData.MobNo) newErrors.MobNo = "Mobile Number is required.";
  if (!formData.Dispatchbydate) newErrors.Dispatchbydate = "Dispatch by Date is required.";

  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    // Proceed with form submission
    let token = localStorage.getItem('token')
    await  setFormData({ ...formData, "Product": query });
    try {
      const response = await axios.put(`${apiKey}/api/order/updateorder/${formData.id}`, formData,{method: 'PUT',
        headers:{
             
            'authtoken': token
          },
        });
       alert('Order updated successfully');
       setshowedit(false)
  } catch (error) {
       alert('Error updating order');
      }
    };
    
  }
 

//this is for edit product 

const [query, setQuery] = useState('');
const [filteredProducts, setFilteredProducts] = useState([]);

 

const Fetchproductname = async (name) => {
    try {
      let token = localStorage.getItem('token')
        const response = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${name}`,{method: 'GET',
          headers:{
               
              'authtoken': token
          },
         });
         setQuery(response?.data?.othername1?.name);
    } catch (error) {
     }
};

useEffect(() => {
 
 let productNames = products?.productNames?.concat(comboProducts);
if (query) {
    setFilteredProducts(productNames.filter(name =>
        name.toLowerCase().includes(query.toLowerCase())
    ));
} else {
    setFilteredProducts([]);
}
}, [query, products, comboProducts]);


const handleChange11 = (e) => {
let productNames = products?.productNames?.concat(comboProducts);

const value = e.target.value;
      setQuery(value);
       if (productNames.some(name => name.toLowerCase().includes(value.toLowerCase()))) {
          setQuery(value);
         

      } else   {
          setQuery(query);
      }
};

const handleSuggestionClick = (name) => {
if (name.includes("+")) {
    setQuery(name);
    setFormData({ ...formData, "Product": name });
    
}
else{

    Fetchproductname(name)
    setFormData({ ...formData, "Product": name });
}
setFilteredProducts([]);
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
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;
    return(
        <div className=" ">
{showedit && (
  <div className="fixed inset-0 flex items-center justify-center z-40">
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-[90%] md:w-[80%] lg:w-[70%]">
      <div 
        onClick={() => setshowedit(false)} 
        className="cursor-pointer w-6 h-6 flex items-center justify-center border border-black rounded-full mb-4"
      >
        <span className="text-lg font-semibold">x</span>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {/* Order Date */}
        <div>
          <label htmlFor="orderdate" className="block text-sm font-medium text-gray-700">Order Date</label>
          <input 
            type="date" 
            id="orderdate" 
            name="orderdate" 
            value={formData.orderdate} 
            onChange={handleChange} 
            className={`px-3 py-2 border rounded-md w-full ${errors.orderdate ? 'border-red-500' : ''}`}
            required 
          />
          {errors.orderdate && <p className="text-red-500 text-xs mt-1">{errors.orderdate}</p>}
        </div>

        {/* Bill Date */}
        <div>
          <label htmlFor="billdate" className="block text-sm font-medium text-gray-700">Bill Date</label>
          <input 
            type="date" 
            id="billdate" 
            name="billdate" 
            value={formData.billdate} 
            onChange={handleChange} 
            className={`px-3 py-2 border rounded-md w-full ${errors.billdate ? 'border-red-500' : ''}`}
            required 
          />
          {errors.billdate && <p className="text-red-500 text-xs mt-1">{errors.billdate}</p>}
        </div>

        {/* Platform */}
        <div>
          <label htmlFor="Platform" className="block text-sm font-medium text-gray-700">Platform</label>
          <select
            id="Platform"
            name="Platform"
            onChange={handleChange}
            value={formData?.Platform?._id}
            className={`px-3 py-2 border rounded-md w-full ${errors.Platform ? 'border-red-500' : ''}`}
            required
          >
            <option value="notselected">Select Platform</option>
            {platformdata.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {errors.Platform && <p className="text-red-500 text-xs mt-1">{errors.Platform}</p>}
        </div>

        {/* Order ID */}
        <div>
          <label htmlFor="OrderId" className="block text-sm font-medium text-gray-700">Order ID</label>
          <input 
            type="text" 
            id="OrderId" 
            name="OrderId" 
            value={formData.OrderId} 
            onChange={handleChange} 
            placeholder="Order ID" 
            className={`px-3 py-2 border rounded-md w-full ${errors.OrderId ? 'border-red-500' : ''}`}
            required 
          />
          {errors.OrderId && <p className="text-red-500 text-xs mt-1">{errors.OrderId}</p>}
        </div>

        {/* Product */}
        <div className="relative">
          <label htmlFor="Product" className="block text-sm font-medium text-gray-700">Product</label>
          <input 
            type="text" 
            id="Product" 
            name="Product" 
            onChange={handleChange11} 
            value={query} 
            placeholder="Product" 
            className={`px-3 py-2 border rounded-md w-full ${errors.Product ? 'border-red-500' : ''}`}
            required 
          />
          {filteredProducts && (
            <div className="absolute bg-gray-100 border border-gray-300 mt-1 rounded-md w-full">
              <div className="suggestions overflow-y-auto max-h-20">
                {filteredProducts.map((name, index) => (
                  <div
                    key={index}
                    className="suggestion p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
          {errors.Product && <p className="text-red-500 text-xs mt-1">{errors.Product}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="Quntity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input 
            type="text" 
            id="Quntity" 
            name="Quntity" 
            value={formData.Quntity} 
            onChange={handleChange} 
            placeholder="Quantity" 
            className={`px-3 py-2 border rounded-md w-full ${errors.Quntity ? 'border-red-500' : ''}`}
            required 
          />
          {errors.Quntity && <p className="text-red-500 text-xs mt-1">{errors.Quntity}</p>}
        </div>

        {/* Transfer Price */}
        <div>
          <label htmlFor="TransferPrice" className="block text-sm font-medium text-gray-700">Transfer Price</label>
          <input 
            type="text" 
            id="TransferPrice" 
            name="TransferPrice" 
            value={formData.TransferPrice} 
            onChange={handleChange} 
            placeholder="Transfer Price" 
            className={`px-3 py-2 border rounded-md w-full ${errors.TransferPrice ? 'border-red-500' : ''}`}
            required 
          />
          {errors.TransferPrice && <p className="text-red-500 text-xs mt-1">{errors.TransferPrice}</p>}
        </div>

        {/* Sales Amount */}
        <div>
          <label htmlFor="SalesAmount" className="block text-sm font-medium text-gray-700">Sales Amount</label>
          <input 
            type="text" 
            id="SalesAmount" 
            name="SalesAmount" 
            value={formData.SalesAmount} 
            onChange={handleChange} 
            placeholder="Sales Amount" 
            className={`px-3 py-2 border rounded-md w-full ${errors.SalesAmount ? 'border-red-500' : ''}`}
            required 
          />
          {errors.SalesAmount && <p className="text-red-500 text-xs mt-1">{errors.SalesAmount}</p>}
        </div>

        {/* Tax */}
        <div>
          <label htmlFor="Tax" className="block text-sm font-medium text-gray-700">Tax</label>
          <input 
            type="text" 
            id="Tax" 
            name="Tax" 
            value={formData.Tax} 
            onChange={handleChange} 
            placeholder="Tax" 
            className={`px-3 py-2 border rounded-md w-full ${errors.Tax ? 'border-red-500' : ''}`}
            required 
          />
          {errors.Tax && <p className="text-red-500 text-xs mt-1">{errors.Tax}</p>}
        </div>

        {/* Payment Mode */}
        <div>
          <label htmlFor="Paymentmode" className="block text-sm font-medium text-gray-700">Payment Mode</label>
          <input 
            type="text" 
            id="Paymentmode" 
            name="Paymentmode" 
            value={formData.Paymentmode} 
            onChange={handleChange} 
            placeholder="Payment Mode" 
            className={`px-3 py-2 border rounded-md w-full ${errors.Paymentmode ? 'border-red-500' : ''}`}
            required 
          />
          {errors.Paymentmode && <p className="text-red-500 text-xs mt-1">{errors.Paymentmode}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Address</label>
          <input 
            type="text" 
            id="Address" 
            name="Address" 
            value={formData.Address} 
            onChange={handleChange} 
            placeholder="Address" 
            className={`px-3 py-2 border rounded-md w-full ${errors.Address ? 'border-red-500' : ''}`}
            required 
          />
          {errors.Address && <p className="text-red-500 text-xs mt-1">{errors.Address}</p>}
        </div>

        {/* Pincode */}
        <div>
          <label htmlFor="Pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
          <input 
            type="text" 
            id="Pincode" 
            name="Pincode" 
            value={formData.Pincode} 
            onChange={handleChange} 
            placeholder="Pincode" 
            className={`px-3 py-2 border rounded-md w-full ${errors.Pincode ? 'border-red-500' : ''}`}
            required 
          />
          {errors.Pincode && <p className="text-red-500 text-xs mt-1">{errors.Pincode}</p>}
        </div>

        {/* State */}
        <div>
          <label htmlFor="State" className="block text-sm font-medium text-gray-700">State</label>
          <input 
            type="text" 
            id="State" 
            name="State" 
            value={formData.State} 
            onChange={handleChange} 
            placeholder="State" 
            className={`px-3 py-2 border rounded-md w-full ${errors.State ? 'border-red-500' : ''}`}
            required 
          />
          {errors.State && <p className="text-red-500 text-xs mt-1">{errors.State}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="MobNo" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input 
            type="text" 
            id="MobNo" 
            name="MobNo" 
            value={formData.MobNo} 
            onChange={handleChange} 
            placeholder="Mobile Number" 
            className={`px-3 py-2 border rounded-md w-full ${errors.MobNo ? 'border-red-500' : ''}`}
            required 
          />
          {errors.MobNo && <p className="text-red-500 text-xs mt-1">{errors.MobNo}</p>}
        </div>

        {/* Dispatch by Date */}
        <div>
          <label htmlFor="Dispatchbydate" className="block text-sm font-medium text-gray-700">Dispatch by Date</label>
          <input 
            type="date" 
            id="Dispatchbydate" 
            name="Dispatchbydate" 
            value={formData.Dispatchbydate} 
            onChange={handleChange} 
            className={`px-3 py-2 border rounded-md w-full ${errors.Dispatchbydate ? 'border-red-500' : ''}`}
            required 
          />
          {errors.Dispatchbydate && <p className="text-red-500 text-xs mt-1">{errors.Dispatchbydate}</p>}
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Update Order
      </button>
    </div>
  </div>
)}




        <div className=" relative">
      { showpopup && <div className=" flex justify-center ">
        <div className="w-[60%] bg-white shadow-xl shadow-gray-300 z-20 border-[1px] border-gray-300 py-5 my-6 rounded-md  absolute">
          <div onClick={()=>{setshowpopup(false)}} className="rounded-full cursor-pointer w-6 h-6 inline-block  ml-2  text-center justify-self-center border-black border-[1px] ">
          <div className="relative bottom-[7px] text-[20px]">x
            </div>
            </div>
          <div className="flex justify-center py-2">
            <div>Update some info</div>
          </div>
          <div className="grid    md:grid-cols-2 text-black  px-2 gap-2 md:gap-3 items-center">

        
        <input type='text' name='billno' onChange={onchange} value={productdata.billno} placeholder='bill No' className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
                
                {selectedStatus !== "Not Sent" &&  <input type='text' name='LRNO' onChange={onchange} value={productdata.LRNO} placeholder='LR NO.' className=" px-3 py-1 border-black border-[2px] rounded-md"/> }
                {selectedStatus !== "Cancel" && selectedStatus !== "Not Sent" && <input type='text' name='shippingcharges' onChange={onchange} value={productdata.shippingcharges} placeholder='shipping charges' className=" px-3 py-1 border-black border-[2px] rounded-md"/> }
                {selectedStatus !== "Not Sent" &&  <input type='text' name='Trackingid' onChange={onchange} value={productdata.Trackingid} placeholder='Tracking id' className=" px-3 py-1 border-black border-[2px] rounded-md"/> }
                {selectedStatus !== "Not Sent" &&     <select
name="Courier"
onChange={onchange}
value={productdata.Courier}
className="px-3 py-1 border-black border-[2px] rounded-md"
>
<option value="Courier"  >
Courier
</option>
{courierdata.map((option) => (
  <option key={option.name} value={option._id}>
    {option.name}
  </option>
))}
</select>}
                {selectedStatus !== "Cancel" &&  
                <div className=" px-3 py-1 border-black border-[2px] rounded-md flex items-center gap-3">
                  <div className="text-gray-500">Deliverybydate:</div>
                <input type='date' name='Deliverybydate' onChange={onchange} value={productdata.Deliverybydate} placeholder='Delivery by date' /></div>
                 }
                </div>       
                <div className="flex justify-center mt-1">
      <button className="text-[16px] bg-blue-600 rounded-full w-[50%] items-center mt-3  text-white px-2 py-[3px]" onClick={()=>{update(selectedStatus,id)}}>Update</button>
    </div> 
</div>
</div>}




         <div className=" mt-3  w-[1820px] pb-10 h-[510px]">

            <div className="bg-[#464646] flex sticky top-3 z-20  text-white mb-2  px-2 items-center ">
                <div className=" border-white  px-3 py-1  w-[160px] ">Order Date</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Bill date</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Platform</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">Order Id</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Product</div>
                <div className="border-l-[1px] border-white w-[130px]  px-3 py-1 ">Quntity</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Transfer Price</div>
                <div className="border-l-[1px] border-white w-[150px]  px-3 py-1 ">Sales Amount</div>
                 <div className="border-l-[1px] border-white w-[80px]  px-3 py-1 ">Tax</div>
                <div className="border-l-[1px] border-white w-[160px]  px-3 py-1 ">Payment mode</div>
                <div className="border-l-[1px] border-white w-[200px]  px-3 py-1 ">Address</div>
                <div className="border-l-[1px] border-white w-[110px]  px-3 py-1 ">Pincode</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">State</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Mob No:</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Dispatch by date</div>
            </div>
            { data?.orders?.map((person) => {
 
 const date = new Date(person.orderdate);
 const options = { year: 'numeric', month: '2-digit', day: '2-digit', };
let newdate = date.toLocaleDateString('en-IN', options);
newdate = newdate.split('/').join('-');

 const bdate = new Date(person.Billdate);
 const boptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let Billdate = bdate.toLocaleDateString('en-IN', boptions);
Billdate = Billdate.split('/').join('-');

 const Dispatch = new Date(person.Dispatchbydate);
 const doptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let Dispatchdate = Dispatch.toLocaleDateString('en-IN', doptions);
Dispatchdate = Dispatchdate.split('/').join('-');

         return (
            <div  
            key={person._id}
            className="bg-[#f2f2f2] flex text-black mt-3 relative px-2 items-center "
           > 
           

        
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto px-3 py-1 w-[160px]"> {newdate}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[120px] px-3 py-2">{Billdate}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[120px] px-3 py-2">{person?.Platform?.name}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[130px] px-3 py-2">{person.OrderId}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[100px] px-3 py-2">{person.Product}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[130px] px-3 py-2">{person.Quntity}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[180px] px-3 py-2">{person.TransferPrice}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[150px] px-3 py-1">{person.Salesamount}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[80px] px-3 py-2">{person.Tax}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[160px] px-3 py-2">{person.Paymentmode}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-scroll w-[200px] px-3 py-2">
           <div className="w-[600px] ">{person.Address.substring(0, 12)}</div> </Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[110px] px-3 py-2">{person.Pincode}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[100px] px-3 py-2">{person.State}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[100px] px-3 py-2">{person.MobNo}</Link>
            <Link  onClick={() => setsingleorderid(person._id)} to="/home/Searchpage" className="overflow-x-auto w-[180px] px-3 py-2">{Dispatchdate}</Link>

            { openItemId === person._id &&<div className=" sticky right-0 flex gap-2     z-10">
          <div className=" top-[-19px]  absolute right-28  bg-white  border-black border-[1px] p-2  ">
      


<div className="opstion  ">
      
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="Pending RTD"&&'bg-blue-400'}`} onClick={()=>{changestatus("Pending RTD",person._id)}} value="pending">Pending RTD</option>
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="Not Sent"&&'bg-blue-400'}`} onClick={()=>{changestatus("Not Sent",person._id)}} value="delivered">Not Sent</option>
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="Cancel"&&'bg-blue-400'}`} onClick={()=>{changestatus("Cancel",person._id)}} value="canceled">Cancel</option>
    
    </div>
    
    </div>
    </div>}
            <div className=" sticky right-0 flex    bottom-2 z-10">

            <div  
              className="bg-black rounded-full w-8 h-8 flex justify-center items-center opacity-20 hover:opacity-100 cursor-pointer  absolute bottom-3 right-20 text-white     text-[18px]  "
              onClick={() => toggleOpen(person._id)}
             >
             <MdOutlineSystemSecurityUpdate  />   
            </div>
            {userrole?.role == 1 &&

              <div  onClick={()=>{onclickedit(person)}}
              className="bg-black rounded-full  w-8 h-8 flex justify-center items-center  opacity-20 hover:opacity-100 cursor-pointer  absolute bottom-3 right-10 text-white     text-[18px]  "
              >
             <MdEdit />   
            </div>
          }
          {userrole?.role == 1 &&
            <div  onClick={()=>{confirm11(person._id)}}
            className="bg-red-400 rounded-full absolute bottom-3 right-0  w-8 h-8 flex justify-center items-center  opacity-20 hover:opacity-100 cursor-pointer  text-white    text-[18px]  "
            >
              < MdDelete />    
            </div>}
            </div>
          </div>
        )})}
          </div>
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
    )
}



