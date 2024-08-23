import { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DataContext from './usecontext/DataContext';
import Sidenav from './sidenav';
import Topnav from './topnav';
import NotFound from './Notfound';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Order = lazy(() => import('./Order'));
const Returns = lazy(() => import('./Returns'));
const Products = lazy(() => import('./Products'));
const Reports = lazy(() => import('./Reports'));
const Courier = lazy(() => import('./courier'));
const Supplier = lazy(() => import('./supplier'));
const Createorder = lazy(() => import('./orderitem/createorder'));
const User = lazy(() => import('./user'));
const Searchitems = lazy(() => import('./search/search'));
const Singlepage = lazy(() => import('./search/singlepage'));
const CustomerDetail = lazy(() => import('./customerDetail'));

function Home(props) {
    

    const {userrole, setuserrole} = useContext(DataContext);
    const apiKey = "https://backenddata77720.onrender.com"
    const { fetchProducts,    fetchcomboProducts,    } = useContext(DataContext);
 
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const [user, setuser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchcomboProducts();
            fetchProducts();
            fetchuserdatafun();
        } else {
            navigate("/");
        }
    }, [navigate]);

     const fetchuserdatafun = async () => {
        setloading(true);
        let token = localStorage.getItem('token');
        const fetchuser = await fetch(`${apiKey}/api/auth/getuser`, {
    
             method: 'GET',
            headers: {
                'authtoken': token
            },
        });
        setloading(false);
        const user1 = await fetchuser.json();
        if (user1.success === false) {
            localStorage.removeItem('token');
            setloading(false);
            navigate("/");
        }
        setuser(user1);
        setuserrole(user1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Sidenav style={props.style} />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Dashboard userdata={user} />} />
                    <Route path='/order/*' element={<Order />} />
                    <Route path='/Createorder/*' element={<Createorder />} />
                    <Route path='/return/*' element={<Returns />} />
                    <Route path='/products/*' element={<Products />} />
                    <Route path='/Supplier/*' element={<Supplier />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/courier/*' element={<Courier />} />
                    <Route path='/User/*' element={<User userdata={user} />} />
                    <Route path='/Searchitems' element={<Searchitems />} />
                    <Route path='/Searchpage' element={<Singlepage />} />
                    <Route path='/CustomerDetail' element={<CustomerDetail />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default Home;
