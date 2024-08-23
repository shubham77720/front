import axios from 'axios';
import { useState, useRef } from 'react';

export default function CreateProducts() {
  const [productdata, setproductdata] = useState({name:"",othername:"",category:"",MRP:"",salingprice:"",Cost:"",Serialrequired:""});
  const [serialRES, setSerialRES] = useState('');
  const [serialInput, setSerialInput] = useState('');
  const [errdata, seterrdata] = useState('');
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
   const apiKey = "https:/backenddata77720.onrender.com";
 
  // Create refs for input fields
  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const MRPRef = useRef(null);
  const salingpriceRef = useRef(null);
  const serialInputRef = useRef(null);
  const SerialrequiredRef = useRef(null);

  const handleChange = (e) => {
    setSerialInput(e.target.value);
  };

  const handleAddSerial = () => {
    if (serialInput.trim() && !serialNumbers.includes(serialInput.trim())) {
      setSerialNumbers([...serialNumbers, serialInput.trim()]);
      setSerialInput('');
    }
  };

  const handleKeyPress = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current.focus(); // Move focus to the next input
    }
  };

  const handleRemoveSerial = (serialToRemove) => {
    setSerialNumbers(serialNumbers.filter(serial => serial !== serialToRemove));
  };

  const validateForm = () => {
    const errors = {};
    const { name, category, MRP, salingprice,  Serialrequired } = productdata;

    if (!name.trim()) errors.name = 'Product name is required';
    if (!category.trim()) errors.category = 'Category is required';
    if (!MRP.trim() || isNaN(MRP)) errors.MRP = 'Valid MRP is required';
    if (!salingprice.trim() || isNaN(salingprice)) errors.salingprice = 'Valid selling price is required';
    //  if (serialNumbers.length === 0) errors.serialNumbers = 'At least one serial number is required';
    if (!Serialrequired) errors.Serialrequired = 'Serial requirement status is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addproduct = async () => {
    if (!validateForm()) return;
     try {
      const { name, category, MRP, salingprice, Serialrequired } = productdata;
      let name1 = name.toString();
      let Category1 = category.toString();
      let MRP1 = MRP.toString();
      let salingprice1 = salingprice.toString();
      let Serialrequired1 = Serialrequired.toString();
       let token = localStorage.getItem('token');

      let response = await axios.post(
        `${apiKey}/api/product/addproduct`,
        { name: name1, category: Category1, MRP: MRP1, salingprice: salingprice1,   othername: serialNumbers, Serialrequired: Serialrequired1 },
        { headers: { "authtoken": token } }
      );
      seterrdata(response.data);
      //console.log(response.data)
      setSerialRES(response?.data?.data?.othername);
       setproductdata({name:"",othername:"",category:"",MRP:"",salingprice:"", Serialrequired:""})
 
     } catch (error) {
      console.error('Error:', error);
    }
  };
 //console.log(errdata)
  const onchange = (e) => {
    setproductdata({...productdata, [e.target.name]: e.target.value});
  };

  const handleChanges = (e) => {
    setproductdata({
      ...productdata,
      Serialrequired: e.target.value,
    });
  };

  const options = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'NO' },
  ];

  return (
    <>
      <div className="">
        <div className="mt-4 lg:w-full">
          <div className='text-[12px] ml-2 text-red-600'>
            {errdata?.message} {errdata?.data?.name}
          </div>
          <div className="bg-[#f2f2f2] grid md:grid-cols-2 text-black px-2 gap-6 md:gap-6 items-start">
            <div>
             <input 
              type='text' 
              name='name' 
              onChange={onchange} 
              value={productdata.name} 
              placeholder='Product Name' 
              ref={nameRef}
              onKeyPress={(e) => handleKeyPress(e, categoryRef)} 
              className={`px-3 py-1 border-black w-[100%] border-[2px] rounded-md ${formErrors.name ? 'border-red-500' : ''}`}
              />
            {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
              </div>
<div>

            <input 
              type='text' 
              name='category' 
              onChange={onchange} 
              value={productdata.category} 
              placeholder='Category' 
              ref={categoryRef}
              onKeyPress={(e) => handleKeyPress(e, MRPRef)} 
              className={`px-3 py-1 border-black  w-[100%] border-[2px] rounded-md ${formErrors.category ? 'border-red-500' : ''}`}
              />
            {formErrors.category && <p className="text-red-500 text-xs">{formErrors.category}</p>}
              </div>
<div>

            <input 
              type='text' 
              name='MRP' 
              onChange={onchange} 
              value={productdata.MRP} 
              placeholder='MRP' 
              ref={MRPRef}
              onKeyPress={(e) => handleKeyPress(e, salingpriceRef)} 
              className={`px-3 py-1 border-black w-[100%] border-[2px] rounded-md ${formErrors.MRP ? 'border-red-500' : ''}`}
              />
            {formErrors.MRP && <p className="text-red-500 text-xs">{formErrors.MRP}</p>}
              </div>
<div>

            <input 
              type='text' 
              name='salingprice' 
              onChange={onchange} 
              value={productdata.salingprice} 
              placeholder='Selling Price' 
              ref={salingpriceRef}
              onKeyPress={(e) => handleKeyPress(e, serialInputRef)} 
              className={`px-3 py-1 border-black w-[100%] border-[2px] rounded-md ${formErrors.salingprice ? 'border-red-500' : ''}`}
              />
            {formErrors.salingprice && <p className="text-red-500 text-xs">{formErrors.salingprice}</p>}
              </div>

            
          

            <div className=''>
              <div className='flex'>
                <input 
                  type='text'
                  onChange={handleChange}  
                  onKeyPress={(e) => handleKeyPress(e, SerialrequiredRef)}  
                  value={serialInput} 
                  name='serialNumbers'  
                  placeholder="Enter othername" 
                  ref={serialInputRef}
                  className={`px-3 py-1 w-[100%] border-black border-[2px] rounded-md ${formErrors.serialNumbers ? 'border-red-500' : ''}`}
                />
                <button 
                  type="button"  
                  className='w-[100px]' 
                  onClick={handleAddSerial}
                >
                  Add Name
                </button>
              </div>

              {formErrors.serialNumbers && <p className="text-red-500 text-xs">{formErrors.serialNumbers}</p>}

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

            <div className="grid md:grid-cols-1 text-black px-2 gap-2 md:gap-3 items-center">
              <select
                name="Serialrequired"
                onChange={handleChanges}
                value={productdata.Serialrequired}
                ref={SerialrequiredRef}
                className={`px-3 py-1 border-black border-[2px] rounded-md ${formErrors.Serialrequired ? 'border-red-500' : ''}`}
              >
                <option value="">Select Serial Requirement</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formErrors.Serialrequired && <p className="text-red-500 text-xs">{formErrors.Serialrequired}</p>}
            </div>       
          </div>

          <div className='flex justify-center mt-5 w-full'>
            <button 
              onClick={addproduct} 
              className="bg-blue-500 text-white font-bold py-2 px-4 w-[50%] rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
