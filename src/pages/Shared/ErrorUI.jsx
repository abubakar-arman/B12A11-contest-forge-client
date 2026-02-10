import Error from '../../assets/error.png'

const ErrorUI = () => {
    const handleClick = () => {
        window.location.reload()
    }
    return (
        <div className='w-fit mx-auto mt-10 mb-20 text-center flex flex-col 
        items-center '>
            <h3 className="font-bold text-primary text-center text-4xl mb-10">Some error has been
                occurred. Sorry for the inconvenice.</h3>
            <button className='btn btn-warning mb-10' onClick={handleClick}>Reload Page</button>
            <img src={Error} className='w-sm' alt="" />
        </div>
    );
};


export default ErrorUI;