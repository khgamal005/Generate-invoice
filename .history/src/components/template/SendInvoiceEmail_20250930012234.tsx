import * as React from 'react';
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmailTemplateProps {
  firstName: string;
  invoiceNo : string;
  dueDate : string;
  total : string;
  invoiceURL : string;
}

export const InvoiceTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  invoiceNo,
  dueDate,
  total,
  invoiceURL
}) =>
  return{
    

  } 
