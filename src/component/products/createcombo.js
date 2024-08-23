import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CreateCombo(params) {
  const [idsofproduct, setIdsofproduct] = useState([]);
  const [errdata, seterrdata] = useState('');
  const [serialInput, setSerialInput] = useState('');
  const [serialInput1, setSerialInput1] = useState('');
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [serialNumbers1, setSerialNumbers1] = useState([]);
  const [Serialrequired, setSerialrequired] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

    const apiKey = "https://backenddata77720.onrender.com"
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Define headers including the auth token
        const headers = {
          'authtoken': localStorage.getItem("token")
        };

        // Make the GET request with headers
        const response = await axios.get(`${apiKey}/api/product/productnames`, { headers });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
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

  const validateForm = () => {
    const errors = {};

    if (serialNumbers.length === 0) errors.serialNumbers = 'At least one product is required';
    // if (serialNumbers1.length === 0) errors.serialNumbers1 = 'At least one other name is required';
    if (!Serialrequired) errors.Serialrequired = 'Serial requirement status is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addpurchase = async () => {
    if (!validateForm()) return;

    try {
      let token = localStorage.getItem('token');
      await axios.post(
        `${apiKey}/api/combo/addcomboproduct`,
        { products: idsofproduct, Serialrequired, othername: serialNumbers1 },
        { headers: { "authtoken": token } }
      )
        .then((response) => seterrdata(response.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(idsofproduct,serialNumbers1)

  const fetchProductname = async (name) => {
    try {
      let token = localStorage.getItem('token')
      const response = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${name}`,{method: 'GET',
        headers:{
             
            'authtoken': token
        },
       });
       console.log(response.data.othername1)

       setQuery(response.data.othername1.name);
      setIdsofproduct((prevIds) => {
        if (!prevIds.includes(response.data.othername1._id)) {
          return [...prevIds, response.data.othername1._id];
        }
        return prevIds;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddSerial = () => {
    if (query.trim()) {
      setSerialNumbers([...serialNumbers, query.trim()]);
      setSerialInput('');
    }
  };

  const handleAddSerial1 = () => {
    if (serialInput1.trim()) {
      setSerialNumbers1([...serialNumbers1, serialInput1.trim()]);
      setSerialInput1('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSerial();
    }
  };

  const handleKeyPress1 = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSerial1();
    }
  };

  const handleRemoveSerial = (indexToRemove) => {
    setSerialNumbers(serialNumbers.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveSerial1 = (serialToRemove) => {
    setSerialNumbers1(serialNumbers1.filter(serial => serial !== serialToRemove));
  };

  const handleChanges = (e) => {
    setSerialrequired(e.target.value);
  };

  const options = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'NO' },
  ];

  const handleChange11 = (e) => {
    const value = e.target.value;
     if (products.productNames.some(name => name.toLowerCase().includes(value.toLowerCase()))) {
      setQuery(value)
      } else   {
      return
    }
  };

  const handleSuggestionClick = (name) => {
    fetchProductname(name);
   
    setFilteredProducts([]);
  };

  const handleChange = (e) => {
    setSerialInput1(e.target.value);
  };

  return (
    <>
      <div className="">
        <div className="mt-4 lg:w-full">
          <div className='text-[12px] ml-2 text-red-600'>{errdata?.message} {errdata?.data?.name}</div>

          <div className="bg-[#f2f2f2] grid md:grid-cols-2 text-black px-2 gap-6 md:gap-12 items-center">
            <div>
              <input
                type='text'
                onChange={handleChange11}
                onKeyPress={handleKeyPress}
                value={query}
                name='productname'
                placeholder='Product'
                className={`px-3 py-1 border-black border-[2px] rounded-md w-[100%] ${formErrors.serialNumbers ? 'border-red-500' : ''}`}
              />
              {formErrors.serialNumbers && <p className="text-red-500 text-xs">{formErrors.serialNumbers}</p>}
              {filteredProducts && (
                <div className='absolute bg-gray-300 px-3 rounded-md'>
                  <div className="suggestions">
                    {filteredProducts.map((name, index) => (
                      <div
                        key={index}
                        className="suggestion cursor-pointer"
                        onClick={() => handleSuggestionClick(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-1 text-black px-2 gap-2 md:gap-3 items-center">
              <select
                name="Serialrequired"
                onChange={handleChanges}
                value={Serialrequired}
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

          <div className='mt-2'>
            <div className='flex'>
              <input
                type='text'
                onChange={handleChange}
                onKeyPress={handleKeyPress1}
                value={serialInput1}
                name='serialNumbers'
                placeholder="Enter other name"
                className={`px-3 py-1 w-[100%] border-black border-[2px] rounded-md ${formErrors.serialNumbers1 ? 'border-red-500' : ''}`}
              />
              <button type="button" className='w-[100px]' onClick={handleAddSerial1}>Add Name</button>
            </div>
            {formErrors.serialNumbers1 && <p className="text-red-500 text-xs">{formErrors.serialNumbers1}</p>}
            {serialNumbers1.length > 0 && (
              <div className="mt-4">
                <h2 className="font-bold">other name</h2>
                <ul className="grid gap-2 w-[50%] mt-2">
                  {serialNumbers1.map((serial, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 border-gray-400 border-[1px] rounded-md px-2 items-center justify-between"
                    >
                      {serial}
                      <button
                        onClick={() => handleRemoveSerial1(serial)}
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

          {serialNumbers.length > 0 && (
            <div>
              <h2>Products</h2>
              <ul className='grid grid-cols-4 gap-2 w-[50%]'>
                {serialNumbers.map((serial, index) => (
                  <li key={index} className='flex gap-2 border-gray-400 border-[1px] rounded-md px-2 items-center justify-between'>
                    {serial}
                    <button onClick={() => handleRemoveSerial(index)}>x</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='flex justify-center mt-5 w-full'>
            <button
              onClick={addpurchase}
              className="bg-blue-500 text-white font-bold py-2 px-4 w-[50%] rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Combo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
