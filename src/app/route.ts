import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    return NextResponse.redirect(new URL(!session ? '/login' : '/dashboard', req.url));
}