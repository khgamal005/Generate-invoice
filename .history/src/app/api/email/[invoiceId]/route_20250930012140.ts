import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/email.config";
import InvoiceModel, { IInvoice } from "@/models/invoice.model";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { InvoiceTemplate } from "../../../../components/template/SendInvoiceEmail";

interface Params {
  invoiceId: string;
  userId: string;
}

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { invoiceId } = params;
    const { subject } = await request.json();

    await connectDB();

    const invoiceData: IInvoice | null = await InvoiceModel.findById(invoiceId);
    if (!invoiceData) return NextResponse.json({ message: "No invoice found" }, { status: 404 });

    const invoiceURL = `${process.env.NEXTAUTH_URL}/api/invoice/${session.user.id}/${invoiceId}`;

    // **Render InvoiceTemplate to string using JSX directly**
const html = ReactDOMServer.renderToStaticMarkup(
  <InvoiceTemplat
    firstName="Khaled"
    invoiceNo="12345"
    dueDate="2025-09-30"
    total="$200"
    invoiceURL="https://example.com/invoice.pdf"
  />
);
    const emailResponse = await sendEmail(invoiceData.to.email, subject, htmlString);

    return NextResponse.json({ message: "Email sent successfully", data: emailResponse });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Something went wrong" }, { status: 500 });
  }
}
