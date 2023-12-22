import prismadb from "@/lib/prismadb";

import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    if (!params.companionId) return new NextResponse('Companion ID is required', { status: 400 });

    const user = await currentUser();
    if (!user || !user.id || !user.firstName) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { name, description, instructions, seed, src, categoryId } = body;

    if (!name || !description || !instructions || !seed || !src || !categoryId)
      return new NextResponse('Missing required fields', { status: 400 });

    // TODO: Check for subscription

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
      },
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
    console.log('[COMPANION_PATCH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    if (!params.companionId) return new NextResponse('Companion ID is required', { status: 400 });

    const user = await currentUser();
    if (!user || !user.id || !user.firstName) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { name, description, instructions, seed, src, categoryId } = body;

    if (!name || !description || !instructions || !seed || !src || !categoryId)
      return new NextResponse('Missing required fields', { status: 400 });

    // TODO: Check for subscription

    const companion = await prismadb.companion.delete({
      where: {
        id: params.companionId,
      }
    });

    return NextResponse.json(companion);
    
  } catch(error) {
    console.log('[COMPANION_DELETE', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}