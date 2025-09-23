import { auth } from "@/lib/auth";
import InvoiceClientPage from "../_component/InvoiceClientPage";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default async function InvoicePage(){
    const session = await auth()
    return(
       <>
       invoicepa
       </>
    )
}