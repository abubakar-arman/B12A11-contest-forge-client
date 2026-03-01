import React from 'react';
import Logo from './Logo';
import { FaFacebookSquare, FaLinkedinIn } from "react-icons/fa";
import { FaPhone } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="footer footer-vertical lg:footer-horizontal footer-center bg-base-300 
             text-base-content p-10 flex flex-col gap-2">
            <aside>
                <Logo />
                <p className="font-bold">
                    Craft Greatness. Launch Contests.
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <div className="footer grid grid-cols-1 lg:grid-cols-4 place-items-center sm:footer-horizontal bg-base-300 
             text-base-content gap-4 p-10">
                <nav>
                    <h6 className="footer-title">Support</h6>
                    <a className="link link-hover">FAQ</a>
                    <a className="link link-hover">Help Center</a>
                    <a className="link link-hover">Support</a>
                    <a className="link link-hover">Account</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Policies</h6>
                    <a className="link link-hover">Privacy Policy</a>
                    <a className="link link-hover">Terms of Use</a>
                    <a className="link link-hover">Legal Notices</a>
                </nav>
            </div>
            <nav>
                <h5 className='text-xl'>Contact Us</h5>
                <div id="contact" className="grid grid-flow-col gap-4 mt-2">
                    <FaPhone className='size-15' />
                    <div >
                        <p className="text-xl font-bold">(913) 756-3126</p>
                        <p className="">Got Questions? Call us 24/7</p>
                    </div>
                </div>
                <div className="grid grid-flow-col gap-4">
                    <a target='_blank' href='https://www.facebook.com/arman.bhaai'>
                        <FaFacebookSquare className='size-8' />
                    </a>
                    <a target='_blank' href='https://linkedin.com/in/abubakar-arman/'>
                        <FaLinkedinIn className='size-8' />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;