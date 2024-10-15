import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
function DefaultLayout({children}) {
    return ( <div>
        <Navbar/>
        <div className='container'>
            <Sidebar/>
            <div className='content'>
                {children}
            </div>
        </div>
        <Footer/>
    </div> );
}

export default DefaultLayout;