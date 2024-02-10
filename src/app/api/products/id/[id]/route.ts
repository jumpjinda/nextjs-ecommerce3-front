import Product from "@/models/Product";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  const id = params.id;
  try {
    await mongooseConnect();
    const product = await Product.findOne({ _id: id });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Database Error!");
  }
};
