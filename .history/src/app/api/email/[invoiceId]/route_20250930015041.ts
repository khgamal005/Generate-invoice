import { currencyOption, TCurrencyKey } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/email.config";
import InvoiceModel, { IInvoice } from "@/models/invoice.model";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server"; // ✅ import only here
import InvoiceTemplate from "../../../../components/template/SendInvoiceEmail";

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
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { invoiceId, userId } = params;
    const { subject } = await request.json();

    await connectDB();

    const invoiceData: IInvoice | null = await InvoiceModel.findById(invoiceId);
    if (!invoiceData) {
      return NextResponse.json(
        { message: "No invoice found" },
        { status: 404 }
      );
    }

    // Construct invoice URL
    const invoiceURL = `${process.env.NEXT_PUBLIC_APP_URL}/invoice/${userId}/${invoiceId}`;

    // Render HTML email
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(InvoiceTemplate, {
        firstName: session.user?.firstName ?? "Customer",
        invoiceNo: invoiceData.invoice_no,
        dueDate: format(invoiceData.due_date, "PPP"),
        total: `${currencyOption[invoiceData.currency as TCurrencyKey]} ${invoiceData.total}`,
        invoiceURL: invoiceURL,
      })
    );

// Plain text fallback
// (removed unused textString variable)

    const emailResponse = await sendEmail(
      invoiceData.to.email,
      subject,
      htmlString
    );

    return NextResponse.json({
      message: "Email sent successfully",
      data: emailResponse,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

