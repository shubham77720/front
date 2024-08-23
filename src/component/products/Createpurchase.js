import axios from 'axios';
import { useEffect, useState } from 'react';

export default  function CreatePurchase (params) {



  const [productdata, setproductdata] = useState({billdate:"",billno:""})

 
let apiKey = "https://backenddata77720.onrender.com"
  const addpurchase = async (id) => {
      try {
const{ billdate,billno}=productdata
          let billdate1 = billdate.toString()
         let billno1 = billno.toString()
          let token = localStorage.getItem('token');
        await axios.post(
          `${apiKey}/api/purchase/addpurchase`,
          {productname:formValues,billdate:billdate1,billno:billno1,supplier:supplierquery,}, // send productdata as the request body
          {
            headers: { "authtoken": token }
          }
        )
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
      } catch (error) {
        console.error('Error:', error);
      }
      setFormValues([{ quantity: '', amount: '',productname:"",productid:"", serialNumbers: [], serialInput: '',rateper:"" }])
      setproductdata({billdate:"",billno:""})
      setsupplierQuery("")
    };
  

 
    const onchange =(e)=>{
      setproductdata({...productdata,[e.target.name]:[e.target.value]})
   }






   const [seriallength, setseriallength] = useState(0)

 
  const [serialInputValues, setSerialInputValues] = useState({}) 
 
  
  const handleChange = (event, index) => {
    const { name, value } = event.target;
   
    setSerialInputValues({
      ...serialInputValues,
      [index]: value
    });
  };

  
 

  const handleAddSerial = (e, index) => {
     //console.log("yew")
    const values = [...formValues];
    const valueToAdd = serialInputValues[index]; // Ensure the value is a number
  //console.log(valueToAdd)
  //console.log(values[FocusedIndexmain])
    // Check if the valueToAdd already exists in the serialNumbers array
    if (!values[FocusedIndexmain].serialNumbers.includes(valueToAdd)  ) {
        if(values[FocusedIndexmain].serialNumbers.length <= values[FocusedIndexmain].quantity){
         
        values[FocusedIndexmain].serialNumbers.push(valueToAdd);
        setFormValues(values);
        setSerialInputValues({
          ...serialInputValues,
          [index]: '' // Clear the input field for the current index
        });
      }


       const currentSerialLength = values[index].serialNumbers.length;
      setseriallength(currentSerialLength);
  
      if (values[index].quantity == currentSerialLength) {
        setserialpopview(false);
      } else {
        setserialpopview(true);
      }
    } else {
      // Optionally, you can handle the case where the serial number already exists
      //console.log('Serial number already exists');
    }
  };
 

 

 
  const handleKeyPress = (e,index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSerial(e,index);
    }
  };


 
  const handleRemoveSerial = (serialToRemove) => {
    const updatedFormValues = [...formValues];
    const currentSerialNumbers = updatedFormValues[FocusedIndexmain].serialNumbers;
    
    // Filter out the serial to be removed
    updatedFormValues[FocusedIndexmain].serialNumbers = currentSerialNumbers.filter(serial => serial !== serialToRemove);
  
    // Update the state
    setFormValues(updatedFormValues);
  };

  const [products, setProducts] = useState([]);
  const [supplier, setsupplier] = useState([]);
  const [query, setQuery] = useState('');
  const [supplierquery, setsupplierQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredsupplier, setFilteredsupplier] = useState([]);
  const [focusedIndex , setFocusedIndex] = useState([]);
  const [FocusedIndexmain , setFocusedIndexmain] = useState([]);
  const [serialpopview , setserialpopview] = useState(false);
  const [Serialrequired , setserialrequired] = useState('');
 

  useEffect(() => {
      const fetchProducts = async () => {
          try {
            let token = localStorage.getItem('token')
              const response = await axios.get(`${apiKey}/api/product/productnames`,{method: 'GET',
                headers:{
                     
                    'authtoken': token
                },
               });
              setProducts(response.data);
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };
      const fetchsupplier = async () => {
          try {
            let token =localStorage.getItem("token")
              const response = await axios.get(`${apiKey}/api/supplier/suppliernames`,{method: 'GET',
                headers:{
                     
                    'authtoken': token
                },
               });
              setsupplier(response.data);
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };


      fetchProducts();
      fetchsupplier()
  }, []);

   
 
useEffect(() => {
  if (query) {
      setFilteredProducts(products.productNames.filter(name =>
          name.toLowerCase().includes(query.toLowerCase())
      ));
  } else {
      setFilteredProducts([]);
  }
}, [query, products]);

useEffect(() => {
  if (supplierquery) {
      setFilteredsupplier(supplier.supplierNames.filter(name =>
          name.toLowerCase().includes(supplierquery.toLowerCase())
      ));
  } else {
      setFilteredsupplier([]);
  }
}, [supplierquery, supplier]);



 

const handleChangesupplier = (e) => {
  const value = e.target.value;
        setsupplierQuery(value);
         if (supplier.supplierNames.some(name => name.toLowerCase().includes(value.toLowerCase()))) {
            setsupplierQuery(value);
        } else   {
          setsupplierQuery(supplierquery);
        }
}; 




const handleSuggestionClick = async(name, index) => {
   try { let token = localStorage.getItem("token")
    const response = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${name}`,{method: 'GET',
      headers:{
           
          'authtoken': token
      },
     });
    setserialrequired(response?.data?.othername1?.Serialrequired)
    const values = [...formValues];
    values[index]['productname'] = response?.data?.othername1?.name;
    values[index]['productid'] = response?.data?.othername1?._id;
    setFormValues(values);
    setFilteredProducts([]);
} catch (error) {
    console.error('Error fetching products:', error);
}
  

};
const handleSuggestionClick1 = (name) => {
  setsupplierQuery(name);
  setFilteredsupplier([]);
};


const [formValues, setFormValues] = useState([{ quantity: '', amount: '',productname:"", serialNumbers: [], serialInput: '',rateper:"" }]);

const handleAddFields = () => {

  setFormValues([...formValues, { quantity: '', amount: '',productname:"", serialNumbers: [], serialInput: '',rateper:"" }]);
};

const handleRemoveFields = index => {
  const values = [...formValues];
  values.splice(index, 1);
  setFormValues(values);
};


 

const handleChangeV = async (index,event) => {

//console.log("this is daaaaaaaa",formValues)
     
  const values = [...formValues];
 
   const { name, value } = event?.target;
   let updatedItem = { ...values[index] };
  if (name === "rateper") {
    const amount = updatedItem.quantity * value;
    values[index]["amount"] = amount;
   }
   
  if(name === "amount"){

    const rateper = value / updatedItem.quantity;
    values[index]["rateper"] = rateper;



     if(Serialrequired !== "NO"){

  
    if(values[index]['quantity'] == seriallength){  //insert length of 
      setserialpopview(false)
      }else{

        setserialpopview(true)
      }  
     }
 
  }else{
    setserialpopview(false)

  }





  if(updatedItem.quantity !== 0 && name !== "quantity"){

    if(Serialrequired !== "NO"){

    if(values[index]['quantity'] == seriallength){  //insert length of 
      setserialpopview(false)
      }else{

        setserialpopview(true)
      }
    }
  }else{
    setserialpopview(false)

  }

 
 

  if (name === 'serialInput') {
    values[index][name] = value;
  } 
  else if (name === 'supplier') {
    values[index][name] = value;
    if (supplier.supplierNames.some(name => name.toLowerCase().includes(value.toLowerCase()))) {
      values[index][event.target.name] = event.target.value;
     } else   {
      return
    }

    if (value) {
      setFilteredsupplier(supplier.supplierNames.filter(name =>
          name.toLowerCase().includes(value.toLowerCase())
      ));
  } else {
      setFilteredsupplier([]);
  }
  } 
  else if (name === 'productname') {
    values[index][name] = value;
    if (products.productNames.some(name => name.toLowerCase().includes(value.toLowerCase()))) {
      values[index][event.target.name] = event.target.value;
     } else   {
      return
    }

    if (value) {
      setFilteredProducts(products.productNames.filter(name =>
          name.toLowerCase().includes(value.toLowerCase())
      ));
  } else {
      setFilteredProducts([]);
  }
  } 
  else {
    values[index][name] = value;
  }
  
   setFormValues(values);
};


//console.log(productdata)

 
 
    return(
        <>
        <div className=" ">
        <div className='flex gap-3 mt-2'>
        <div className='w-[50%]'>

<input type='text' onChange={handleChangesupplier} value={supplierquery} name='supplier' placeholder='supplier name' className=" px-3 py-1 border-black border-[2px] w-[100%] rounded-md  "/>
{filteredsupplier && <div className='absolute bg-gray-300 px-3 z-20  rounded-md'>

<div className="suggestions ">
{filteredsupplier.map((name, index) => (
    <div 
        key={index}
        className="suggestion  cursor-pointer"
        onClick={() => handleSuggestionClick1(name)}
    >
        {name}
    </div>
))}
</div>
</div>}
</div>
<input type='text' onChange={onchange} value={productdata.billno} name='billno' placeholder='billno' className=" px-3 py-1 border-black border-[2px] w-[25%] rounded-md"/> 
<input type='date' onChange={onchange} value={productdata.billdate} name='billdate' placeholder='bill date' className=" px-3 py-1 border-black border-[2px] w-[25%] rounded-md"/> 
        </div>
        <div className="form-inline flex relative mb-4 justify-between">
  <div className='w-[25%] font-semibold'>Productname</div>
  <div className='w-[25%] font-semibold'>Quantity</div>
  <div className='w-[25%] font-semibold'>Rate per</div>
  <div className='w-[25%] font-semibold'>Amount</div>
</div>
        <div  className='mt-3 w-[100%]' >
      {formValues.map((element, index) => (
        <div className="">



{index === FocusedIndexmain && element.quantity && serialpopview && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-md z-30">
    <div className="bg-white border-gray-500 p-4 border-[1px] rounded-md shadow-lg z-40 relative">
    <input type='text'onChange={(e)=>{handleChange(e,index)}}  onKeyPress={(e)=>{handleKeyPress(e,index)}}  value={serialInputValues[index] || ''} name='serialNumbers'  placeholder="Enter serial number..." className=" px-3 py-1 border-black border-[2px] rounded-md"/> 
            
            
          
            <button type="button" onClick={(e) => handleAddSerial(e,index)}>Add Serial</button>

      {element?.serialNumbers?.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold">Serial Numbers:</h2>
          <ul className="grid gap-2 w-[50%] mt-2">
            {element?.serialNumbers?.map((serial, idx) => (
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
  </div>
)}



        <div className="form-inline flex relative  justify-between"  onFocus={() => setFocusedIndexmain(index)} key={index}>
         
  <div className='inline-block w-[25%]'>
          <input type="text" className='w-[100%]'    onFocus={() => setFocusedIndex(index)} name="productname" value={element.productname || ''} onChange={e => handleChangeV(index, e)} placeholder="Product" />

 


 {focusedIndex === index && filteredProducts &&  <div className='absolute bg-gray-300 px-3  rounded-md'>

<div className="suggestions">
{filteredProducts.map((name,mapIndex ) => (
                    <div
                        key={mapIndex}
                        className="suggestion cursor-pointer"
                        onClick={( ) => handleSuggestionClick(name, index)}
                    >
                        {name}
                    </div>
                ))}
</div>
</div>}
</div>
        
          <input type="text"  className='w-[25%]  ' name="quantity" value={element.quantity || ''} onChange={e => handleChangeV(index, e)} placeholder="Quantity" />
          <input type="text"  className='w-[25%]  ' name="rateper" value={element.rateper || ''} onChange={e => handleChangeV(index, e)} placeholder="Rate per" />




          


          <input type="text"  className='w-[25%]  ' name="amount" value={element.amount || ''} onChange={e => handleChangeV(index, e)} placeholder="Amount" />
          

         
     
         
          {index ? <button className='absolute bg-white border-[1px] border-gray-400 rounded-md text-[12px] text-red-500 right-0' type="button" onClick={() => handleRemoveFields(index)}>Remove</button> : null}
        </div>
        </div>
      ))}
      <button type="button" onClick={() => handleAddFields( )}>Add More</button>
       
    </div>
     <div className='flex justify-center'>

         <div className='bg-blue-600 text-white py-1 px-3 rounded-md cursor-pointer' onClick={()=>{addpurchase()}}>Add Purchase</div>
     </div>
        </div>
        </>
    )
}

