import fetch from "node-fetch";

export async function POST(req: Request) {
  const { url } = await req.json();

  let response = await fetch(url);
  if (response.ok) {
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        ...response.headers, // copy the previous headers
        "content-disposition": `attachment; filename="image.png"`,
      },
    });
  }
}
