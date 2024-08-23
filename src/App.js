import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Topnav from './component/topnav';
import DataProvider from './component/usecontext/dataprovider';
import NotFound from './component/Notfound';

const Login = lazy(() => import('./component/login'));
const Home = lazy(() => import('./component/home'));
const ForgotPage = lazy(() => import('./component/forgot'));
const Verifypage = lazy(() => import('./component/verify'));

function App() {
    const [style, setstyle] = useState({ left: "-200px" });
    document.body.style.backgroundColor = "#f6f6f6";
 
     const apiKey = "https://backenddata77720.onrender.com"
    //console.log(apiKey); // Output: your-api-key-here
    
     return (
        <>
            <DataProvider>
                <Router>
                    <div className='h-[100vh]'>
                        <Topnav setstyle={setstyle} style={style} />
                        <div className="bg-[#31344f] h-[135px] flex">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Routes>
                                    <Route path='/' element={<Login />} />
                                    <Route path='/forgotpassword' element={<ForgotPage />} />
                                    <Route path='/Verifypage' element={<Verifypage />} />
                                    <Route path='/home/*' element={<Home style={style} />} />
                                    <Route path='*' element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                </Router>
            </DataProvider>
        </>
    );
}

export default App;
