'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { BsEyeFill, BsToggle2On } from 'react-icons/bs'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {     
            setLoading(true);
            const response = await fetch('http://localhost:1337/api/categories');
            const category = await response.json();
            console.log("category: ", category)
            setCategories(category.rows);
            setLoading(false);
        };
        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // const handleDelete = async (product) => {
    //     if (!selectedProduct) return;
    //     try {
    //         const response = await fetch(`http://localhost:1337/api/products/delete/${product.product_id}`, {
    //             method: "DELETE",
    //         });

    //         if (response.ok) {
    //             setProducts(products.filter((pro) => pro.product_id !== product.product_id))
    //         } else {
    //             alert("Xóa sản phẩm thất bại!");
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     } finally {
    //         setShowConfirm(false);
    //         setSelectedProduct(null);
    //     }
    // }

    return (
        <section>
            <div className="container">
                <div className="mb-6 p-6 flex justify-between items-center bg-gray-800 text-white py-4">
                    <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
                    <div className="space-x-2">
                        <Link href="/category/create-category" className="btn btn-success inline-flex items-center">
                            <i className="fas fa-plus mr-2"></i> Thêm danh mục
                        </Link>
                        <Link href="/admin/product/trash" className="btn btn-danger inline-flex items-center">
                            <i className="fas fa-trash mr-2"></i> Thùng rác
                        </Link>
                    </div>
                </div>

                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border border-gray-300 px-4 py-2">Tên danh mục</th>
                            <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                            <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                            <th className="border border-gray-300 px-4 py-2">Hiển thị</th>
                            <th className="border border-gray-300 px-4 py-2">Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item) => (
                            <tr key={item.category_id}>
                                <td className="border border-gray-300 px-4 py-2">{item.category_name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Image
                                        src={`/images/categories/${item.category_image}`}
                                        alt={item.category_name}
                                        className="object-cover"
                                        width={200}
                                        height={200}
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{item.category_description}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.status == true ? "Đang kinh doanh" : "Dừng kinh doanh"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    <div className='grid grid-cols-4 gap-1'>
                                        <div>
                                            <Link href={`/admin/product/status/1`} >
                                                <BsToggle2On fontSize={24} color='green' />
                                            </Link>
                                        </div>
                                        <div>
                                            <Link href={`/product/view-product/${item.category_id}`}>
                                                <BsEyeFill fontSize={24} color='brown' />
                                            </Link></div>
                                        <div>
                                            <Link href={`/product/edit-product/${item.category_id}`}>
                                                <BiEdit fontSize={24} color='#d7e607' />
                                            </Link></div>
                                        <div onClick={() => {
                                            setSelectedProduct(item);
                                            setShowConfirm(true);
                                        }}>
                                            <Link href="">
                                                <BiTrash fontSize={24} color='#b80404' />
                                            </Link></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <div className="pagination-container text-center mt-4">
                    <ul className="flex justify-center space-x-2">
                        <li>
                            <button
                                onClick={() => navigatePage(1)}
                                className={`btn ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={currentPage === 1}
                            >
                                First
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigatePage(currentPage - 1)}
                                className={`btn ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => navigatePage(i + 1)}
                                    className={`btn ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => navigatePage(currentPage + 1)}
                                className={`btn ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigatePage(totalPages)}
                                className={`btn ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={currentPage === totalPages}
                            >
                                Last
                            </button>
                        </li>
                    </ul>
                </div> */}

                {/* <p className="text-center mt-2">
                    Trang {currentPage} of {totalPages}
                </p> */}
            </div>
        </section>
    )
}

export default Categories
