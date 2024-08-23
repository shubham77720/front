import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../usecontext/DataContext';

export default function Createorderpage() { 
  const apiKey = "https://backenddata77720.onrender.com"
 
  const [productdata, setProductData] = useState({
    Platform: "",
    OrderId: "",
    Product: "",
    Quntity: "",
    TransferPrice: "",
    SalesAmount: "",
    Tax: "",
    Paymentmode: "",
    Address: "",
    Pincode: "",
    State: "",
    MobNo: "",
    Dispatchbydate: "",
    orderdate: ""
  });

  const { products,fetchProducts,    fetchcomboProducts,    comboProducts } = useContext(DataContext);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const fetchProductname = async (name) => {
    let token = localStorage.getItem('token')
    try {
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

  const fetchcomboProductname = async (name) => {
    let token =localStorage.getItem('token')
    try {
      const response = await axios.get(`${apiKey}/api/combo/fetchsinglecombo/${name}`,{method: 'GET',
        headers:{
             
            'authtoken': token
        },
       });
      setQuery(response?.data?.othername1?.name);
      //console.log(response?.data?.othername1?.name);
    } catch (error) {
      console.error('Error fetching combo products:', error);
    }
  };

  useEffect(() => {
    fetchProducts()
    fetchcomboProducts()
    let productNames = products?.productNames?.concat(comboProducts);
    if (query) {
      setFilteredProducts(productNames.filter(name =>
        name.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredProducts([]);
    }
  }, [query, products, comboProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSuggestionClick = (name) => {
    if (name.includes("+")) {
      fetchcomboProductname(name);
    } else {
      fetchProductname(name);
    }
    setFilteredProducts([]);
  };


   //console.log(productdata)
  const validateForm = () => {
    const errors = {};
    if (!productdata.Platform) errors.Platform = "Platform is required";
    if (!productdata.OrderId) errors.OrderId = "Order ID is required";
    if (!query) errors.Product = "Product is required";
    if (!productdata.Quntity || isNaN(productdata.Quntity)) errors.Quntity = "Quantity must be a number";
    if (!productdata.TransferPrice || isNaN(productdata.TransferPrice)) errors.TransferPrice = "Transfer Price must be a number";
    if (!productdata.SalesAmount || isNaN(productdata.SalesAmount)) errors.SalesAmount = "Sales Amount must be a number";
    if (!productdata.Tax || isNaN(productdata.Tax)) errors.Tax = "Tax must be a number";
    if (!productdata.Paymentmode) errors.Paymentmode = "Payment mode is required";
    if (!productdata.Address) errors.Address = "Address is required";
    if (!productdata.Pincode || isNaN(productdata.Pincode)) errors.Pincode = "Pincode must be a number";
    if (!productdata.State) errors.State = "State is required";
    if (!productdata.MobNo || isNaN(productdata.MobNo)) errors.MobNo = "Mobile No must be a number";
    if (!productdata.Dispatchbydate) errors.Dispatchbydate = "Dispatch by date is required";
    if (!productdata.orderdate) errors.orderdate = "Order date is required";
    return errors;
  };

  const addProduct = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      let {
        Platform, OrderId, Quntity, TransferPrice, SalesAmount,
        Tax, Paymentmode, Address, Pincode, State, MobNo, Dispatchbydate, orderdate
      } = productdata;

      Platform = Platform.toString();
      OrderId = OrderId.toString();
      Quntity = Quntity.toString();
      TransferPrice = TransferPrice.toString();
      SalesAmount = SalesAmount.toString();
      Tax = Tax.toString();
      Paymentmode = Paymentmode.toString();
      Address = Address.toString();
      Pincode = Pincode.toString();
      State = State.toString();
 
      MobNo = MobNo.toString();
      Dispatchbydate = Dispatchbydate.toString();

      let token = localStorage.getItem('token');
      await axios.post(
        `${apiKey}/api/order/addorders`,
        {
          Platform, OrderId, Product: query, Quntity, status: "neworder", TransferPrice, SalesAmount, orderdate,
          Tax, Paymentmode, Address, Pincode, State, MobNo, Dispatchbydate
        },
        {
          headers: { "authtoken": token }
        }
      ).then(response => console.log("response.data"))
        .catch(err => console.log(err));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPlatform();
  }, []);

  const fetchPlatform = () => {
    let token = localStorage.getItem('token')
    axios.get(`${apiKey}/api/Platform/fetchallPlatform`,{method: 'GET',
      headers:{
           
          'authtoken': token
      },
     })
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Create Order</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
            <input type="date" name="orderdate" onChange={handleChange} value={productdata.orderdate} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.orderdate && <p className="text-red-500 text-xs mt-1">{formErrors.orderdate}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select name="Platform" onChange={handleChange} value={productdata.Platform} className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">Select Platform</option>
              {data.map(option => (
                <option key={option._id} value={option._id}>{option.name}</option>
              ))}
            </select>
            {formErrors.Platform && <p className="text-red-500 text-xs mt-1">{formErrors.Platform}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
            <input type="text" name="OrderId" onChange={handleChange} value={productdata.OrderId} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.OrderId && <p className="text-red-500 text-xs mt-1">{formErrors.OrderId}</p>}
          </div>

          <div className="mb-2 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <input type="text" onChange={e => setQuery(e.target.value)} value={query} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Search product" />
            {filteredProducts.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded-md mt-1 h-[200px] overflow-scroll w-full z-10">
                {filteredProducts.map((name, index) => (
                  <div key={index} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(name)}>
                    {name}
                  </div>
                ))}
              </div>
            )}
            {formErrors.Product && <p className="text-red-500 text-xs mt-1">{formErrors.Product}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input type="text" name="Quntity" onChange={handleChange} value={productdata.Quntity} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.Quntity && <p className="text-red-500 text-xs mt-1">{formErrors.Quntity}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Price</label>
            <input type="text" name="TransferPrice" onChange={handleChange} value={productdata.TransferPrice} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.TransferPrice && <p className="text-red-500 text-xs mt-1">{formErrors.TransferPrice}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sales Amount</label>
            <input type="text" name="SalesAmount" onChange={handleChange} value={productdata.SalesAmount} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.SalesAmount && <p className="text-red-500 text-xs mt-1">{formErrors.SalesAmount}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
            <input type="text" name="Tax" onChange={handleChange} value={productdata.Tax} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.Tax && <p className="text-red-500 text-xs mt-1">{formErrors.Tax}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
            <input type="text" name="Paymentmode" onChange={handleChange} value={productdata.Paymentmode} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.Paymentmode && <p className="text-red-500 text-xs mt-1">{formErrors.Paymentmode}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" name="Address" onChange={handleChange} value={productdata.Address} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.Address && <p className="text-red-500 text-xs mt-1">{formErrors.Address}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
            <input type="text" name="Pincode" onChange={handleChange} value={productdata.Pincode} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.Pincode && <p className="text-red-500 text-xs mt-1">{formErrors.Pincode}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" name="State" onChange={handleChange} value={productdata.State} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.State && <p className="text-red-500 text-xs mt-1">{formErrors.State}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
            <input type="text" name="MobNo" onChange={handleChange} value={productdata.MobNo} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.MobNo && <p className="text-red-500 text-xs mt-1">{formErrors.MobNo}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dispatch By Date</label>
            <input type="date" name="Dispatchbydate" onChange={handleChange} value={productdata.Dispatchbydate} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formErrors.Dispatchbydate && <p className="text-red-500 text-xs mt-1">{formErrors.Dispatchbydate}</p>}
          </div>

        </div>

        <div className="flex justify-center mt-5">
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
}
