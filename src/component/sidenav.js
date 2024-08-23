
import { MdSpaceDashboard ,MdProductionQuantityLimits,MdDeliveryDining,MdPerson3,MdLogout   } from "react-icons/md";
import { FaShoppingBag ,FaUsers } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
 import { MdReport } from "react-icons/md";
 import { Link ,useLocation, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
export default  function Sidenav (params) {
    const location = useLocation();
    const navigate = useNavigate();
const [visibl, setvisibl] = useState({ visibility: 'visible'})

    


    useEffect(() => {
        const navbar = document.querySelector('.sidenavbar');
        const links = navbar.querySelectorAll('.sidechild');

        links.forEach((link) => {
            link.style.color = 'white';
            link.style.backgroundColor = '#0a0c37';
            link.style.borderTopLeftRadius = '0';
            link.style.borderBottomLeftRadius = '0';
        });

        let path =location.pathname
         if (path.includes("home/return")) {
            path = "/home/return"
        }
        
       
        if (path.includes("home/products")) {
            path = "/home/products"
        }
        if (path.includes("home/Createorder")) {
            path = "/home/Createorder"
        }
        if (path.includes("home/courier")) {
            path = "/home/courier"
        }
        if (path.includes("home/User")) {
            path = "/home/User"
        }
        if (path.includes("home/Supplier")) {
            path = "/home/Supplier"
        }
        if (path.includes("home/order")) {
            path = "/home/order"
        }
//console.log(path)
        const activeLink = Array.from(links).find(
            (link) => link.getAttribute('href') === path
        );
           

        if (activeLink) {
            activeLink.style.color = 'black';
            activeLink.style.backgroundColor = '#a0afc5';
            activeLink.style.borderTopLeftRadius = '10px';
            activeLink.style.borderBottomLeftRadius = '10px';
        }
    }, [location]);
    

    let confirm11 =()=>{
        if (window.confirm("Do you really want to logout?")) {
            localStorage.removeItem('token')
            window.location ="/"
            }
           
    }
     return(
        <>
        <div style={{left:params.style.left,display:visibl.display}} className="  md:w-[15%] lg:w-[10%] w-[135px] z-30 bg-[#0a0c37] h-[850px] sidenavbar md:static pl-2 absolute space-y-6">
            <Link    to='' className="text-white items-center flex space-y-1 sidechild flex-col pt-3 mt-3">
                <div className="text-xl"><MdSpaceDashboard /></div>
                <div>Dashboard</div>
            </Link>
            <Link to='./Createorder' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl"><IoBagAdd /></div>
                <div>create order</div>
            </Link>
            <Link to='./order' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl"><FaShoppingBag /></div>
                <div>Order</div>
            </Link>
            
            <Link to='./return' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl"><GiReturnArrow /></div>
                <div>Return</div>
            </Link>
            <Link to='./products' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl"><MdProductionQuantityLimits  /></div>
                <div>Products</div>
            </Link>
            <Link to='./reports' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl"><MdReport /></div>
                <div>Reports</div>
            </Link>
            <Link to='./courier' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl  "><MdDeliveryDining  /></div>
                <div>Courier & Platform</div>
            </Link>
            <Link to='./Supplier' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl  "><MdPerson3/></div>
                <div>Supplier</div>
            </Link>
            <Link to='./User' className="text-white items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl  "><FaUsers /></div>
                <div>Users</div>
            </Link>
            <Link  onClick={()=>{confirm11()}} className=" items-center flex space-y-1 sidechild flex-col pt-3">
                <div className="text-xl text-red-700 "><MdLogout /></div>
                <div className="text-red-700">Logout</div>
            </Link>
            
        </div>
        </>
    )
}

