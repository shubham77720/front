import React, { useEffect, useState } from 'react';
import DataContext from './DataContext';
import axios from 'axios';

const DataProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [exceldata, setexceldata] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [singleorderid, setsingleorderid] = useState("");
  const [searcheddata, setsearcheddata] = useState("");
  const [userrole, setuserrole] = useState("");
  const [date, setdate] = useState({ startDate: "", endDate: "" });
  const [platformdata, setplatform] = useState("");
  const [singlepurchase, setsinglePurchase] = useState(null);
   const apiKey = "https://backenddata77720.onrender.com"
 
  // Function to get headers with token
  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        'authtoken': token,
      }
    };
  };

  const updateOrderStatus = async (status, id, productdata) => {
    try {
      const response = await axios.put(`${apiKey}/api/order/orderstatus/${id}`, {
        status: status,
        productdata
      }, getHeaders()); // Add headers here
      setStatus(response.status);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating order status:', error);
      setStatus(error.response ? error.response.status : 'Error');
    }
  };

  const fetchSinglePurchase = async (id) => {
    try {
      const response = await axios.get(`${apiKey}/api/purchase/fetchsinglepurchase/${id}`, getHeaders()); // Add headers here
      setsinglePurchase(response.data);
    } catch (err) {
      console.error('Error fetching single purchase:', err);
    }
  };

  const [products, setProducts] = useState([]);
  const [comboProducts, setcomboProducts] = useState([]);

 
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiKey}/api/product/productnames`, getHeaders()); // Add headers here
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchcomboProducts = async () => {
      try {
        const response = await axios.get(`${apiKey}/api/combo/fetchcomboforadmin`, getHeaders()); // Add headers here
        let array1 = await response?.data?.comboproducts;
        setcomboProducts(array1);
      } catch (error) {
        console.error('Error fetching combo products:', error);
      }
    };

  

  const fetchplatform = async () => {
    try {
      const response = await axios.get(`${apiKey}/api/Platform/fetchallPlatform`, getHeaders()); // Add headers here
      setplatform(response.data);
    } catch (error) {
      console.error('Error fetching platform:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      status, products, searcheddata, setsearchdata, comboProducts,fetchProducts,fetchcomboProducts, userrole, setplatform, platformdata,
      fetchplatform, setuserrole, searchdata, exceldata, singleorderid, setsingleorderid, setexceldata, date, setdate,
      setsearcheddata, updateOrderStatus, fetchSinglePurchase, singlepurchase
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
