// app/api/submit/route.js

import { assert } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let dashboardUrl = process.env.DASHBOARD_URL;
    if (typeof dashboardUrl !== "string") {
      return NextResponse.json(
        { message: "Internal Server Error, invalid dashboard url" },
        { status: 500 }
      );
    }
    if (dashboardUrl.endsWith("/")) {
      dashboardUrl = dashboardUrl.slice(0, -1);
    }
    const { email, formResponse } = await request.json();
    if (!email || !formResponse) {
      return NextResponse.json(
        { message: "Email and data are required" },
        { status: 400 }
      );
    }
    const response = await fetch(
      `${dashboardUrl}/api/robotics-quest-quiz-responses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          formResponse,
        }),
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
