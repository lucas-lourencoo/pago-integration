type CashOutData = {
  uniqueId: string;
  transactionValue: number;
  dateTimeRequisition: string;
  status: string;
  statusCode: number;
  bankcode: string;
  type: string;
  merchantReference: string;
  errorDescription: string;
};

export async function POST(request: Request) {
  const data: CashOutData = await request.json();

  console.log("🚀 ~ POST ~ data:", data);

  return Response.json(data);
}
