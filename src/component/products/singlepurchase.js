import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import DataContext from '../usecontext/DataContext';
import { MdEdit, MdDelete, MdOutlineSystemSecurityUpdate } from "react-icons/md";

export default function SinglePurchase() {
    const { singlepurchase, fetchSinglePurchase } = useContext(DataContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPurchase, setEditedPurchase] = useState(singlepurchase);
    const [suppliers, setSuppliers] = useState([]);
    const [productQuery, setProductQuery] = useState('');
    const [supplierQuery, setSupplierQuery] = useState('');
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
     const apiKey = "https:/backenddata77720.onrender.com";
  
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let token = localStorage.getItem("token");
                const response = await axios.get(`${apiKey}/api/product/productnames`, {
                    headers: { 'authtoken': token }
                });
                setProducts(response.data.productNames);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                let token = localStorage.getItem("token");
                const response = await axios.get(`${apiKey}/api/supplier/suppliernames`, {
                    headers: { 'authtoken': token }
                });
                setSuppliers(response.data.supplierNames);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchProducts();
        fetchSuppliers();
    }, []);

    useEffect(() => {
        if (productQuery) {
            setFilteredProducts(products.filter(name =>
                name.toLowerCase().includes(productQuery.toLowerCase())
            ));
        } else {
            setFilteredProducts([]);
        }
    }, [productQuery, products]);

    useEffect(() => {
        if (supplierQuery) {
            setFilteredSuppliers(suppliers.filter(name =>
                name.toLowerCase().includes(supplierQuery.toLowerCase())
            ));
        } else {
            setFilteredSuppliers([]);
        }
    }, [supplierQuery, suppliers]);

    const handleEditClick = () => {
        setEditedPurchase(singlepurchase);
        setIsEditing(true);
    };

    const handleProductSuggestionClick = async (name, index) => {
        try {
            let token = localStorage.getItem("token");
            const response = await axios.get(`${apiKey}/api/product/fetchsingleproduct/${name}`, {
                headers: { 'authtoken': token }
            });
            const productDetails = response.data.othername1;

            const updatedPurchase = { ...editedPurchase };
            updatedPurchase.purchase.name[index] = {
                ...updatedPurchase.purchase.name[index],
                productname: productDetails.name,
                productid: productDetails._id,
            };

            setEditedPurchase(updatedPurchase);
            setFilteredProducts([]);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        const updatedPurchase = { ...editedPurchase };
        updatedPurchase.purchase[field] = value; // Update the Supplier field
        setEditedPurchase(updatedPurchase);
    };
    

    const handleChangesupplier = (e,field) => {
        const value = e.target.value;
        // updatedPurchase.purchase[field] = value; // Update the Supplier field
        if (suppliers.some(name => name.toLowerCase().includes(value.toLowerCase()))) {
            const updatedPurchase = { ...editedPurchase };
            console.log("its work")
            updatedPurchase.purchase[field] = value; // Update the Supplier field
            setEditedPurchase(updatedPurchase);
        } else   {
            // const updatedPurchase = { ...editedPurchase };
            //        updatedPurchase.purchase[field] = value; // Update the Supplier field
            //        setEditedPurchase(updatedPurchase);
               }
      }; 

    const handleSupplierSuggestionClick = (name) => {
        setEditedPurchase({
            ...editedPurchase,
            purchase: {
                ...editedPurchase?.purchase,
                Supplier: name
            }
        });
        setFilteredSuppliers([]);
    };

    const handleSave = async () => {
        try {
            await updatePurchase(editedPurchase);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update purchase", error);
        }
    };

    const updatePurchase = async (editedPurchase) => {
        try {
            let token = localStorage.getItem("token");
            const response = await axios.put(
                `${apiKey}/api/purchase/updatepurchase/${editedPurchase?.purchase._id}`,
                editedPurchase?.purchase,
                {
                    method: 'PUT',
                    headers: {
                        'authtoken': token
                    },
                }
            );
            alert('Purchase updated successfully');
            fetchSinglePurchase(editedPurchase?.purchase._id);
        } catch (error) {
            console.error(error);
            alert('Error updating purchase');
            fetchSinglePurchase(editedPurchase?.purchase._id);
        }
    };

    const deleteProduct = async (id) => {
        try {
            let token = localStorage.getItem('token');
            await axios.delete(`${apiKey}/api/purchase/deletepurchase/${id}`, {
                method: 'DELETE',
                headers: {
                    'authtoken': token
                },
            });
            fetchSinglePurchase(id);
        } catch (error) {
            console.error(error);
        }
    };

    const confirmDelete = (id) => {
        setIsEditing(false);
        if (window.confirm("Do you really want to delete?")) {
            deleteProduct(id);
        }
    };

    const date = new Date(editedPurchase?.purchase?.billdate);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let newdate = date.toLocaleDateString('en-IN', options).split('/')?.join('-');

    return (
        <div className=" ">
            <div className="mt-4 lg:w-full">
                <div className="form-inline flex relative justify-between">
                    <div className='w-[33%] font-semibold'>Supplier</div>
                    <div className='w-[33%] font-semibold'>Bill No</div>
                    <div className='w-[33%] font-semibold'>Bill Date</div>
                    <div>
                        {isEditing ? (
                            <>
                                <button onClick={handleSave}><MdOutlineSystemSecurityUpdate /></button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={handleEditClick}><MdEdit /></button>
                        )}
                    </div>
                </div>
                <div className="form-inline flex relative justify-between">
                    <div className='w-[33%]'>
                        {isEditing ? (
                            <>
                                <input
    type="text"
    value={editedPurchase?.purchase?.Supplier || ''}
    onChange={(e) => {
        handleChangesupplier(e, 'Supplier'); // Ensure this updates the Supplier field
        setSupplierQuery(e.target.value);
    }}
/>

                                {filteredSuppliers.length > 0 && (
                                    <div className='absolute bg-gray-300 px-3 rounded-md'>
                                        <div className="suggestions">
                                            {filteredSuppliers.map((name, index) => (
                                                <div
                                                    key={index}
                                                    className="suggestion cursor-pointer"
                                                    onClick={() => handleSupplierSuggestionClick(name)}
                                                >
                                                    {name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            singlepurchase?.purchase?.Supplier
                        )}
                    </div>
                    <div className='w-[33%]'>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedPurchase?.purchase?.billno || ''}
                                onChange={(e) => handleInputChange(e, 'billno')}
                            />
                        ) : (
                            singlepurchase?.purchase?.billno
                        )}
                    </div>
                    <div className='w-[33%]'>
                        {isEditing ? (
                            <input
                                type="date"
                                value={newdate?.split('-')?.reverse()?.join('-')}
                                onChange={(e) => handleInputChange(e, 'billdate')}
                            />
                        ) : (
                            newdate
                        )}
                    </div>
                    <div className='cursor-pointer' onClick={() => confirmDelete(singlepurchase?.purchase?._id)}>
                        <MdDelete />
                    </div>
                </div>
                <div className="form-inline flex relative mt-6 justify-between">
                    <div className='w-[20%] font-semibold'>Product Name</div>
                    <div className='w-[20%] font-semibold'>Quantity</div>
                    <div className='w-[20%] font-semibold'>Rate per</div>
                    <div className='w-[20%] font-semibold'>Amount</div>
                    <div className='w-[20%] font-semibold'>Serial Numbers</div>
                </div>
                {singlepurchase?.purchase?.name.map((product, index) => (
                    <div className="form-inline flex relative mt-3 justify-between" key={index}>
                        <div className='w-[20%]'>
                            {isEditing ? (
                                <>
                                   <input
    type="text"
    value={editedPurchase?.purchase?.productname || ''}
    onChange={(e) => {
        handleInputChange(e, 'productname', index);
        setProductQuery(e.target.value);
    }}
/>

{filteredProducts.length > 0 && (
    <div className='absolute bg-gray-300 px-3 rounded-md'>
        <div className="suggestions absolute z-30 h-36 overflow-y-auto">
            {filteredProducts.map((name, idx) => (
                <div
                    key={idx}
                    className="suggestion cursor-pointer"
                    onClick={() => handleProductSuggestionClick(name, index)}
                >
                    {name}
                </div>
            ))}
        </div>
    </div>
)}
                                </>
                            ) : (
                                singlepurchase?.purchase?.name[index]?.productname
                            )}
                        </div>
                        <div className='w-[20%]'>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editedPurchase?.purchase?.name[index]?.quantity || ''}
                                    onChange={(e) => handleInputChange(e, 'quantity', index)}
                                />
                            ) : (
                                singlepurchase?.purchase?.name[index]?.quantity
                            )}
                        </div>
                        <div className='w-[20%]'>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editedPurchase?.purchase?.name[index]?.rate || ''}
                                    onChange={(e) => handleInputChange(e, 'rate', index)}
                                />
                            ) : (
                                singlepurchase?.purchase?.name[index]?.rate
                            )}
                        </div>
                        <div className='w-[20%]'>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editedPurchase?.purchase?.name[index]?.amount || ''}
                                    onChange={(e) => handleInputChange(e, 'amount', index)}
                                />
                            ) : (
                                singlepurchase?.purchase?.name[index]?.amount
                            )}
                        </div>
                        <div className='w-[20%]'>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedPurchase?.purchase?.name[index]?.serialNumbers || ''}
                                    onChange={(e) => handleInputChange(e, 'serialNumbers', index)}
                                />
                            ) : (
                                singlepurchase?.purchase?.name[index]?.serialNumbers
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
