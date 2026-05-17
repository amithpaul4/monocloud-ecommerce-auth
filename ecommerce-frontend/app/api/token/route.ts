import { NextResponse } from "next/server";
import { getSession } from "@monocloud/auth-nextjs";

export async function GET() {
  const session = await getSession();

  return NextResponse.json({
    token: session?.accessTokens?.[0]?.accessToken,
  });
}

