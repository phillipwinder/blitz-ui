import { source } from "@/lib/source"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    return new Response("Not found", { status: 404 })
  }

  const raw = await page.data.getText("raw")

  return new Response(raw, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  })
}
