import { Course } from "@/models/Course";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const createdCourse = await Course.create(body);
    return NextResponse.json(createdCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find({});
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

