import { pinata } from "@/config/pinata";
import { type NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const name: string | undefined = data.get("name")?.toString();
    const bgcolor: string | undefined = data.get("background_color")?.toString();
    const description: string | undefined = data.get("description")?.toString();
    if (!name || !description) {
      throw new Error(`No name or description `);
    }
    const file: File | null = data.get("image") as unknown as File;
    const uploadData = await pinata.upload.file(file).addMetadata({
      keyValues: {
        name: name,
        description: description,
      },
    });

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
    const accuratePrice = Number(res.result.usdPrice) * Number(data.get("price")?.toString());

    const url = await pinata.gateways.convert(uploadData.IpfsHash);
    const view = {
      name: name,
      description: description,
      external_url: "https://pinata.cloud",
      logo: url,
      bgcolor: bgcolor,
      price: accuratePrice,
      video_url: data.get("video_url")?.toString() || "",
      category: data.get("category")?.toString() || "",
    };

    const uploadJson = await pinata.upload.json(view);
    const jsonurl = await pinata.gateways.convert(uploadJson.IpfsHash);
    return NextResponse.json({ url, jsonurl }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
