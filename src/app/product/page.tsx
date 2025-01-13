'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { BsEyeFill, BsToggle2On } from 'react-icons/bs'

const ProductIndex = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const response = await fetch('http://localhost:1337/api/products');
            const product = await response.json();
            setProducts(product.rows);
            setLoading(false);
        };
        fetchProduct();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (product) => {
        if (!selectedProduct) return;
        try {
            const response = await fetch(`http://localhost:1337/api/products/delete/${product.product_id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setProducts(products.filter((pro) => pro.product_id !== product.product_id))
            } else {
                alert("Xóa sản phẩm thất bại!");
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setShowConfirm(false);
            setSelectedProduct(null);
        }
    }

    return (
        <section>
            <div className="container ">
                <div className="mb-6 p-6 flex justify-between items-center bg-gray-800 text-white py-4">
                    <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
                    <div className="space-x-2">
                        <Link href="/product/create-product" className="btn btn-success inline-flex items-center">
                            <i className="fas fa-plus mr-2"></i> Thêm sản phẩm
                        </Link>
                        <Link href="/admin/product/trash" className="btn btn-danger inline-flex items-center">
                            <i className="fas fa-trash mr-2"></i> Thùng rác
                        </Link>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-center border border-gray-300 px-2 py-1">#</th>
                                <th className="text-center border border-gray-300 px-2 py-1 w-64">Hình</th>
                                <th className="text-left border border-gray-300 px-2 py-1 w-64">Tên sản phẩm</th>
                                <th className="text-left border border-gray-300 px-2 py-1">Danh mục</th>
                                <th className="text-left border border-gray-300 px-2 py-1">Thương hiệu</th>
                                <th className="text-center border border-gray-300 px-2 py-1">Chức năng</th>
                                <th className="text-center border border-gray-300 px-2 py-1">ID</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                products.map((item) => (
                                    <tr key={item.product_id}>
                                        <td className="text-center border border-gray-300 px-2 py-1">
                                            <input type="checkbox" name="checkId[]" value={item.product_id} />
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            <Image
                                                src={`/images/product/${item.product_image1}`}
                                                alt={item.product_name}
                                                className="object-cover"
                                                width={200}
                                                height={200}
                                            />

                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">{item.product_name}</td>
                                        <td className="border border-gray-300 px-2 py-1">{item.category_name}</td>
                                        <td className="border border-gray-300 px-2 py-1">HELIAS</td>
                                        <td className="text-center border border-gray-300 px-2 py-1 space-x-2">
                                            <div className='grid grid-cols-4 gap-1'>
                                                <div>
                                                    <Link href={`/admin/product/status/1`} >
                                                        <BsToggle2On fontSize={24} color='green' />
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link href={`/product/view-product/${item.product_id}`}>
                                                        <BsEyeFill fontSize={24} color='brown' />
                                                    </Link></div>
                                                <div>
                                                    <Link href={`/product/edit-product/${item.product_id}`}>
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
                                        <td className="text-center border border-gray-300 px-2 py-1">{item.product_id}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                {showConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
                            <p className="mb-6">
                                Bạn có chắc chắn muốn xóa sản phẩm <strong>{selectedProduct?.product_name}</strong>?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => handleDelete(selectedProduct)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductIndex
