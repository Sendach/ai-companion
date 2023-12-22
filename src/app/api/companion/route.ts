import prismadb from "@/lib/prismadb";

import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.firstName) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { name, description, instructions, seed, src, categoryId } = body;

    if (!name || !description || !instructions || !seed || !src || !categoryId)
      return new NextResponse('Missing required fields', { status: 400 });

    // TODO: Check for subscription

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        name,
        description,
        instructions,
        src,
        seed
      }
    });

    return NextResponse.json(companion);
    
  } catch(error) {
    console.log('[COMPANION_POST', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}