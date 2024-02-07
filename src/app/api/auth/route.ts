import { z } from "zod";

const apiResponseSchema = z.object({
  accessToken: z.string(),
  type: z.string(),
  status: z.number(),
  errors: z.array(z.string()),
});

type ApiResponseData = z.infer<typeof apiResponseSchema>;

export async function POST() {
  const response = await fetch(process.env.PAGO_BASE_URL + "/auth", {
    method: "POST",
    headers: {
      Authorization:
        "Basic" +
        Buffer.from(
          process.env.PAGO_CLIENT_ID + ":" + process.env.PAGO_CLIENT_SECRET
        ).toString("base64"),
    },
  });

  const data: ApiResponseData = await response.json();

  if (!data.accessToken) {
    return Response.json(
      { message: data.errors[0] },
      {
        status: data.status!,
      }
    );
  }

  return Response.json(data, {
    status: 200,
  });
}
