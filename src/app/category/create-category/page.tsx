'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

const CreateCategory = () => {
    const router = useRouter();
    const [value, setValue] = useState({
        category_name: "",
        category_image: "",
        category_description: "",
        category_status: 1,
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
        console.log("Data category: ", value)
        try {
            const response = await fetch('http://localhost:1337/api/categories/create-category', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });


            if (response.ok) {
                const data = await response.json();
                router.push("/category")
                console.log("Data category: ", value)
                console.log("Danh mục đã được thêm thành công!", data);
            } else {
                alert("Thêm danh mục thất bại!");
                console.log("data: ", value)
                console.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h4 className="text-center text-lg font-bold mb-4">THÊM DANH MỤC</h4>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Category Name */}
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700">Tên danh mục</label>
                    <input
                        type="text"
                        name="category_name"
                        onChange={handleInput}
                        className="w-full p-2 border rounded-md"
                    />

                </div>

                <div className="mb-4">
                    <label className="block font-semibold text-gray-700">Mô tả</label>
                    <textarea
                        name="category_description"
                        onChange={handleInput}
                        className="w-full p-2 border rounded-md"
                        rows={4}
                    ></textarea>

                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label htmlFor="category_image" className="block font-semibold text-gray-700">Hình ảnh</label>
                    <input type="file" name="category_image" data-folder="categories"
                        onChange={handleInput} className="w-full" />
                </div>

                <div className="mb-3">
                    <label htmlFor="product_status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                        name="category_status"
                        id="category_status"
                        onChange={handleInput}
                        className="form-control mt-1 p-2 w-full border border-gray-300 rounded"
                    >
                        <option value="false">Chưa xuất bản</option>
                        <option value="true">Xuất bản</option>
                    </select>
                </div>

                <div className="card-header">
                    <div className="flex justify-center space-x-5">
                        <div className="">
                            <button type="submit" name="create" className="btn btn-sm bg-green-500 text-white p-2 rounded grid grid-rows-1 grid-flow-col flex justify-center">
                                <BiSave fontSize={24} className="mr-3" /> Lưu
                            </button>
                        </div>
                        <Link href='../categories'>
                            <button
                                type="button"
                                className="btn btn-sm bg-blue-500 text-white p-2 rounded grid grid-rows-1 grid-flow-col flex justify-center"
                            >
                                <BsArrowLeft fontSize={24} className="mr-3" /> Về danh sách
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateCategory
