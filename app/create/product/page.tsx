"use client"

import React from "react";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { useWrite } from "@/utils/writeContract";
import { useAccount } from "wagmi";
import {Select, SelectItem} from "@heroui/select"

export const categories = [
    { key: "electronics", label: "Electronics" },
    { key: "fashion", label: "Fashion" },
    { key: "home_appliances", label: "Home Appliances" },
    { key: "beauty", label: "Beauty & Personal Care" },
    { key: "books", label: "Books" },
    { key: "toys", label: "Toys & Games" },
    { key: "sports", label: "Sports & Outdoors" },
    { key: "automotive", label: "Automotive" },
    { key: "grocery", label: "Grocery" },
    { key: "furniture", label: "Furniture" },
    { key: "health", label: "Health & Wellness" },
    { key: "pets", label: "Pet Supplies" },
    { key: "jewelry", label: "Jewelry & Accessories" },
    { key: "music", label: "Musical Instruments" },
    { key: "office", label: "Office Supplies" },
];


export default function App() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const {writeAsync} = useWrite({contract:"Nft"})
    const {address} = useAccount()
    
    const createProductMutation = useMutation({
        mutationFn: async (ProductData: FormData) => {
            const response = await fetch('/api/create/product', {
                method: 'POST',
                
                body: ProductData
            });
            
            if (!response.ok) {
                throw new Error('Failed to create Product');
            }
            
            return response.json();
        },
        onSuccess: async (data) => {
            // Handle successful Product creation
            console.log('Product created:', data);
            await writeAsync({
                functionName:"safeMint",
                args:[address, data.jsonurl]
            })
            // You might want to redirect or show a success message
            addToast({
                title: "Successful",
                description: "Product Created",
                severity:"success"
              });
              setLoading(false)

            
        },
        onError: (error) => {
            setLoading(false)
            // Handle error
            console.error('Error creating Product:', error);
            // You might want to show an error message
            addToast({
                title: "Declined",
                description: "Some Error Ocurred",
                severity:"danger"
              });
        },
    });


    return (
        <div className=" flex justify-center items-end  w-full  rounded-md">
            
            <div className="  flex flex-col gap-8 justify-center w-full items-center">
                <h2 className=" text-2xl">Create A Product</h2>
                <Form
                    encType="multipart/form-data"
                    className="w-full max-w-2xl flex flex-col gap-4"
                    onReset={() => setLoading(false)}
                    onSubmit={(e) => {
                        e.preventDefault();
                        let data = Object.fromEntries(new FormData(e.currentTarget));
                        setLoading(true)
                        console.log(data)
                        createProductMutation.mutate(new FormData(e.currentTarget));
                        
                    }}
                >
                    {/* Basic Product Information */}
                    <div className=" flex gap-2 w-full">
                    <Input
                        
                        className=" w-full block  flex-1 "
                        isRequired
                        label="Product Name"
                        labelPlacement="outside"
                        name="name"
                        
                        placeholder="Enter your Product name"
                        type="text"
                    />

                    <Input
                        
                        className=" w-full flex-1 block "
                        label="Image URL"
                        labelPlacement="outside"
                        name="image"
                        placeholder="Product image URL"
                        type="file"
                    />
                    </div>

                    <Textarea
                        isRequired
                        label="Description"
                        labelPlacement="outside"
                        name="description"
                        placeholder="Describe your Product"
                        type="text"
                    />

                    {/* Product Media */}
                    

                    <div className="grid grid-cols-2 w-full gap-2">
                    <Input
                        
                        className=" w-full block "
                        label="Price"
                        labelPlacement="outside"
                        name="Price"
                        placeholder="Product Price"
                        type="number"
                    />

                    <Input
                        
                        className=" w-full block "
                        label="Background Color"
                        labelPlacement="outside"
                        name="background_color"
                        placeholder="e.g., #FFFFFF"
                        type="text"
                        pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                    />
                    </div>

                    <div className=" grid grid-cols-2 w-full gap-2">
                    <Input
                        
                        className=" w-full block "
                        label="Video URL"
                        labelPlacement="outside"
                        name="video_url"
                        placeholder="Optional Video URL"
                        type="url"
                    />

                    </div>

                    
                    <div className="grid grid-cols-3 w-full gap-2">
                    <Select className="max-w-xs" label="Category" name="category" placeholder="Select a category">
                        {categories.map((category) => (
                        <SelectItem key={category.key}>{category.label}</SelectItem>
                        ))}
                    </Select>

                    {/* Website Links */}
                   

                    </div>
                    {/* Existing buttons */}
                    <div className="flex gap-2">
                        <Button disabled={loading} color="primary" type="submit">
                            Submit {loading ? "Loading ...":""}
                        </Button>
                        <Button type="reset" variant="flat">
                            Reset
                        </Button>
                    </div>

                   
                </Form>
            </div>
        </div>
    );
}

