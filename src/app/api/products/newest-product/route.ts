import Product from "@/models/Product";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await mongooseConnect();
    const newestProduct = await Product.findOne({}, null, {
      sort: {
        _id: -1,
      },
    });
    return NextResponse.json(newestProduct);
  } catch (error) {
    return new NextResponse("Database Error!");
  }
};
