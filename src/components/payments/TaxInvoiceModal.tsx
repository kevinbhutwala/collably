"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/core/utils/formatters";
import {
  Printer,
  Download,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building2,
  Receipt,
} from "lucide-react";

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  campaignTitle: string;
  deliverableTitle?: string;
  brandName: string;
  creatorName: string;
  currency: string;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  transactionId?: string;
  paymentMethod?: string;
  taxNote?: string;
}

interface TaxInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceData | null;
}

export function TaxInvoiceModal({ isOpen, onClose, invoice }: TaxInvoiceModalProps) {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Milestone Tax Invoice & Receipt"
      description="VAT/GST compliant financial transaction record issued under AbeyCollab Master Marketplace Services."
    >
      <div className="space-y-6 font-sans text-[#0A0A0E] dark:text-[#F4F4F8] print:text-black">
        {/* Printable Document Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#151520] border border-black/10 dark:border-white/10 shadow-xs space-y-6 print:border-none print:p-0">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl font-display text-[#0A0A0E] dark:text-white">
                  AbeyCollab
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-300 dark:border-emerald-700/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> PAID / SETTLED
                </span>
              </div>
              <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
                Global Marketplace Escrow Custody Rail
              </p>
              <p className="text-[11px] font-mono text-[#7A7A8A]">
                Tax ID / GSTIN: 27AABCA1234F1Z8
              </p>
            </div>

            <div className="text-right space-y-1 font-mono text-xs">
              <span className="text-[#7A7A8A] block text-[10px] uppercase">Invoice Number</span>
              <strong className="text-sm text-[#0A0A0E] dark:text-white font-bold block">
                {invoice.invoiceNumber}
              </strong>
              <span className="text-[#6A6A78] text-[11px] block">
                Date: {new Date(invoice.issueDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
              </span>
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-black/10 dark:border-white/10 text-xs">
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-1">
              <span className="text-[#7A7A8A] uppercase text-[10px] font-mono block">Billed To (Sponsor Brand)</span>
              <strong className="text-sm text-[#0A0A0E] dark:text-white block font-display">
                {invoice.brandName}
              </strong>
              <p className="text-[#6A6A78] dark:text-[#8E8EA4]">Authorized Commercial Sponsor</p>
            </div>

            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-1">
              <span className="text-[#7A7A8A] uppercase text-[10px] font-mono block">Beneficiary (Content Creator)</span>
              <strong className="text-sm text-[#0A0A0E] dark:text-white block font-display">
                {invoice.creatorName}
              </strong>
              <p className="text-[#6A6A78] dark:text-[#8E8EA4]">Verified Creator Partner</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 font-mono text-[11px] font-bold flex justify-between uppercase text-[#6A6A78] dark:text-[#8E8EA4]">
              <span>Milestone Description</span>
              <span>Amount ({invoice.currency})</span>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5 text-xs font-mono">
              <div className="py-2.5 flex justify-between items-center">
                <div>
                  <strong className="font-bold text-[#0A0A0E] dark:text-white block font-sans">
                    {invoice.campaignTitle}
                  </strong>
                  <span className="text-[#6A6A78] dark:text-[#8E8EA4] text-[11px]">
                    {invoice.deliverableTitle || "Approved Milestone Deliverable"}
                  </span>
                </div>
                <span className="font-extrabold text-[#0A0A0E] dark:text-white">
                  {formatCurrency(invoice.grossAmount, invoice.currency)}
                </span>
              </div>

              <div className="py-2 flex justify-between items-center text-[#6A6A78] dark:text-[#8E8EA4]">
                <span>Platform Escrow Services Fee (10%)</span>
                <span>-{formatCurrency(invoice.platformFee, invoice.currency)}</span>
              </div>

              <div className="py-3 flex justify-between items-center text-sm font-extrabold pt-3">
                <span className="text-[#0A0A0E] dark:text-white font-sans">Net Payout Disbursed</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono text-base">
                  {formatCurrency(invoice.netAmount, invoice.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Metadata Footer */}
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-1 text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
            <div className="flex justify-between">
              <span>Settlement Rail:</span>
              <strong className="text-[#0A0A0E] dark:text-white">{invoice.paymentMethod || "Direct Bank Deposit / Stripe Express"}</strong>
            </div>
            {invoice.transactionId && (
              <div className="flex justify-between">
                <span>Transaction Ref:</span>
                <span className="truncate max-w-[220px]">{invoice.transactionId}</span>
              </div>
            )}
            <div className="pt-2 text-[10px] leading-relaxed border-t border-black/5 dark:border-white/5">
              {invoice.taxNote ||
                "This document constitutes a valid automated tax receipt and proof of commercial deliverable clearance. No physical signature required."}
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="flex items-center justify-end gap-2.5 pt-2 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#FFD21F]" />
            Print / Save as PDF
          </button>
        </div>
      </div>
    </Modal>
  );
}
