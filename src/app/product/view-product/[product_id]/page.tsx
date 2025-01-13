'use client'
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetails = () => {

    const { product_id } = useParams();

    console.log("product id: ", product_id)
    const [product, setProduct] = useState({});

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

    if (!product) {
        return (
            <div className="container mt-10 text-center">
                <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
                <Link href="/admin/product" className="btn btn-primary mt-5">
                    Quay về danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-10 p-5">
            <h4 className="text-center text-2xl font-bold mb-6">Chi tiết sản phẩm</h4>
            <hr className="mb-6" />

            <div className="flex flex-col md:flex-row bg-white shadow-md p-6 rounded-md">
                {/* Left Column */}
                <div className="md:w-1/2 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold">Danh mục:</span>
                        <span>{product.category_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Tên sản phẩm:</span>
                        <span>{product.product_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Tên mã sản phẩm:</span>
                        <span>{product.product_id_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Giá:</span>
                        <span>{product.product_price} VND</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Giá khuyến mãi:</span>
                        <span>{product.product_price_sale || "N/A"} VND</span>
                    </div>
                    <div className="justify-between whitespace-break-spaces">
                        <span className="font-semibold">Mô tả:</span>
                        <br/>
                        <span>{product.product_description}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Thương hiệu:</span>
                        <span>HELIAS</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Tình trạng:</span>
                        {
                            product.product_status === true ? <span>Đang bán</span> : <span>Ngưng bán</span>
                        }
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center items-center">
                    <div>
                        <span className="font-semibold">Hình ảnh:</span>
                        <Image
                            src={`/images/product/${product.product_image1}`}
                            alt="Product Image"
                            width={200}
                            height={200}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="text-center mt-6">
                <Link
                    href={`/product/edit-product/${product.product_id}`}
                    className="btn btn-primary px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-2"
                >
                    Chỉnh sửa
                </Link>
                <Link
                    href="/product"
                    className="btn btn-secondary px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mx-2"
                >
                    Quay về danh sách
                </Link>
            </div>
        </div>
    );
};

export default ProductDetails;
