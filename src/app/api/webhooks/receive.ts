type CashInWeebhook = {
  uniqueId: string;
  transactionValue: number;
  fee: number;
  dateTimeRequisition: string;
  status: string;
  statusCode: number;
  bankcode: string;
  type: string;
  salesId: string;
};

export async function POST(request: Request) {
  const data: CashInWeebhook = await request.json();

  console.log("🚀 ~ POST ~ data:", data);

  return Response.json(data);
}
