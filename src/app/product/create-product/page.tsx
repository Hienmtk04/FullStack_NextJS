'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

const CreateProduct = () => {

    const router = useRouter();
    const [value, setValue] = useState({
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

    const handleInput = async (event) => {
        const { name, files } = event.target;
        const folder = event.target.dataset.folder;
        console.log("folder:", folder);  // Kiểm tra giá trị folder
    
        if (files && files[0]) {
            const file = files[0];
        
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);
    
            // Kiểm tra nội dung FormData
            console.log("FormData content:");
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
    
            try {
                const response = await fetch('http://localhost:1337/upload', {
                    method: "POST",
                    body: formData, 
                });
                
    
                if (response.ok) {
                    const data = await response.json();
                    if (data.fileName) {
                        setValue((prev) => ({
                            ...prev,
                            [name]: data.fileName,
                        }));
                    } else {
                        alert('File upload response does not contain a valid file name!');
                    }
                } else {
                    console.error('Upload error:', await response.text());
                    alert('Failed to upload image!');
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert('Unexpected error during file upload!');
            }
        } else {
            setValue((prev) => ({ ...prev, [name]: event.target.value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Data products: ", value)
        try {
            const response = await fetch('http://localhost:1337/api/products/create-product', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });


            if (response.ok) {
                const data = await response.json();
                data.created_at = Date.now();
                router.push("/product")
                console.log("Data products: ", value)
                console.log("Sản phẩm đã được thêm thành công!", data);
            } else {
                alert("Thêm sản phẩm thất bại!");
                console.log("data: ", value)
                console.error('Failed to add product');
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
                        <h1 className="text-xl font-semibold">Thêm sản phẩm</h1>
                    </div>
                </div>

                <section className="content">
                    <div className="card">
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div className="card-body p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                                            <input
                                                type="text"
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
                                                data-folder="product"
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
                                                data-folder="product"
                                                onChange={handleInput}
                                                className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="product_status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                            <select
                                                name="product_status"
                                                id="product_status"
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
                            <div className="card-header">
                                <div className="flex justify-center space-x-5">
                                    <div className="">
                                        <button type="submit" name="create" className="btn btn-sm bg-green-500 text-white p-2 rounded grid grid-rows-1 grid-flow-col flex justify-center">
                                            <BiSave fontSize={24} className="mr-3"/> Lưu
                                        </button>
                                    </div>
                                    <Link href='../product'>
                                        <button
                                            type="button"
                                            className="btn btn-sm bg-blue-500 text-white p-2 rounded grid grid-rows-1 grid-flow-col flex justify-center"
                                        >
                                            <BsArrowLeft fontSize={24} className="mr-3"/> Về danh sách
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default CreateProduct
