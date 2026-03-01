import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-center justify-center'>
            <img src={logo} className='w-6 lg:w-8' alt="" />
            <h2 className='font-extrabold text-sm lg:text-lg pt-5 text-orange-700/80'>CONTEST <span className='text-[#314048]'>FORGE</span></h2>
        </div>
    );
};

export default Logo;