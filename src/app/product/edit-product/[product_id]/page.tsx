"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditProduct = () => {

    const router = useRouter();

    const { product_id } = useParams();

    console.log("product id: ", product_id)
    const [product, setProduct] = useState({
        product_id_name: "",
        product_name: "",
        product_image1: "",
        product_image2: "",
        product_description: "",
        product_price: 0,
        product_price_sale: 0,
        product_quantity: 0,
        product_status: 0,
        product_detail: "",
        category_id: 0
    });

    useEffect(() => {
        if (!product_id) return; 
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:1337/api/products/${product_id}`);
            const data = await response.json();
            setProduct(data);
            console.log("Product data: ", data)
        };
        fetchProduct();
    }, [product_id]);
    

    const handleInput = async (event) => {
        const { name, value, files } = event.target;

        if (files && files[0]) {
            const file = files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:1337/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.fileName) {
                        setProduct((prev) => ({
                            ...prev,
                            [name]: data.fileName,
                        }));
                    } else {
                        alert('Không tìm thấy tên file trong phản hồi API!');
                    }
                } else {
                    alert('Upload hình ảnh thất bại!');
                }

            } catch (error) {
                console.error('Lỗi upload hình ảnh:', error);
            }
        } else {
            setProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:1337/api/products/edit-product/${product_id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Sản phẩm đã được cập nhật thành công!");
                router.push('/product');
                console.log("Sản phẩm đã được cập nhật thành công!", data);
            } else {
                alert("Cập nhật sản phẩm thất bại!");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <section className="content-header py-4">
                <div className="container mx-auto px-4">
                    <div className="flex mb-4">
                        <h1 className="text-xl font-semibold">Cập nhật sản phẩm</h1>
                    </div>
                </div>

                <section className="content">
                    <div className="card">
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div className="card-header">
                                <div className="flex justify-end space-x-2">
                                    <button type="submit" name="create" className="btn btn-sm bg-green-500 text-white p-2 rounded">
                                        <i className="fa fa-save mr-2"></i> Lưu
                                    </button>
                                    <Link href='../product'>
                                        <button type="button" className="btn btn-sm bg-blue-500 text-white p-2 rounded">
                                            <i className="fa fa-arrow-left mr-2"></i> Về danh sách
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <div className="mb-3">
                                            <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                                            <input
                                                type="text"
                                                value={product.product_name}
                                                onChange={handleInput}
                                                name="product_name"
                                                id="product_name"
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_id_name" className="block text-sm font-medium text-gray-700">Tên mã sản phẩm</label>
                                            <input
                                                type="text"
                                                value={product.product_id_name}
                                                onChange={handleInput}
                                                name="product_id_name"
                                                id="product_id_name"
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_description" className="block text-sm font-medium text-gray-700">Chi tiết</label>
                                            <textarea
                                                name="product_description"
                                                id="product_description"
                                                value={product.product_description}
                                                onChange={handleInput}
                                                rows={8}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_detail" className="block text-sm font-medium text-gray-700">Mô tả</label>
                                            <textarea
                                                name="product_detail"
                                                id="product_detail"
                                                value={product.product_detail}
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-3">
                                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Danh mục</label>
                                            <select
                                                name="category_id"
                                                id="category_id"
                                                value={product.category_id}
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            >
                                                <option value="0">Chọn danh mục</option>
                                                <option value="1">Quần</option>
                                                <option value="2">Áo</option>
                                                <option value="3">Đầm</option>
                                                <option value="4">Váy</option>
                                                <option value="5">Giày</option>
                                                <option value="6">Phụ kiện</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="product_price" className="block text-sm font-medium text-gray-700">Giá</label>
                                            <input
                                                type="number"
                                                name="product_price"
                                                id="product_price"
                                                value={product.product_price}
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_price_sale" className="block text-sm font-medium text-gray-700">Giá khuyến mãi</label>
                                            <input
                                                type="number"
                                                name="product_price_sale"
                                                id="product_price_sale"
                                                value={product.product_price_sale}
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_quantity" className="block text-sm font-medium text-gray-700">Số lượng</label>
                                            <input
                                                type="number"
                                                name="product_quantity"
                                                id="product_quantity"
                                                value={product.product_quantity}
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_image1" className="block text-sm font-medium text-gray-700">Hình ảnh 1</label>
                                            <input
                                                type="file"
                                                name="product_image1"
                                                id="product_image1"
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_image2" className="block text-sm font-medium text-gray-700">Hình ảnh 2</label>
                                            <input
                                                type="file"
                                                name="product_image2"
                                                id="product_image2"
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                            <select
                                                name="product_status"
                                                id="product_status"
                                                value={product.product_status}
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            >
                                                <option value="2">Chưa xuất bản</option>
                                                <option value="1">Xuất bản</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default EditProduct;
