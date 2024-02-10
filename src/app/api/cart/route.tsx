import Product from "@/models/Product";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const ids = await req.json();
  await mongooseConnect();
  const products = await Product.find({ _id: ids });
  return NextResponse.json(products);
};
