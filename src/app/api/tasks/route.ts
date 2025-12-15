import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";

import Task from "../../../models/Task";
import { connectDB } from "../../../lib/mongodb";

// GET
export async function GET() {
  const session = await getServerSession(
    authOptions as NextAuthOptions
  );

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const tasks = await Task.find({
    userId: session.user.email,
  }).sort({ createdAt: -1 });

  return NextResponse.json(tasks);
}

// POST
export async function POST(req: Request) {
  const session = await getServerSession(
    authOptions as NextAuthOptions
  );

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();

  await connectDB();

  const task = await Task.create({
    userId: session.user.email,
    title,
    completed: false,
  });

  return NextResponse.json(task);
}

// PATCH
export async function PATCH(req: Request) {
  const session = await getServerSession(
    authOptions as NextAuthOptions
  );

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, completed } = await req.json();

  await connectDB();

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: session.user.email },
    { completed },
    { new: true }
  );

  return NextResponse.json(updatedTask);
}

// DELETE
export async function DELETE(req: Request) {
  const session = await getServerSession(
    authOptions as NextAuthOptions
  );

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  await connectDB();

  await Task.deleteOne({
    _id: id,
    userId: session.user.email,
  });

  return NextResponse.json({ success: true });
}
