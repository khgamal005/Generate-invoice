import ReactDOMServer from "react-dom/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/email.config";
import { currencyOption, TCurrencyKey } from "@/lib/utils";
import InvoiceModel, { IInvoice } from "@/models/invoice.model";
import { format } from "date-fns";
import { NextResponse, NextRequest } from "next/server";
import { InvoiceTemplate } from "../../../../components/template/SendInvoiceEmail";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ invoiceId: string; userId: string }> }
) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { invoiceId } = await params;
    const { subject } = await request.json();

    // Connect to DB
    await connectDB();

    // Find the invoice
    const invoiceData: IInvoice | null = await InvoiceModel.findById(invoiceId);
    if (!invoiceData) {
      return NextResponse.json(
        { message: "No invoice found" },
        { status: 404 }
      );
    }

    // Build invoice URL
    const invoiceURL = `${process.env.DOMAIN}/api/invoice/${session.user.id}/${invoiceId}`;

    // Render email template to HTML string

const htmlString = ReactDOMServer.renderToStaticMarkup(
  (InvoiceTemplate as React.FC<EmailTemplateProps>)({
    firstName: session.user.firstName,
    invoiceNo: invoiceData.invoice_no,
    dueDate: format(invoiceData.due_date, "PPP"),
    total: `${currencyOption[invoiceData.currency as TCurrencyKey]} ${invoiceData.total}`,
    invoiceURL: invoiceURL
  })
);

    // Send email
    const emailResponse = await sendEmail(
      invoiceData.to.email,
      subject,
      htmlString
    );

    return NextResponse.json({
      message: "Email sent successfully",
      data: emailResponse,
    });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
