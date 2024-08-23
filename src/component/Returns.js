import { lazy, Suspense, useContext, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import DataContext from "./usecontext/DataContext";
import NotFound from "./Notfound";

// Lazy load components
const RTO = lazy(() => import("./Returnitem/RTo"));
const DTO = lazy(() => import("./Returnitem/DTO"));
const Received = lazy(() => import("./Returnitem/Received"));
const Lost = lazy(() => import("./Returnitem/Lost"));
const Claim = lazy(() => import("./Returnitem/Claim"));
const Refund = lazy(() => import("./Returnitem/REfund"));

export default function Returns(params) {
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
        <div className="lg:text-xl text-lg font-semibold">Returns</div>
        <div className="flex lg:space-x-4 lg:text-sm text-[10px] space-x-2">
          <div>Dashboard</div>
          <div>Reports</div>
          <div>All-shipment</div>
        </div>
      </div>
      <div className="bg-[white] rounded-md mt-2 relative px-3 py-6">
        <div className="bg-[#31344f] flex gap-2 text-white p-3 rounded-md flex-wrap topnavbar">
          <Link to='' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">RTO</Link>
          <Link to='./DTO' className="rounded-full px-2 child cursor-pointer">DTO</Link>
          <Link to="./Received" className="rounded-full px-2 cursor-pointer child">Received</Link>
          <Link to='./LOST' className="rounded-full px-2 cursor-pointer child">Lost</Link>
          <Link to='./Claim' className="rounded-full px-2 cursor-pointer child">Claim</Link>
          <Link to="./Refund" className="rounded-full px-2 cursor-pointer child">Refund</Link>
          <button className="text-red-500" onClick={handleExport}>Export to Excel</button>
        </div>

        <div className="scroll-container pb-3" style={{ overflowX: 'scroll' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<RTO />} />
              <Route path="DTO" element={<DTO />} />
              <Route path="Received" element={<Received />} />
              <Route path="LOST" element={<Lost />} />
              <Route path="Claim" element={<Claim />} />
              <Route path="Refund" element={<Refund />} />
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
