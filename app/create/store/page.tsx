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

export default function App() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const {writeAsync} = useWrite({contract:"Store"})
    const {address} = useAccount()
    
    const createStoreMutation = useMutation({
        mutationFn: async (storeData: FormData) => {
            const response = await fetch('/api/create/store', {
                method: 'POST',
                
                body: storeData
            });
            
            if (!response.ok) {
                throw new Error('Failed to create store');
            }
            
            return response.json();
        },
        onSuccess: async (data) => {
            // Handle successful store creation
            console.log('Store created:', data);
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
            console.error('Error creating store:', error);
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
                <h2 className=" text-2xl">Create A Store</h2>
                <button onClick={async()=>{
                    const priceData = await fetch("https://rpc.ankr.com/multichain/34e09c0b23e338cc418de4198834f827a1ddfc21af2f3bcafd94a5370ff59dea", {
                        method:"POST", 
                        headers:{

                        },
                        body:JSON.stringify({
                            "jsonrpc": "2.0",
                            "method": "ankr_getTokenPrice",
                            "params": {
                                "blockchain": "eth",
                                "contractAddress": "0x8290333cef9e6d528dd5618fb97a76f268f3edd4"
                            },
                            "id": 1
                        })
                      })
                      const res = await priceData.json()
                      const accuratePrice = Number(res.result.usdPrice)
                      console.log(res, accuratePrice)
                }}>Test</button>
                <Form
                    encType="multipart/form-data"
                    className="w-full max-w-2xl flex flex-col gap-4"
                    onReset={() => setLoading(false)}
                    onSubmit={(e) => {
                        e.preventDefault();
                        let data = Object.fromEntries(new FormData(e.currentTarget));
                        setLoading(true)
                        console.log(data)
                        createStoreMutation.mutate(new FormData(e.currentTarget));
                        
                    }}
                >
                    {/* Basic Store Information */}
                    <div className=" flex gap-2 w-full">
                    <Input
                        
                        className=" w-full block  flex-1 "
                        isRequired
                        label="Store Name"
                        labelPlacement="outside"
                        name="name"
                        
                        placeholder="Enter your store name"
                        type="text"
                    />

                    <Input
                        
                        className=" w-full flex-1 block "
                        label="Logo URL"
                        labelPlacement="outside"
                        name="logo"
                        placeholder="Store logo URL"
                        type="file"
                    />
                    </div>

                    <Textarea
                        isRequired
                        label="Description"
                        labelPlacement="outside"
                        name="description"
                        placeholder="Describe your store"
                        type="text"
                    />

                    {/* Store Media */}
                    

                    <div className="grid grid-cols-2 w-full gap-2">
                    <Input
                        
                        className=" w-full block "
                        label="Banner URL"
                        labelPlacement="outside"
                        name="banner"
                        placeholder="Store banner URL"
                        type="url"
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
                        label="Animation URL"
                        labelPlacement="outside"
                        name="animation_url"
                        placeholder="Optional animated content URL"
                        type="url"
                    />

                    {/* Social Media Links */}
                    <Input
                        
                        className=" w-full block "
                        label="Twitter Handle"
                        labelPlacement="outside"
                        name="twitter"
                        placeholder="@username"
                        type="text"
                    />
                    </div>

                    <div className="grid grid-cols-2 w-full gap-2">
                    <Input
                        
                        className=" w-full block "
                        label="Instagram Handle"
                        labelPlacement="outside"
                        name="instagram"
                        placeholder="@username"
                        type="text"
                    />

                    <Input
                        
                        className=" w-full block "
                        label="Discord Server"
                        labelPlacement="outside"
                        name="discord"
                        placeholder="Discord invite URL"
                        type="url"
                    />
                    </div>
                    <div className="grid grid-cols-3 w-full gap-2">
                    <Input
                        
                        className=" w-full block "
                        label="YouTube URL"
                        labelPlacement="outside"
                        name="youtube_url"
                        placeholder="Store's YouTube video URL"
                        type="url"
                    />

                    {/* Website Links */}
                    <Input
                        
                        className=" w-full block "
                        label="Website"
                        labelPlacement="outside"
                        name="website"
                        placeholder="Your store's website"
                        type="url"
                    />

                    <Input
                        
                        className=" w-full block "
                        label="Owner Picture"
                        labelPlacement="outside"
                        name="ownerImage"
                        placeholder="Owner Image URL"
                        type="url"
                    />

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

