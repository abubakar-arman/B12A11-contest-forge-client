import pageNotFound from '../../assets/404.png'

const NotFound = () => {
    return (
        <div className='w-fit mx-auto mt-10 mb-20'>
            <h3 className="font-bold text-primary text-center text-4xl">Page Not Found</h3>
            <img src={pageNotFound} className='w-sm' alt="" />
        </div>
    );
};

export default NotFound;