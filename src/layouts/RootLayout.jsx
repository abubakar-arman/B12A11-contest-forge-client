import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '../Components/ErrorBoundary';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <ErrorBoundary>
                <main>
                    <Outlet />
                </main>
            </ErrorBoundary>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default RootLayout;