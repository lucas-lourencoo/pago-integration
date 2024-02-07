export async function POST(request: Request) {
  const data = await request.json();
  console.log("🚀 ~ POST ~ data:", data);

  return Response.json(data);
}
