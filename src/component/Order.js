import { lazy, Suspense, useEffect, useContext } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import DataContext from "./usecontext/DataContext";

// Lazy load components
const Neworders = lazy(() => import("./orderitem/neworder"));
const PendingRtd = lazy(() => import("./orderitem/pendingrtd"));
const Shipped = lazy(() => import("./orderitem/Shipped"));
const Rtd = lazy(() => import("./orderitem/RTd"));
const Cancel = lazy(() => import("./orderitem/cancel"));
const Notsent = lazy(() => import("./orderitem/notsent"));
const Ofd = lazy(() => import("./orderitem/Ofd"));
const Delivered = lazy(() => import("./orderitem/delivered"));
const NotFound = lazy(() => import("./Notfound"));

export default function Order(params) {
  document.body.style.backgroundColor = "#f6f6f6";

  const location = useLocation();
  const { updateOrderStatus, exceldata } = useContext(DataContext);

  const handleExport = () => {
    const transformedData = exceldata.map(item => ({
      ...item,
      Platform: item.Platform.name,
      Billdate: new Date(item.Billdate).toLocaleDateString('en-GB')
    }));

    const ws = XLSX.utils.json_to_sheet(transformedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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

  return (
    <div className="md:w-[85%] lg:w-[90%] w-[100%] px-[20px] mt-16">
      <div className="flex justify-between text-white w-[100%]">
        <div className="lg:text-xl text-lg font-semibold">Orders</div>
        <div className="flex lg:space-x-4 lg:text-sm text-[10px] space-x-2">
          <div>Dashboard</div>
          <div>Reports</div>
          <div>All-shipment</div>
        </div>
      </div>
      <div className="bg-[white] rounded-md mt-2 px-3 py-6">
        <div className="bg-[#31344f] flex gap-2 relative text-white p-3 rounded-md flex-wrap topnavbar">
          <Link to='' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">New order</Link>
          <Link to='./PendingRtd' className="rounded-full px-2 child cursor-pointer">Pending RTD</Link>
          <Link to="./Rtd" className="rounded-full px-2 cursor-pointer child">RTD</Link>
          <Link to='./Cancel' className="rounded-full px-2 cursor-pointer child">Cancel</Link>
          <Link to='./Not-sent' className="rounded-full px-2 cursor-pointer child">Not Sent</Link>
          <Link to="./Shipped" className="rounded-full px-2 cursor-pointer child">Shipped</Link>
          <Link to='./OFD' className="rounded-full px-2 cursor-pointer child">OFD</Link>
          <Link to="./Delivered" className="rounded-full px-2 cursor-pointer child">Delivered</Link>
          <button className="text-red-500" onClick={handleExport}>Export to Excel</button>
        </div>

        <div className="scroll-container pb-3" style={{ overflowX: 'scroll' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Neworders />} />
              <Route path="PendingRtd" element={<PendingRtd />} />
              <Route path="Rtd" element={<Rtd />} />
              <Route path="Shipped" element={<Shipped />} />
              <Route path="Cancel" element={<Cancel />} />
              <Route path="Not-sent" element={<Notsent />} />
              <Route path="OFD" element={<Ofd />} />
              <Route path="Delivered" element={<Delivered />} />
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
