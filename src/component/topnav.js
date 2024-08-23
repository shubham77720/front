import { useContext, useEffect, useRef, useState } from "react";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { MdLogout, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import DataContext from "./usecontext/DataContext";
import * as XLSX from "xlsx";

export default function Topnav(params) {
  const { setsearcheddata, exceldata, userrole, setdate} = useContext(DataContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('Today');
  const [showCustomDateInputs, setShowCustomDateInputs] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setsearcheddata(event.target.value);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setShowCustomDateInputs(range === 'Custom');
    setShowDropdown(false);

    const currentDate = new Date();
    let startDate, endDate;

    switch (range) {
      case 'Today':
        startDate = endDate = currentDate.toISOString().split('T')[0];
        break;
      case 'Last7Days':
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString().split('T')[0];
        endDate = new Date().toISOString().split('T')[0];
        break;
      case 'Last30Days':
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 30)).toISOString().split('T')[0];
        endDate = new Date().toISOString().split('T')[0];
        break;
      case 'ThisMonth':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      default:
        startDate = endDate = '';
    }
    setdate({startDate, endDate})
   };

  const handleCustomDateChange = () => {
    setDateRange('Custom');
    setShowDropdown(false);
    setShowCustomDateInputs(false);

    if (customStartDate && customEndDate) {
      setdate({startDate:customStartDate, endDate:customEndDate})

     }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleExport = () => {
    const transformedData = exceldata.map(item => ({
      ...item,
      Platform: item.Platform?.name,
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

  const confirmLogout = () => {
    if (window.confirm("Do you really want to logout?")) {
      localStorage.removeItem('token');
      window.location = "/";
    }
  };

  return (
    <>
    {userrole && (
      <div className="bg-white flex flex-col sm:flex-row p-4 items-center sticky border-b-[1px] border-gray-200 z-40 top-0 justify-between w-full gap-4 sm:gap-6 shadow-md">
        
        {params.style.left !== "0px" ? (
          <div className="text-3xl cursor-pointer" onClick={() => { params.setstyle({ left: "0px" }); }}>
            <IoReorderThree />
          </div>
        ) : (
          <div className="text-3xl cursor-pointer" onClick={() => { params.setstyle({ left: "-200px" }); }}>
            <IoClose />
          </div>
        )}

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            value={searchQuery}
            onChange={handleInputChange}
            className="border-gray-300 border-[1px] rounded-md w-full sm:w-72 px-3 py-1"
            placeholder="Search"
            type="text"
          />
          <Link
            to="./home/Searchitems"
            onClick={() => { setsearcheddata(searchQuery); }}
            className="text-2xl text-blue-500 hover:text-blue-700 transition-colors"
          >
            <MdSearch />
          </Link>
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-blue-500 text-white w-full sm:w-auto px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Select Date Range
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-md shadow-lg p-3"
            >
              <div className="flex flex-col gap-2">
                <Link
                  to="./home/Searchitems"
                  onClick={() => handleDateRangeChange('Today')}
                  className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  Today
                </Link>
                <Link
                  to="./home/Searchitems"
                  onClick={() => handleDateRangeChange('Last7Days')}
                  className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  Last 7 Days
                </Link>
                <Link
                  to="./home/Searchitems"
                  onClick={() => handleDateRangeChange('Last30Days')}
                  className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  Last 30 Days
                </Link>
                <Link
                  to="./home/Searchitems"
                  onClick={() => handleDateRangeChange('ThisMonth')}
                  className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  This Month
                </Link>
                <div
                  onClick={() => handleDateRangeChange('Custom')}
                  className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
                >
                  Custom
                </div>
              </div>

              {showCustomDateInputs && (
                <div className="mt-3">
                  <input
                    className="w-full text-black mb-2 border-gray-300 border-[1px] rounded-md px-2 py-1"
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                  />
                  <input
                    className="w-full text-black border-gray-300 border-[1px] rounded-md px-2 py-1"
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                  />
                  <Link
                    to="./home/Searchitems"
                    onClick={handleCustomDateChange}
                    className="mt-2 block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Apply Custom Dates
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            className="bg-green-500 text-white w-full sm:w-auto px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={handleExport}
          >
            Export to Excel
          </button>

          <div
            onClick={confirmLogout}
            className="cursor-pointer flex flex-col items-center text-red-700"
          >
            <MdLogout className="text-2xl" />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
