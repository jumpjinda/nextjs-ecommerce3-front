import Product from "@/models/Product";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  const category = params.name;
  try {
    await mongooseConnect();
    const products = await Product.find({ category: category });
    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Database Error!");
  }
};
