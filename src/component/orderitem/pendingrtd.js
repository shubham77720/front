import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { MdEdit ,MdDelete ,MdOutlineSystemSecurityUpdate } from "react-icons/md";
import DataContext from "../usecontext/DataContext";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default  function PendingRtd (params) {
   const apiKey = "https:/backenddata77720.onrender.com";
  
    const { updateOrderStatus ,setexceldata,setsingleorderid,userrole} = useContext(DataContext);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [id, setid] = useState('');
    const [showpopup, setshowpopup] = useState(false);

    const [serialInput, setSerialInput] = useState('');
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [serialNumbersArray, setSerialNumbersArray] = useState([]);
    const [SerialremoveArray, setSerialremoveArray] = useState([]);
    let [productdata, setproductdata] = useState({ Deliverybydate:"",SerialremoveArray:[],serialNumbers:""})
    const { products ,comboProducts} = useContext(DataContext);
    const [showedit, setshowedit] = useState(false);

    const [trackingId, setTrackingId] = useState('');
    const [serialdata, setserialdata] = useState('');
     const [multiproduct, setmultiproduct] = useState([]);
    const [scanproduct, setscanproduct] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrder, settotalOrder] = useState("");
   const [hasMore, setHasMore] = useState(true); // To track if there are more items to load

    const handleChange = (event) => {
      setTrackingId(event.target.value);
    };

    const handleSubmit = async () => {
      let token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${apiKey}/api/order/trackingid/${trackingId}`,{method: 'GET',
          headers:{
               
              'authtoken': token
          },
         });
        //console.log('API Response:', response.data);
    
        // Update state with the new response data
        await setserialdata(response.data);
        setshowpopup(response.data.success);
        setscanproduct(response.data.order);
        setmultiproduct(response.data.products);

        
        if (response.data.order.Product.includes("+")){

          
          let combo = await axios.get(`${apiKey}/api/combo/fetchsinglecombo/${response.data.order.Product}`,{method: 'GET',
            headers:{
                 
                'authtoken': token
            },
           });
          if (combo?.data?.othername1?.Serialrequired == "NO"){
            //console.log("now product is workding")
            updateOrderStatus("RTD",response.data.order._id)
            //console.log(response?.data.order._id,"this is id")
            setshowpopup(false)
            return
          }
        }else{

          const responsep = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${response.data.order.Product}`,{method: 'GET',
            headers:{
                 
                'authtoken': token
            },
           });
          if (responsep?.data?.othername1?.Serialrequired === "NO"){
            setshowpopup(false)
            //console.log("now product is workding")
            //console.log(response?.data?.order._id,"this is id")

            updateOrderStatus("RTD",response?.data?.order._id)
            return
          }
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit()
      }
    };
    


 
    

     
    const handleAddSerial = async () => {
      let token = localStorage.getItem('token')
       const response = await axios.get(`${apiKey}/api/order/serialnum/${serialInput}`,{method: 'GET',
        headers:{
             
            'authtoken': token
        },
       });
 

       //console.log("response")
      if (serialInput.trim() && !serialNumbers.includes(serialInput.trim())) {
        if (scanproduct.Product.includes("+")) {

           if(!response?.data?.product?._id){
            setSerialInput('');
             return
          }
        
          let combo = await axios.get(`${apiKey}/api/combo/fetchsinglecombo/${scanproduct.Product}`,{method: 'GET',
            headers:{
                 
                'authtoken': token
            },
           });

          if (combo?.data?.othername1?.Serialrequired === "NO"){
            setshowpopup(false)
            changestatus("RTD",serialdata.order._id)
            return
          }
 //console.log(serialNumbers,"serialnumbers")
 setSerialNumbersArray(prevSerialNumbersArray => {
   
   let updatedSerialNumbersArray = [...prevSerialNumbersArray, response?.data?.product?._id]
   // let updatedSerialNumbersArray = prevSerialNumbersArray;
   //console.log("this is updated")
   //console.log(updatedSerialNumbersArray,"updated")
   const count = updatedSerialNumbersArray.filter(item => item === response?.data?.product?._id).length;
   //console.log(count,"updated")
   //console.log(multiproduct,"this multi")

const products = multiproduct.filter(item => item === response?.data?.product?._id).length;
//console.log(products,"thisis product")
 
            // if (count >= parseInt(scanproduct.Quntity)){
            //   const index = updatedSerialNumbersArray.indexOf('apple');

            //   if (index !== -1) {
            //     // Remove one element at the found index
            //     updatedSerialNumbersArray.splice(index, 1);
            //   }
            // }

 
            if (count-1 !== ( parseInt(scanproduct?.Quntity)* parseInt(products))) {
              updatedSerialNumbersArray = [...prevSerialNumbersArray, response?.data?.product?._id];

             } else {
              //console.log("Count exceeds scanproduct.Quntity. Removing one element.");
    
              // Find the index of the first occurrence of response?.data?.product?.name
              const index = updatedSerialNumbersArray.indexOf(response?.data?.product?._id);
    
              if (index !== -1) {
                // Remove one element at the found index
                updatedSerialNumbersArray.splice(index, 1);
              }
            }

            // Add response?.data?.product?.name to the array conditionally
            
 
             
  
    
  
            if (count <= ( parseInt(scanproduct?.Quntity)* parseInt(products))) {
               setSerialremoveArray(prevSerialremoveArray => {
                const updatedSerialremoveArray = { ...prevSerialremoveArray };
        
                // Ensure unique serial numbers within each product name's array
                const productName = response?.data?.product?._id;
                const serialNumber = serialInput.trim();
        
                if (!updatedSerialremoveArray[productName]) {
                  updatedSerialremoveArray[productName] = [];
                }
        
                if (!updatedSerialremoveArray[productName].includes(serialNumber)) {
                  updatedSerialremoveArray[productName].push(serialNumber);
                  //console.log(updatedSerialremoveArray)
                  //console.log(`Added ${serialNumber} for ${productName}`);
                } else {
                  //console.log(`Serial number ${serialNumber} already exists for ${productName}`);
                }
        
                return updatedSerialremoveArray;
              });

              setSerialNumbers(prevSerialNumbers => [...prevSerialNumbers, serialInput.trim()]);
            } else {
              //console.log("You can't add more");
            }
  
            return updatedSerialNumbersArray;
          });
        } else {

          const responsep = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${scanproduct.Product}`,{method: 'GET',
            headers:{
                 
                'authtoken': token
            },
           });
          if (responsep?.data?.othername1?.Serialrequired == "NO"){
            setshowpopup(false)
            changestatus("RTD",serialdata.order._id)
            return
          }
          //console.log(multiproduct)
          const isStringFound = serialdata?.serialNumbers.includes(serialInput.trim());
               const products = multiproduct.filter(item => item === response?.data?.product?._id).length;
//console.log(multiproduct.length)
//console.log(parseInt(scanproduct?.Quntity), parseInt(products))
          if (isStringFound) {
            if (serialNumbers.length < ( parseInt(scanproduct?.Quntity)* parseInt(products))) {
              setSerialNumbers(prevSerialNumbers => [...prevSerialNumbers, serialInput.trim()]);
            } else {
              //console.log('You can only add up to ' + scanproduct?.Quntity + ' serial numbers');
            }
          }
        }
  
        setSerialInput('');
      }
    };



    useEffect(() => {
      // setproductdata({...productdata,})
      setproductdata({...productdata,SerialremoveArray:[SerialremoveArray],'serialNumbers':serialNumbers})
    }, [SerialremoveArray,serialNumbers])

 
    const handleRemoveSerial = async(serialToRemove) => {
let token = localStorage.getItem('token')
      const response = await axios.get(`${apiKey}/api/order/serialnum/${serialToRemove}`,{method: 'GET',
        headers:{
             
            'authtoken': token
        },
       });


 
      const index = serialNumbersArray.indexOf(response?.data?.product?._id);
    
      if (index !== -1) {
        // Remove one element at the found index
        serialNumbersArray.splice(index, 1);
      }


      if (SerialremoveArray[response?.data?.product?._id]) {
        const newArray = SerialremoveArray[response?.data?.product?._id].filter(item => item !== serialToRemove);
        
        if (newArray.length === 0) {
          const updatedSerialremoveArray = { ...SerialremoveArray };
          delete updatedSerialremoveArray[response?.data?.product?._id];
          setSerialremoveArray(updatedSerialremoveArray);
          //console.log(`Key ${response?.data?.product?._id} deleted because array became empty`);
        } else {
          const updatedSerialremoveArray = { 
            ...SerialremoveArray, 
            [response?.data?.product?._id]: newArray 
          };
          setSerialremoveArray(updatedSerialremoveArray);
          //console.log(updatedSerialremoveArray);
        }
      } else {
        //console.log(`Key ${response?.data?.product?._id} does not exist in SerialremoveArray`);
      }

      // if (!SerialremoveArray[response?.data?.product?.name].includes(serialToRemove)) {
      // let serial =  SerialremoveArray[response?.data?.product?.name].push(serialToRemove);
      // setSerialremoveArray(serial)
      // //console.log(serial)
      //   } else {
      //   //console.log(`Serial number  `);
      // }


      setSerialNumbers(serialNumbers.filter(serial => serial !== serialToRemove));
    };



    const handleChangeserial = (e) => {
      //console.log(e.target.value)
      setSerialInput(e.target.value);
    };



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



    let closeserial =()=>{
      setshowpopup(false)
      setSerialNumbers([])
    }
  

 
    const fetchproduct = async (page) => {
      //console.log(page, "this is my fetching page");
    let token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${apiKey}/api/order/fetchallordersforadmin/Pending RTD/${page}`,{method: 'GET',
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
  //console.log(status,iddata)
   setSelectedStatus(status)
   updateOrderStatus(status,iddata,productdata)
   setid(iddata)
 }


 let update =async(status,id)=>{
  if(status === "RTD"){
    await updateOrderStatus(status,id,productdata)
    fetchproduct(currentPage)
  }else{

    await updateOrderStatus(status,id,productdata)
    fetchproduct(currentPage)
  }
   }


   //this is for edit product 


   const [formData, setFormData] = useState({
    id: '',
    Platform: '',
    OrderId: '',
    billdate: '',
    Billno: '',
    Lrno:"",
    shippingcharge:"",
    trackingId:"",
    courier:"",
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
    Dispatchbydate: '',
    Deliverybydate: ''
  });
  
  const handleChangeedit = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmitedit = async (e) => {
   let token = localStorage.getItem('token')
    try {
        const response = await axios.put(`${apiKey}/api/order/updateorder/${formData.id}`, formData,{method: 'PUT',
          headers:{
               
              'authtoken': token
          },
         });
        //console.log(response.data);
        alert('Order updated successfully');
    } catch (error) {
        console.error(error);
        alert('Error updating order');
    }
  };

  let onclickedit =(person)=>{
    setshowedit(true)
    setQuery(person.Product)
    setFormData({
      id: person._id,
      Platform: person.Platform,
      OrderId: person.OrderId,
      billdate: '',
      Product: person.Product,
      Quntity: person?.Quntity,
      TransferPrice: person.TransferPrice,
      SalesAmount: person.Salesamount,
      Tax: person.Tax,
      Paymentmode:person.Paymentmode,
      Address: person.Address.substring(0, 12),
      Billno: person.Billno,
      Lrno:person.Lrno,
      shippingcharge:person.shippingcharge,
      trackingId:person.trackingnumber,
      courier:person.courier,
      Pincode: person.Pincode,
      State: person.State,
       MobNo: person.MobNo,
       Deliverybydate: '',
      
      Dispatchbydate: ''
    });
    
   
  }
 
  
   

const [query, setQuery] = useState('');
const [filteredProducts, setFilteredProducts] = useState([]);




const fetchProductname = async (name) => {
    try {
      let token = localStorage.getItem('token')
        const response = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${name}`,{method: 'GET',
          headers:{
               
              'authtoken': token
          },
         });
         setQuery(response?.data?.othername1?.name);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

useEffect(() => {

// //console.log(comboProducts)   
// //console.log(products.productNames )
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
    
}
else{

    fetchProductname(name)
}
setFilteredProducts([]);
};
    
     return(
        <>
       {showedit && (
  <div className="flex absolute items-center md:w-[80%]  lg:w-[85%]   w-[90%] justify-center  z-30">
    <div className="bg-white p-6 rounded-lg border-gray-300 border w-[90%] md:w-[80%] lg:w-[70%] shadow-lg">
      <div onClick={() => setshowedit(false)} className="rounded-full cursor-pointer w-6 h-6 inline-block ml-2 text-center justify-self-center border-black border-[1px]">
        <div className="relative bottom-[7px] text-[20px] text-gray-800">x</div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="Product" className="block text-sm font-medium text-gray-700">Product</label>
          <input
            type="text"
            id="Product"
            name="Product"
            onChange={handleChange11}
            value={query}
            placeholder="Product"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
          {filteredProducts && (
            <div className="absolute bg-gray-300 mt-1 rounded-md w-full shadow-lg">
              <div className="suggestions overflow-y-auto max-h-40">
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
        </div>

        {/* Bill Date */}
        <div>
          <label htmlFor="billdate" className="block text-sm font-medium text-gray-700">Bill Date</label>
          <input
            type="date"
            id="billdate"
            name="billdate"
            value={formData.billdate}
            onChange={handleChangeedit}
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Bill Number */}
        <div>
          <label htmlFor="Billno" className="block text-sm font-medium text-gray-700">Bill No</label>
          <input
            type="text"
            id="Billno"
            name="Billno"
            value={formData.Billno}
            onChange={handleChangeedit}
            placeholder="Bill No"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* LR Number */}
        <div>
          <label htmlFor="Lrno" className="block text-sm font-medium text-gray-700">LR No</label>
          <input
            type="text"
            id="Lrno"
            name="Lrno"
            value={formData.Lrno}
            onChange={handleChangeedit}
            placeholder="LR No"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Shipping Charge */}
        <div>
          <label htmlFor="shippingcharge" className="block text-sm font-medium text-gray-700">Shipping Charge</label>
          <input
            type="text"
            id="shippingcharge"
            name="shippingcharge"
            value={formData.shippingcharge}
            onChange={handleChangeedit}
            placeholder="Shipping Charge"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Tracking ID */}
        <div>
          <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700">Tracking ID</label>
          <input
            type="text"
            id="trackingId"
            name="trackingId"
            value={formData.trackingId}
            onChange={handleChangeedit}
            placeholder="Tracking ID"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Courier */}
        <div>
          <label htmlFor="courier" className="block text-sm font-medium text-gray-700">Courier</label>
          <input
            type="text"
            id="courier"
            name="courier"
            value={formData.courier}
            onChange={handleChangeedit}
            placeholder="Courier"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Platform */}
        <div>
          <label htmlFor="Platform" className="block text-sm font-medium text-gray-700">Platform</label>
          <input
            type="text"
            id="Platform"
            name="Platform"
            value={formData.Platform}
            onChange={handleChangeedit}
            placeholder="Platform"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Order ID */}
        <div>
          <label htmlFor="OrderId" className="block text-sm font-medium text-gray-700">Order ID</label>
          <input
            type="text"
            id="OrderId"
            name="OrderId"
            value={formData.OrderId}
            onChange={handleChangeedit}
            placeholder="Order ID"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="Quntity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="text"
            id="Quntity"
            name="Quntity"
            value={formData?.Quntity}
            onChange={handleChangeedit}
            placeholder="Quantity"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Transfer Price */}
        <div>
          <label htmlFor="TransferPrice" className="block text-sm font-medium text-gray-700">Transfer Price</label>
          <input
            type="text"
            id="TransferPrice"
            name="TransferPrice"
            value={formData.TransferPrice}
            onChange={handleChangeedit}
            placeholder="Transfer Price"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Sales Amount */}
        <div>
          <label htmlFor="SalesAmount" className="block text-sm font-medium text-gray-700">Sales Amount</label>
          <input
            type="text"
            id="SalesAmount"
            name="SalesAmount"
            value={formData.SalesAmount}
            onChange={handleChangeedit}
            placeholder="Sales Amount"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Payment Mode */}
        <div>
          <label htmlFor="Paymentmode" className="block text-sm font-medium text-gray-700">Payment Mode</label>
          <input
            type="text"
            id="Paymentmode"
            name="Paymentmode"
            value={formData.Paymentmode}
            onChange={handleChangeedit}
            placeholder="Payment Mode"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* State */}
        <div>
          <label htmlFor="State" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            id="State"
            name="State"
            value={formData.State}
            onChange={handleChangeedit}
            placeholder="State"
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Dispatch by Date */}
        <div>
          <label htmlFor="Dispatchbydate" className="block text-sm font-medium text-gray-700">Dispatch by Date</label>
          <input
            type="date"
            id="Dispatchbydate"
            name="Dispatchbydate"
            value={formData.Dispatchbydate}
            onChange={handleChangeedit}
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Delivery by Date */}
        <div>
          <label htmlFor="Deliverybydate" className="block text-sm font-medium text-gray-700">Delivery by Date</label>
          <input
            type="date"
            id="Deliverybydate"
            name="Deliverybydate"
            value={formData.Deliverybydate}
            onChange={handleChangeedit}
            className="px-3 py-2 border rounded-md w-full"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitedit}
        className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
      >
        Update Order
      </button>
    </div>
  </div>
)}

        <div className="  ">
       {showpopup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-md
 ">
  <div className="w-[40%] px-2 py-1   top-[30%] absolute rounded-md shadow-xl  shadow-gray-300 z-40 bg-white border-[1px] border-gray-400 ">
        <div onClick={()=>{closeserial( )}} className="rounded-full cursor-pointer w-6 h-6 inline-block  ml-2  text-center justify-self-center border-black border-[1px] ">
          <div className="relative bottom-[7px] text-[20px]">x
            </div>
            </div>
  <div className=' '>
<div className='flex'>

                 <input type='text'onChange={(e)=>{handleChangeserial(e)}}  onKeyPress={(e)=>{handleKeyPress(e)}}  value={serialInput} name='serialNumbers'  placeholder="Enter othername" className=" px-3 py-1 w-[100%] border-black border-[2px] rounded-md"/> 
            
            
          
            <button type="button  " className='w-[100px]' onClick={(e) => handleAddSerial(e)}>Add Serial</button>
</div>

      {serialNumbers.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold">Serial Numbers:</h2>
          <ul className="grid gap-2 w-[50%] mt-2">
            {serialNumbers.map((serial, idx) => (
              <li
                key={idx}
                className="flex gap-2 border-gray-400 border-[1px] rounded-md px-2 items-center justify-between"
              >
                {serial} 
                <button
                  onClick={() => handleRemoveSerial(serial)}
                  className="text-red-500"
                >
                  x  
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
            </div>
            <div className="flex justify-center mt-1">
            {multiproduct && serialNumbers.length === ( parseInt(scanproduct?.Quntity)* parseInt(multiproduct.length)) && <button className="text-[10px] bg-blue-600 rounded-full   items-center   text-white px-2  " onClick={()=>{changestatus("RTD",serialdata.order._id)}} >Update</button>}
    </div> 
  </div>
</div>}

        <div className="mt-2 space-x-2">
        <input type='text' name='name' onChange={handleChange} value={trackingId} onKeyDown={handleKeyPress}  placeholder='Scan to RTD' className=" px-3 py-1 border-black border-[2px] outline-none rounded-md"/>
<button onClick={()=>{handleSubmit()}} className="bg-blue-500 rounded-md px-2 uppercase text-white border-black border-[1px] " >Search</button>
        </div>
        <div className="text-red-600 text-[12px]">{serialdata?.error}</div>
         <div className="  mt-3 w-[2020px] h-[510px]">
            <div className="bg-[#464646] flex sticky top-3 z-20  text-white mb-2  px-2 items-center lg: ">
                <div className=" border-white  px-3 py-1  w-[130px] ">Bill Date</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">Platform</div>
                 <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Bill No</div>
                <div className="border-l-[1px] border-white w-[110px]  px-3 py-1 ">Order Id</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Product</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">Quntity</div>
                <div className="border-l-[1px] border-white w-[150px]  px-3 py-1 ">Sales Amount</div>
                <div className="border-l-[1px] border-white w-[150px]  px-3 py-1 ">Transfer Price</div>
                <div className="border-l-[1px] border-white w-[160px]  px-3 py-1 ">Payment mode</div>
                <div className="border-l-[1px] border-white w-[120px]  px-3 py-1 ">LR NO.</div>
                <div className="border-l-[1px] border-white w-[140px]  px-3 py-1 ">Tracking ID</div>
                <div className="border-l-[1px] border-white w-[100px]  px-3 py-1 ">State</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Delivery By date</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Shipping Charges</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Courier</div>
                <div className="border-l-[1px] border-white w-[180px]  px-3 py-1 ">Dispatch by date</div>
            </div>

            {data?.orders?.map((person) => {
 
 const bdate = new Date(person.Billdate);
 const boptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let Billdate = bdate.toLocaleDateString('en-IN', boptions);
Billdate = Billdate.split('/').join('-');


const Dispatch = new Date(person.Dispatchbydate);
const doptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let Dispatchdate = Dispatch.toLocaleDateString('en-IN', doptions);
Dispatchdate = Dispatchdate.split('/').join('-');


const Deliverybydate = new Date(person.Deliverybydate);
const dioptions = { year: 'numeric', month: '2-digit', day: '2-digit', };
let Deliverybydate1 = Deliverybydate.toLocaleDateString('en-IN', dioptions);
Deliverybydate1 = Deliverybydate1.split('/').join('-');



 return (
            <div key={person._id} className="bg-[#f2f2f2] flex   text-black   px-2 items-center ">
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" px-3 py-1 overflow-x-auto w-[130px] ">{Billdate}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person?.Platform?.name}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Billno}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[110px] overflow-x-auto px-3 py-1 ">{person.OrderId}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Product}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.Quntity}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[150px] overflow-x-auto px-3 py-1 ">{person.Salesamount}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[150px] overflow-x-auto px-3 py-1 ">{person.TransferPrice}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[160px] overflow-x-auto px-3 py-1 ">{person.Paymentmode}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[120px] overflow-x-auto px-3 py-1 ">{person.Lrno}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[140px] overflow-x-auto px-3 py-1 ">{person.trackingnumber}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[100px] overflow-x-auto px-3 py-1 ">{person.State}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[180px] overflow-x-auto px-3 py-1 ">{Deliverybydate1}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[180px] overflow-x-auto px-3 py-1 ">{person.shippingcharge}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[180px] overflow-x-auto px-3 py-1 ">{person.courier}</Link>
                <Link  to="/home/Searchpage" onClick={() => setsingleorderid(person._id)} className=" w-[180px] overflow-x-auto px-3 py-1 ">{Dispatchdate}</Link>



                { openItemId === person._id &&<div className=" sticky right-0 flex gap-2     z-10">
          <div className=" top-[-19px]  absolute right-28  bg-white  border-black border-[1px] p-2  ">
      


<div className="opstion">
      
        
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="Not Sent"&&'bg-blue-400'}`} onClick={()=>{changestatus("Not Sent",person._id)}} value="delivered">Not Sent</option>
        <option className={`text-[12px] cursor-pointer ${selectedStatus=="Cancel"&&'bg-blue-400'}`} onClick={()=>{changestatus("Cancel",person._id)}} value="canceled">Cancel</option>
    
    </div>
    <div className="flex justify-center mt-1">
      <button className="text-[10px] bg-blue-600 rounded-full   items-center   text-white px-2  " onClick={()=>{update(selectedStatus,id)}}>Update</button>
    </div> 
    </div>
    </div>}
    <div className=" sticky right-0 flex gap-2  bottom-2 z-10">

<div  
  className="bg-black rounded-full w-6 h-6 flex justify-center items-center  absolute bottom-3 right-16 text-white     text-[16px]  "
  onClick={() => toggleOpen(person._id)}
 >
 <MdOutlineSystemSecurityUpdate  />   
</div>
{userrole?.role == 1 &&
<div   onClick={()=>{onclickedit(person)}}
  className="bg-black rounded-full w-6 h-6 flex justify-center items-center  absolute bottom-3 right-8 text-white     text-[16px]  "
 >
 <MdEdit />   
</div>}
{userrole?.role == 1 &&
<div  
  className="bg-red-400 rounded-full absolute bottom-3 right-0 w-6 h-6 flex justify-center items-center  text-white    text-[16px]  "
 >
  < MdDelete />    
</div>}
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

