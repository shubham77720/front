import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

export default function ComboPage() {
  // States for fetching combos
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrder, setTotalOrder] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // States for form data and serial numbers
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    MRP: '',
    salingprice: '',
    othername: []
  });
  const [serialInput, setSerialInput] = useState('');
  const [serialNumbers, setSerialNumbers] = useState([]);

  // States for creating a new combo
  
  const [products, setProducts] = useState([]);
   const apiKey = "https:/backenddata77720.onrender.com";
  

  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pageWidth = 50;

  // Fetch existing combos
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    let token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${apiKey}/api/combo/fetchcombosforadmin/${page}`,{
        method: 'GET',
        headers:{
             
            'authtoken': token
        },
    });
      setTotalOrder(response.data.totalCount);
      if (response.data.products.length === 0) {
        setHasMore(false);
      } else {
        setData(response.data);
        setHasMore(true);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };



  

const Previous = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => {
      const newPage = prevPage - 1;

      //console.log(newPage)
      fetchProducts(newPage);
      return newPage;
    });
  }
};

const Next = () => {
  //console.log(hasMore)
 if( Math.ceil(totalOrder/20)){}
  if (hasMore) {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1;
      //console.log(newPage)
      fetchProducts(newPage);
      return newPage;
    });
  }
};
const numclick = (number) => {
   
  if (hasMore) {
    setCurrentPage((prevPage) => {
      const newPage = number
      //console.log(newPage)
      fetchProducts(newPage);
      return newPage;
    });
  }
};


  const handleEdit = (product) => {
    setFormData({
      id: product._id,
      name: product.name,
      category: product.category,
      MRP: product.MRP,
      salingprice: product.salingprice,
      othername: product.othername || []
    });
    setSerialNumbers(product.othername || []);
    setShowEdit(true);
  };

  const handleDelete = async (id) => {
    let token = localStorage.getItem('token')

    if (window.confirm("Do you really want to delete?")) {
      try {
        await axios.delete(`${apiKey}/api/product/deleteproduct/${id}`,{method: 'DELETE',
          headers:{
               
              'authtoken': token
          },
         });
        fetchProducts(currentPage);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      let token = localStorage.getItem('token')
      await axios.put(`${apiKey}/api/combo/updatecombo/${formData.id}`, formData,{method: 'PUT',
        headers:{
             
            'authtoken': token
        },
       });
      alert('Combo updated successfully');
      fetchProducts(currentPage);
      setShowEdit(false);
    } catch (error) {
      alert('Error updating combo');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSerial = () => {
    if (serialInput.trim() && !serialNumbers.includes(serialInput.trim())) {
      setSerialNumbers([...serialNumbers, serialInput.trim()]);
      setFormData({ ...formData, othername: [...serialNumbers, serialInput.trim()] });
      setSerialInput('');
    }
  };

  const handleRemoveSerial = (serialToRemove) => {
    const updatedSerials = serialNumbers.filter(serial => serial !== serialToRemove);
    setSerialNumbers(updatedSerials);
    setFormData({ ...formData, othername: updatedSerials });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSerial();
    }
  };

  const fetchProductsList = async () => {
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

  useEffect(() => {
    fetchProductsList();
  }, []);

  const range = (start, end, step = 1) => {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  };
  
  
  const totalPages = Math.ceil(totalOrder / 20);
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

  return (
    <>
      {showEdit && (
        <div className="flex absolute items-center md:w-[80%] lg:w-[85%] w-[90%] justify-center z-30">
          <div className="bg-white p-2 rounded-md flex flex-col border-gray-500 border-[1px]">
            <div onClick={() => setShowEdit(false)} className="rounded-full cursor-pointer w-6 h-6 inline-block ml-2 text-center border-black border-[1px]">
              <div className="relative bottom-[7px] text-[20px]">x</div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-2">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="name" required />
              <div>

                  <input type='text' onChange={(e) => setSerialInput(e.target.value)} onKeyPress={handleKeyPress} value={serialInput} name='serialNumbers' placeholder="Enter othername" className="px-3 py-1 w-[100%] border-black border-[2px] rounded-md" />
                  <button type="button" className='w-[100px]' onClick={handleAddSerial}>Add name</button>
              </div>
               <div>
                <div className='flex'>
                </div>
                {serialNumbers.length > 0 && (
                  <div className="mt-4">
                    <h2 className="font-bold">Other names:</h2>
                    <ul className="grid gap-2 w-[50%] mt-2">
                      {serialNumbers?.map((serial, idx) => (
                        <li key={idx} className="flex gap-2 border-gray-400 border-[1px] rounded-md px-2 items-center justify-between">
                          {serial}
                          <button onClick={() => handleRemoveSerial(serial)} className="text-red-500">x</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <button onClick={handleUpdate}>Update Combo</button>
          </div>
        </div>
      )}
      <div className="mt-4 lg:w-full h-[550px] w-[1000px]">
        <div className="bg-[#464646] flex text-white mb-2 px-4 py-2 rounded-md w-[100%] items-center">
          <div className="text-lg font-semibold">Combos List</div>
          <div className="ml-auto">
            {currentPage > 1 && <button onClick={scrollLeft}><FaArrowAltCircleLeft className="text-2xl" /></button>}
            {hasMore && <button onClick={scrollRight}><FaArrowAltCircleRight className="text-2xl" /></button>}
          </div>
        </div>
        <div className="overflow-auto" ref={containerRef}>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                 <th className="border border-gray-300 p-2">Other Names</th>
               </tr>
            </thead>
            <tbody>
              {data?.products?.map(product => (
                <tr key={product._id}>
                  <td className="border border-gray-300 p-2">{product.name}</td>
                   <td className="border border-gray-300 p-2">{product.othername.join(', ')}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => handleEdit(product)} className="text-blue-500"><MdEdit /></button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 ml-2"><MdDelete /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="    absolute md:w-[80%]  lg:w-[85%]   w-[90%] mt-10    ">
        <div className="text-white w-[100%] pb-5 flex gap-10 justify-center ">
          {currentPage !== 1 ?<button   onClick={()=>{Previous()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>:
          <button disabled  onClick={()=>{Previous()}} className="bg-blue-400   w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2"><FaArrowAltCircleLeft /> Previous</div></button>}
<div className="text-black border-black border-[1px] px-2 rounded-md">{currentPage}</div>
         { currentPage !== Math.ceil(totalOrder/20)  && totalOrder !== 0 ?  <button onClick={()=>{Next()}} className="bg-blue-600 hover:bg-blue-700 w-[120px]  flex    justify-center cursor-pointer px-3 rounded-md "> <div className="flex items-center gap-2">Next<FaArrowAltCircleRight /></div> </button>:
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
          {range(1, totalPages+1)?.map(number => (
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
  );
}
