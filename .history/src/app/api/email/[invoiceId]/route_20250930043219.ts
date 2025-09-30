import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/email.config";
import InvoiceModel, { IInvoice } from "@/models/invoice.model";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  invoiceId: string;
  userId: string;
}

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Await async params (Next.js 15 requirement)
    const { invoiceId, userId } = await context.params;

    const { subject } = await request.json();

    await connectDB();

    const invoiceData: IInvoice | null = await InvoiceModel.findById(invoiceId);
    if (!invoiceData) {
      return NextResponse.json({ message: "No invoice found" }, { status: 404 });
    }

    const invoiceURL = `${process.env.NEXTAUTH_URL}/api/invoice/${userId}/${invoiceId}`;

    // ✅ Direct HTML string for email (safe for API routes)
    const htmlString = `
      <div>
        <h1>Hello ${session.user.firstName}</h1>
        <p>Invoice #${invoiceData.invoice_no}</p>
        <p>Due: ${format(invoiceData.due_date, "PPP")}</p>
        <p>Total: ${invoiceData.total}</p>
        <a href="${invoiceURL}">View Invoice</a>
      </div>
    `;

    const emailResponse = await sendEmail(
      invoiceData.to.email,
      subject,
      htmlString
    );

    return NextResponse.json({
      message: "Email sent successfully",
      data: emailResponse,
    });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
