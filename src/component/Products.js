import { lazy, Suspense, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

// Lazy load components
const Products1 = lazy(() => import("./products/products"));
const Purchase = lazy(() => import("./products/Purchase"));
const CreatePurchase = lazy(() => import("./products/Createpurchase"));
const CreateProducts = lazy(() => import("./products/createproduct"));
const CreateCombo = lazy(() => import("./products/createcombo"));
const SinglePurchase = lazy(() => import("./products/singlepurchase"));
const Combo = lazy(() => import("./products/combo"));
const NotFound = lazy(() => import("./Notfound"));

export default function Products(params) {
  document.body.style.backgroundColor = "#f6f6f6";

  const location = useLocation();

  useEffect(() => {
    const navbar = document.querySelector('.topnavbar');
    const links = navbar.querySelectorAll('.child');

    links.forEach((otherLink) => {
      otherLink.style.color = 'white';
      otherLink.style.backgroundColor = '#31344f';
    });

    let path = location.pathname;
    if (path.includes("/home/products/SinglePurchase")) {
      path = "/home/products/Purchase";
    }

    const activeLink = Array.from(links).find(
      (link) => link.getAttribute('href') === path
    );

    if (activeLink) {
      activeLink.style.color = 'black';
      activeLink.style.backgroundColor = '#a0afc5';
    }
  }, [location]);

  return (
    <div className="md:w-[85%] lg:w-[90%] w-[100%] px-[20px] mt-16">
      <div className="flex justify-between text-white w-[100%]">
        <div className="lg:text-xl text-lg font-semibold">Products</div>
        <div className="flex lg:space-x-4 lg:text-sm text-[10px] space-x-2">
          <div>Dashboard</div>
          <div>Reports</div>
          <div>All-shipment</div>
        </div>
      </div>
      <div className="bg-[white] rounded-md mt-2 px-3 py-6">
        <div className="bg-[#31344f] flex gap-2 text-white p-3 rounded-md flex-wrap topnavbar">
          <Link to='' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">Products</Link>
          <Link to='./combo' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">Combo</Link>
          <Link to='./Purchase' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">Purchase</Link>
          <Link to='./create-product' className="rounded-full px-2 child cursor-pointer">Create Product</Link>
          <Link to='./create-Purchase' className="rounded-full px-2 child cursor-pointer">Create Purchase</Link>
          <Link to='./create-combo' className="rounded-full px-2 child cursor-pointer">Create Combo</Link>
        </div>

        <div className="scroll-container pb-3" style={{ overflowX: 'auto' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Products1 />} />
              <Route path="purchase" element={<Purchase />} />
              <Route path="combo" element={<Combo />} />
              <Route path="create-Purchase" element={<CreatePurchase />} />
              <Route path="create-product" element={<CreateProducts />} />
              <Route path="create-combo" element={<CreateCombo />} />
              <Route path="SinglePurchase" element={<SinglePurchase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        <style jsx>{`
          .scroll-container::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: white;
            border: 1px #888888 solid;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
      </div>
    </div>
  );
}
