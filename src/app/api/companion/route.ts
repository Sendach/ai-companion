import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export const POST = async (req: Request) => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.firstName) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { name, description, instructions, seed, src, categoryId } = body;

    if (!name || !description || !instructions || !seed || !src || !categoryId)
      return new NextResponse('Missing required fields', { status: 400 });

    const isPro = await checkSubscription();
    if (!isPro) return new NextResponse("Pro subscription required", { status: 403 });

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
    
  } catch (error) {
    console.log('[COMPANION_POST', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}