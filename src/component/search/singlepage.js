import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DataContext from "../usecontext/DataContext";

export default function Singlepage(params) {
  const { singleorderid,platformdata,fetchplatform,userrole } = useContext(DataContext);
  const [editMode, setEditMode] = useState(false);  // New state for edit mode
  const [formData, setFormData] = useState({});  // New state for form data
   const apiKey = "https:/backenddata77720.onrender.com";
 
  useEffect(() => {
    getOrder(singleorderid);
    fetchplatform()
  }, [singleorderid]);
   const getOrder = (orderId) => {
    let token = localStorage.getItem('token');
    axios.get(`${apiKey}/api/order/fetchorderforadmin/${orderId}`, {
      method: 'GET',
      headers: {
        'authtoken': token
      },
    })
      .then(response => {
        setFormData(response.data);  // Initialize form data with received order data
      })
      .catch(error => {
        console.error('Error fetching order:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    axios.put(`${apiKey}/api/order/updateorder/${singleorderid}`, formData, {
      headers: {
        'authtoken': token
      },
    }) 
      .then(response => {
        //console.log('Update successful:', response.data);
        setEditMode(false);
        getOrder(singleorderid);  // Refresh data after update
      })
      .catch(error => {
        console.error('Error updating order:', error);
      });
  };



 

let confirm11 =(id)=>{
  let token = localStorage.getItem('token')
  if (window.confirm("Do you really want to delete?")) {
    axios.delete(`${apiKey}/api/order/deleteorder/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': token
      }})    
     }
    
}
  return (
    <div className="md:w-[85%] lg:w-[90%] w-full px-4 mt-16">
      {editMode ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Order ID:</label>
              <input type="text" name="OrderId" value={formData.OrderId} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Product:</label>
              <input type="text" name="Product" value={formData.Product} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Quantity:</label>
              <input type="number" name="Quntity" value={formData.Quntity} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Platform:</label>
              <select
name="Platform"
onChange={handleInputChange}
value={formData?.Platform?.name}
className="px-3 py-1 border-black border-[2px] rounded-md"
>
<option value="Platform"  >
Platform
</option>
{platformdata.map((option) => (
  <option key={option._id} value={option._id}>
    {option.name}
  </option>
))}
</select>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Transfer Price:</label>
              <input type="number" name="TransferPrice" value={formData.TransferPrice} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Sales Amount:</label>
              <input type="number" name="Salesamount" value={formData.Salesamount} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Tax:</label>
              <input type="text" name="Tax" value={formData.Tax} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Payment Mode:</label>
              <input type="text" name="Paymentmode" value={formData.Paymentmode} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Address:</label>
              <input type="text" name="Address" value={formData.Address} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Pincode:</label>
              <input type="number" name="Pincode" value={formData.Pincode} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Mobile No:</label>
              <input type="text" name="MobNo" value={formData.MobNo} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">State:</label>
              <input type="text" name="State" value={formData.State} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Bill No:</label>
              <input type="text" name="Billno" value={formData.Billno} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Bill Date:</label>
              <input type="date" name="Billdate" value={formData.Billdate} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Tracking Number:</label>
              <input type="text" name="trackingnumber" value={formData.trackingnumber} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">Status:</label>
              <input type="text" name="status" value={formData.status} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            {/* Continue adding fields for all other properties */}
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <p><strong>Order ID:</strong> {formData.OrderId}</p>
            </div>
            <div>
              <p><strong>Product:</strong> {formData.Product}</p>
            </div>
            <div>
              <p><strong>Quantity:</strong> {formData.Quntity}</p>
            </div>
            <div>
              <p><strong>Platform:</strong> {formData?.Platform?.name}</p>
            </div>
            <div>
              <p><strong>Transfer Price:</strong> {formData.TransferPrice}</p>
            </div>
            <div>
              <p><strong>Sales Amount:</strong> {formData.Salesamount}</p>
            </div>
            <div>
              <p><strong>Tax:</strong> {formData.Tax}</p>
            </div>
            <div>
              <p><strong>Payment Mode:</strong> {formData.Paymentmode}</p>
            </div>
            <div>
              <p><strong>Address:</strong> {formData.Address}</p>
            </div>
            <div>
              <p><strong>Pincode:</strong> {formData.Pincode}</p>
            </div>
            <div>
              <p><strong>Mobile No:</strong> {formData.MobNo}</p>
            </div>
            <div>
              <p><strong>State:</strong> {formData.State}</p>
            </div>
            <div>
              <p><strong>Bill No:</strong> {formData.Billno}</p>
            </div>
            <div>
              <p><strong>Bill Date:</strong> {formData.Billdate}</p>
            </div>
            <div>
              <p><strong>Tracking Number:</strong> {formData.trackingnumber}</p>
            </div>
            <div>
              <p><strong>Status:</strong> {formData.status}</p>
            </div>
            {/* Continue displaying fields for all other properties */}
          </div>
         {userrole.role === 1 && <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white p-2 rounded">Edit</button>}
         {userrole.role === 1 &&  <button onClick={()=>{confirm11(singleorderid)}} className="bg-red-500 ml-3 text-white p-2 rounded">
              Delete
            </button>
          }
        </div>
      )}
    </div>
  );
}
