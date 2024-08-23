import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default function SupplierDetail(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showedit, setshowedit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrder, settotalOrder] = useState("");
  const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
  const [editing, setEditing] = useState(null); // Track which supplier is being edited
  const [formData, setFormData] = useState({
    name: "",
    GSTIN: "",
    Mobile: "",
    address: "",
  });
    const apiKey = "https://backenddata77720.onrender.com"
 
  useEffect(() => {
    fetchSupplier(currentPage);
  }, []);

  




  const fetchSupplier = async (page) => {
    //console.log(page, "this is my fetching page");
  let token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${apiKey}/api/supplier/fetchsupplier/${page}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': token
        }});
      settotalOrder(response.data.totalCount)
  //console.log(response.data.supplier)
      if (response.data.supplier?.length === 0) {
        setHasMore(false); // No more data to load
   
       } else {
        // setData(prevData => ({
        //   ...prevData,
        //   orders: [...prevData.orders, ...response.data.orders]
        // }));
        
         setData(response.data);
        setHasMore(true); 
       }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  

  const handleEditClick = (person) => {
    setEditing(person._id); // Assuming each supplier has a unique 'id'
    setFormData({
      name: person.name,
      GSTIN: person.GSTIN,
      Mobile: person.Mobile,
      address: person.addresh,
    });
  };

  let confirm11 =(id)=>{
    if (window.confirm("Do you really want to delete?")) {
      handleDelete(id)       
    
       }
      
   }

  const handleDelete = (id) => {
    let token = localStorage.getItem('token')
    axios
      .delete(`${apiKey}/api/supplier/delete/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': token
        }})
      .then(() => {
        // Remove the supplier from the local state
        setData((prevData) => ({
          ...prevData,
          supplier: prevData.supplier.filter((supplier) => supplier._id !== id),
        }));
      })
      .catch((error) => {
        console.error("There was an error deleting the supplier!", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = (id) => {
    let token = localStorage.getItem('token')
    axios
      .put(`${apiKey}/api/supplier/update/${id}`, formData,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': token
        }})
      .then(() => {
        // Update the local state with the edited supplier
        setData((prevData) => ({
          ...prevData,
          supplier: prevData.supplier.map((supplier) =>
            supplier._id === id ? { ...supplier, ...formData } : supplier
          ),
        }));
        setEditing(null);
      })
      .catch((error) => {
        console.error("There was an error updating the supplier!", error);
      });
  };



  
const Previous = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => {
      const newPage = prevPage - 1;

      //console.log(newPage)
      fetchSupplier(newPage);
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
      fetchSupplier(newPage);
      return newPage;
    });
  }
};
const numclick = (number) => {
   
  if (hasMore) {
    setCurrentPage((prevPage) => {
      const newPage = number
      //console.log(newPage)
      fetchSupplier(newPage);
      return newPage;
    });
  }
};


    const range = (start, end, step = 1) => {
      const result = [];
      for (let i = start; i < end; i += step) {
        result.push(i);
      }
      return result;
    };
    
    
    const totalPages = Math.ceil(totalOrder / 20);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className=" ">
        <div className="mt-4 lg:w-full w-[1000px]">
          <div className="bg-[#464646] flex text-white mb-2 px-2 items-center justify-between">
            <div className="border-white px-3 py-1 w-[160px]">Name</div>
            <div className="border-white border-l-[1px] px-3 py-1 w-[160px]">
              GSTIN
            </div>
            <div className="border-l-[1px] border-white w-[120px] px-3 py-1">
              Mobile No
            </div>
            <div className="border-l-[1px] border-white w-[130px] px-3 py-1">
              Address
            </div>
            <div className="border-l-[1px] border-white w-[80px] px-3 py-1">
              Actions
            </div>
          </div>
          {data?.supplier?.map((person) => (
            <div
              key={person._id}
              className="bg-[#f2f2f2] flex mt-1 text-black px-2 justify-between items-center"
            >
              {editing === person._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="px-3 py-1 w-[160px] border"
                  />
                  <input
                    type="text"
                    name="GSTIN"
                    value={formData.GSTIN}
                    onChange={handleInputChange}
                    className="px-3 py-1 w-[160px] border"
                  />
                  <input
                    type="text"
                    name="Mobile"
                    value={formData.Mobile}
                    onChange={handleInputChange}
                    className="w-[120px] px-3 py-1 border"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-[130px] px-3 py-1 border"
                  />
                  <button
                    onClick={() => handleSave(person._id)}
                    className="px-3 py-1 bg-green-500 text-white"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="px-3 py-1 w-[160px]">{person.name}</div>
                  <div className="px-3 py-1 w-[160px]">{person.GSTIN}</div>
                  <div className="w-[120px] px-3 py-1">{person.Mobile}</div>
                  <div className="w-[130px] px-3 py-1">{person.addresh}</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(person)}
                      className="px-3 py-1 bg-blue-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirm11(person._id)}
                      className="px-3 py-1 bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
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
  );
}
