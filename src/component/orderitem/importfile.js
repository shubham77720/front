import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { CiImport } from "react-icons/ci";

export default function Importfile(params) {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [existingProducts, setExistingProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     const apiKey = "https:/backenddata77720.onrender.com";
  
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            let jsonData = XLSX.utils.sheet_to_json(sheet);

            jsonData = jsonData.map(row => {
                const newRow = {};
                Object.entries(row).forEach(([key, value]) => {
                    const newKey = key.replace(/ /g, '_').replace(/&/g, '').replace(/\./g, '');
                    newRow[newKey] = value;
                });
                return newRow;
            });

            const formatDate = (serialDate) => {
                if (serialDate == null || isNaN(serialDate)) return '';
                try {
                    const date = XLSX.SSF.parse_date_code(serialDate);
                    if (!date) return '';
                    const d = new Date(date.y, date.m - 1, date.d);
                    const month = (d.getMonth() + 1).toString().padStart(2, '0');
                    const day = d.getDate().toString().padStart(2, '0');
                    const year = d.getFullYear();
                    return `${month}/${day}/${year}`;
                } catch (error) {
                    console.error('Date parsing error:', error);
                    return '';
                }
            };
             const convertedData = jsonData.map(item => ({
                Platform:  item.platform,
                OrderId: item.Order_Id,
                Product: item.Product,
                TransferPrice: Number(item.Price_inc_FKMP_Contribution_Subsidy),
                Salesamount: Number(item.Invoice_Amount),
                Quntity: Number(item.Quantity),
                Tax: item.IGST ? `IGST ${item.IGST}%` : 'NA',
                Paymentmode: '',
                Address: `${item.Address_Line_1 || ''}, ${item.Address_Line_2 || ''}`,
                Pincode: Number(item.PIN_Code),
                 State: item.State,
                Dispatchbydate: formatDate(item.Dispatch_by_date),
                Deliverybydate: formatDate(item.Dispatch_After_date),
                shippingcharge: item.Shipping_and_Handling_Charges,
                shipdate: item.Ordered_On ? formatDate(item.Ordered_On) : '',
                 Billno: item.Invoice_No,
                Billdate: formatDate(item.Invoice_Date ),
                orderdate: formatDate(item.Ordered_On),
                 trackingnumber: item.Tracking_ID,
                status: "neworder"
            }));

            showdata(convertedData);
            setData(convertedData);

          };

        reader.readAsBinaryString(file);
    };

    const handleFileUpload2 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            let jsonData = XLSX.utils.sheet_to_json(sheet);

            jsonData = jsonData.map(row => {
                const newRow = {};
                Object.entries(row).forEach(([key, value]) => {
                    const newKey = key.replace(/ /g, '_').replace(/&/g, '').replace(/\./g, '');
                    newRow[newKey] = value;
                });
                return newRow;
            });

            const formatDate = (serialDate) => {
                if (serialDate == null || isNaN(serialDate)) return '';
                try {
                    const date = XLSX.SSF.parse_date_code(serialDate);
                    if (!date) return '';
                    const d = new Date(date.y, date.m - 1, date.d);
                    const month = (d.getMonth() + 1).toString().padStart(2, '0');
                    const day = d.getDate().toString().padStart(2, '0');
                    const year = d.getFullYear();
                    return `${month}/${day}/${year}`;
                } catch (error) {
                    console.error('Date parsing error:', error);
                    return '';
                }
            };
            //console.log(jsonData)
            const convertedData = jsonData.map(item => ({
               
                 Platform: item.Platform || null,
                OrderId: item.Order_ID,
                Product: item.Product,
                TransferPrice: Number(item.Shipping_Charges),
                Salesamount:  item.Amount,
                Quntity: Number(item.Qty),
                 Paymentmode: item.Payment_Mode || '',
                Address: `${item.Address|| ''},  `,
                Pincode: Number(item.Pincode),
                MobNo: item.MobNo || null,
                State: item.State,
                  Dispatchbydate: formatDate(` `),
                Deliverybydate: formatDate(item.Delivery_Date),
                Condition: item.Order_State,
                shippingcharge: item.Shipping_Charges || 0,
                refundCondition: item.refundCondition || '',
                refunddate: formatDate(new Date()),
                shipdate: item.Ordered_On ? formatDate(item.Ordered_On) : '',
                productdata: item.productdata || null,
                OFDdate: item.OFDdate || '',
                courier: item.Courier || '',
                Billno: item.Bill_No,
                Billdate: formatDate(item.Bill_Date),
                 Lrno: item.LRNo                || '',
                trackingnumber: item.Tracking_ID,
                status: "neworder"
            }));

            showdata(convertedData);
        };

        reader.readAsBinaryString(file);
    };

    const fetchProductname = async (name) => {
        let token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${encodeURIComponent(name)}`,{method: 'GET',
                headers:{
                     
                    'authtoken': token
                },
               });
            return response?.data?.othername1?.name || null;
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    };

    const fetchcomboProductname = async (name) => {
        try {
            let token = localStorage.getItem('token')
            const response = await axios.get(`${apiKey}/api/combo/fetchsinglecombo/${encodeURIComponent(name)}`,{method: 'GET',
                headers:{
                     
                    'authtoken': token
                },
               });
            return response?.data?.othername1?.name || null;
        } catch (error) {
            console.error('Error fetching combo product:', error);
            return null;
        }
    };

    const fetchplatform = async (name) => {
        let token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${apiKey}/api/platform/fetchplatform/${encodeURIComponent(name)}`,{method: 'GET',
                headers:{
                     
                    'authtoken': token
                },
               });
              return response?.data?._id  || null;

        } catch (error) {
            console.error('Error fetching platform:', error.message);
            // Optionally log more details
            console.error('Error config:', error.config);
            
            return null;
        }
    };
    

    const checkProductExists = async (product) => {
        if (!product) {
            console.warn('Product is undefined or null');
            return null;
        }
  
        if (product.includes("+")) {
            return await fetchcomboProductname(product);
        } else {
            return await fetchProductname(product);
        }
    };

    const checkPlatformExists = async (platform) => {
        if (!platform) {
            console.warn('Platform is undefined or null');
            return null;
        }
  
        return await fetchplatform(platform);
    };

    const getExistingProducts = async (data) => {
         const existingProducts = [];

        for (const element of data) {

             if (!element.Product) {
                console.warn('Product is missing in element:', element);
                continue;
            }
            const productName = await checkProductExists(element.Product);
            const platformId = await checkPlatformExists(element.Platform);

             if (productName) {
                existingProducts.push({
                    ...element,
                    Product: productName,
                    Platform: platformId  
                });
                //console.log(`Product ${productName} exists.`);
            } else {
                console.warn(`Product ${element.Product} does not exist.`);
            }
        }

        return existingProducts;
    };

    const showdata = async (data) => {
        try {
            setLoading(true);
            const existingProducts = await getExistingProducts(data);
            setExistingProducts(existingProducts);
            setLoading(false);
        } catch (err) {
            console.error('Error in showdata:', err);
            setError(err);
            setLoading(false);
        }
    };

    const addOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'authtoken': token }
            };
            await axios.post(`${apiKey}/api/order/addmultiorders`, existingProducts, config);
            alert("Data Added Successfully");
        } catch (err) {
            console.error('Error adding order:', err);
            alert("Error adding data");
        }
    };

    useEffect(() => {
        // Code to execute on component mount if needed
    }, []);
//console.log(existingProducts)
    return (
        <div>
            <h2>Import File</h2>
            <input type="file" onChange={handleFileUpload} />
            <input type="file" onChange={handleFileUpload2} />
           {existingProducts.length !== 0 && <button onClick={addOrder}>Add Order</button>}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className='h-[600px] p-6 border-[1px] border-gray-600 mt-3 rounded-md overflow-y-scroll'>
                <ul className='flex gap-3 flex-wrap'>
                    {existingProducts.map((product, index) => (
                        <li key={index}>{product.Product} - Platform ID: {product.Platform}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
