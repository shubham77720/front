
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import {  Route,Routes } from 'react-router-dom';
import Products1 from "./products/products";
import Purchase from "./products/Purchase";
import CreatePurchase from "./products/Createpurchase";
import CreateProducts from "./products/createproduct";
import Createsupplier from "./supplier/createsupplier";
import Supplierdetail from "./supplier/supplierdetail";
import NotFound from "./Notfound";


export default  function Supplier (params) {

  document.body.style.backgroundColor ="#f6f6f6"

    const location = useLocation();

    useEffect(() => {
      const navbar = document.querySelector('.topnavbar');
    const links = navbar.querySelectorAll('.child');
  
        links.forEach((otherLink) => {
          otherLink.style.color = 'white';
          otherLink.style.backgroundColor = '#31344f';
        });
  
        const activeLink = Array.from(links).find(
            (link) => link.getAttribute('href') === location.pathname
        );
  
        if (activeLink) {
           
            activeLink.style.color = 'black';
            activeLink.style.backgroundColor = '#a0afc5';
        }
    }, [location]);


    return(
        <>
        <div className=" md:w-[85%] lg:w-[90%]  w-[100%] px-[20px] mt-16 ">
         <div className="flex justify-between text-white  w-[100%]">
            <div className="lg:text-xl text-lg font-semibold">Supplier</div>
            <div className="flex lg:space-x-4 lg:text-sm text-[10px] space-x-2">
                <div>Dashboard</div>
                <div>Reports</div>
                <div>All-shipment</div>
            </div>
         </div>
         <div className="bg-[white] rounded-md mt-2 px-3 py-6">
            <div className="bg-[#31344f] flex gap-2 text-white p-3 rounded-md flex-wrap topnavbar">
                <Link to='' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">supplier</Link>
                 <Link to='./create-supplier' className="rounded-full px-2 child cursor-pointer">Create supplier</Link>   
              </div>
       
         
       
               
                     
          
      <div className="scroll-container pb-3" style={{  overflowX: 'auto' }}>
        <Routes>
          <Route path="/" element={<Supplierdetail />} />
            <Route path="create-supplier" element={<Createsupplier/>} />
            <Route path='*' element={<NotFound />} />

         </Routes>
      </div>

      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          width: 10px;
          height: 10px;
         
         }
        .scroll-container::-webkit-scrollbar-track {
          background: white;
          border: 1px #888888 solid
         }
        .scroll-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
  
         </div>
        </div>
        </>
    )
}

