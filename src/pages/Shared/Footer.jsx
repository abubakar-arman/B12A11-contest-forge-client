import React from 'react';
import Logo from './Logo';
import { FaFacebookSquare, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-base-300 
             text-base-content p-10">
            <aside>
                <Logo />
                <p className="font-bold">
                    Craft Greatness. Launch Contests.
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <FaFacebookSquare className='size-8' />
                    </a>
                    <a>
                        <FaLinkedinIn className='size-8' />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;