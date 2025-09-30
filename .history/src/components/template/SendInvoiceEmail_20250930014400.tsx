import { defaultCollections } from "@auth/mongodb-adapter";
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  invoiceNo: string;
  dueDate: string;
  total: string;
  invoiceURL: string;
}

export default const InvoiceTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  invoiceNo,
  dueDate,
  total,
  invoiceURL,
}) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
      <h1>Welcome, {firstName}!</h1>

      <div>
        <p><strong>Invoice No.:</strong> {invoiceNo}</p>
        <p><strong>Due Date:</strong> {dueDate}</p>
        <p><strong>Total:</strong> {total}</p>
      </div>

      <a
        href={invoiceURL}
        style={{
          display: "inline-block",
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: "6px",
          marginTop: "12px",
        }}
      >
        Download Invoice
      </a>
    </div>
  );
};





  
