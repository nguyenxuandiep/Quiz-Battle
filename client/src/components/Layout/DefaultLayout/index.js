import Navbar from "./Navbar";
import Footer from "./Footer";
function DefaultLayout({children}) {
    return ( <div>
        <Navbar/>
        <div className='container'>
            <div className='content'>
                {children}
            </div>
        </div>
        <Footer/>
    </div> );
}

export default DefaultLayout;