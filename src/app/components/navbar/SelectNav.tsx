import Link from 'next/link';
import React from 'react';
import { IoMdSearch } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { BsFileEarmarkPost } from "react-icons/bs";

const SelectNav = () => {
    return (
        <div className="mt-4">
            <div className="flex items-center space-x-2 my-2">
                <div className="relative w-full">
                    <input
                        type="search"
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-slate-300 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700 focus:outline-none"
                        aria-label="Search"
                    >
                        <IoMdSearch />
                    </button>
                </div>
            </div>
            <nav>
                <ul className="flex flex-col space-y-2">
                    <li className="group">
                        <Link href="/" className="block px-4 py-2 text-gray-200 rounded hover:bg-gray-700">
                           Dashboard
                        </Link>

                    </li>
                    <li className="group ">
                        <Link
                            href="/product"
                            className="block flex items-center px-4 py-2 text-gray-200 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <AiFillProduct style={{ fontSize: '24px' }} /></button>
                            Manage Products
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/category"
                            className="block flex items-center px-4 py-2 text-gray-200  rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>
                            Manage Categories
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200  rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <BsFileEarmarkPost style={{ fontSize: '24px' }} /></button>

                            Manage Posts
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200  rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>

                            Manage Orders
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200  rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>

                            Manage Users
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200  rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>

                            Manage Staff
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200  rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>

                            Colors Products
                        </Link>
                    </li>

                </ul>
            </nav>
            <div className="px-2 py-2 "
            >
                <span className='text-gray-200'> ADMIN</span>
            </div>
            <nav>
                <ul className="flex flex-col space-y-2">
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200 rounded hover:bg-gray-700 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>

                            Login
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200 rounded hover:bg-gray-700 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>

                            Sign up
                        </Link>
                    </li>
                    <li className="group">
                        <Link
                            href="/"
                            className="block flex items-center px-4 py-2 text-gray-200 rounded hover:bg-gray-700 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        >
                            <button className='mr-3'> <MdCategory style={{ fontSize: '24px' }} /></button>

                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SelectNav;
