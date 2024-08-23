import { lazy, Suspense, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

// Lazy load components
const Courier1 = lazy(() => import("./courier/courier"));
const Createcourier = lazy(() => import("./courier/creatercourier"));
const CreatePlatform = lazy(() => import("./courier/createPlatform"));
const Platform1 = lazy(() => import("./courier/Platform"));
const NotFound = lazy(() => import("./Notfound"));

export default function Courier(params) {
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

    return (
        <div className="md:w-[85%] lg:w-[90%] w-[100%] px-[20px] mt-16 pb-8">
            <div className="flex justify-between text-white w-[100%]">
                <div className="lg:text-xl text-lg font-bold">Courier</div>
            </div>
            <div className="bg-[white] rounded-md mt-2 px-3 py-6">
                <div className="bg-[#31344f] flex gap-2 text-white p-3 rounded-md flex-wrap topnavbar">
                    <Link to='' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">Courier</Link>
                    <Link to='./Platform' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">Platform</Link>
                    <Link to='./createcourier' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">Create Courier</Link>
                    <Link to='./createPlatform' className="rounded-full text-black cursor-pointer child bg-[#a0afc5] px-2">Create Platform</Link>
                </div>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Courier1 />} />
                    <Route path="Platform" element={<Platform1 />} />
                    <Route path="createcourier" element={<Createcourier />} />
                    <Route path="createPlatform" element={<CreatePlatform />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </div>
    );
}
