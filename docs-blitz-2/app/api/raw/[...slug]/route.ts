import { NextResponse, type NextRequest } from "next/server"

import { source } from "@/lib/source"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const normalizedSlug = slug[0] === "docs" ? slug.slice(1) : slug

  const page = source.getPage(normalizedSlug)
  if (!page) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  try {
    const content = await page.data.getText("raw")

    // Return raw markdown with appropriate headers
    return new NextResponse(content, {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to load page content" },
      { status: 500 }
    )
  }
}
