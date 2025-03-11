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
    const file: File | null = data.get("logo") as unknown as File;
    const uploadData = await pinata.upload.file(file).addMetadata({
      keyValues: {
        name: name,
        description: description,
      },
    });

    const url = await pinata.gateways.convert(uploadData.IpfsHash);
    const view = {
      name: name,
      description: description,
      external_url: "https://pinata.cloud",
      image_url: url,
      logo: url,
      bgcolor: bgcolor,
      banner: data.get("banner")?.toString() || "",
      animation_url: data.get("animation_url")?.toString() || "",
      discord: data.get("discord")?.toString() || "",
      twiter: data.get("twiter")?.toString() || "",
      youtube_url: data.get("youtube_url")?.toString() || "",
      instagram: data.get("instagram")?.toString() || "",
      ownerImage:data.get("ownerImage")?.toString() || "",
    };

    const uploadJson = await pinata.upload.json(view);
    const jsonurl = await pinata.gateways.convert(uploadJson.IpfsHash);
    return NextResponse.json({ url, jsonurl }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
