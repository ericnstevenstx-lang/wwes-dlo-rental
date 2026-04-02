import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const row = {
      // Customer info
      company_name: body.companyName || null,
      company_address: body.companyAddress || null,
      company_email: body.companyEmail || null,
      employee_pickup: body.employeePickup || null,
      wwes_account_number: body.wwesAccountNumber || null,
      // Check-out
      checkout_date: body.checkoutDate || null,
      invoice_number: body.invoiceNumber || null,
      dlo_qty: body.dloQty || null,
      dlo_weights: body.dloWeights || null,
      male_whips_qty: body.maleWhipsQty || null,
      male_whips_weights: body.maleWhipsWeights || null,
      female_whips_qty: body.femaleWhipsQty || null,
      female_whips_weights: body.femaleWhipsWeights || null,
      wwes_rep_checkout: body.wwesRepCheckout || null,
      renter_signature_checkout: body.renterSignatureCheckout || null,
      checkout_deficiencies: body.checkoutDeficiencies || null,
      check_in_date: body.checkInDate || null,
      dlo_qty_return: body.dloQtyReturn || null,
      dlo_weights_return: body.dloWeightsReturn || null,
      male_whips_qty_return: body.maleWhipsQtyReturn || null,
      male_whips_weights_return: body.maleWhipsWeightsReturn || null,
      female_whips_qty_return: body.femaleWhipsQtyReturn || null,
      female_whips_weights_return: body.femaleWhipsWeightsReturn || null,
      visual_deficiencies: body.visualDeficiencies || null,
      known_deficiencies: body.knownDeficiencies || null,
      renter_signature_checkin: body.renterSignatureCheckin || null,
      wwes_rep_checkin: body.wwesRepCheckin || null,
      charges: body.charges || {},
      total_charges: body.total || 0,
      back_charge_notes: body.backChargeNotes || null,
      charge_invoice: body.chargeInvoice || null,
      wwes_supervisor: body.wwesSupervisor || null,
      terms_accepted: body.acceptedTerms || false,
      terms_accepted_at: body.acceptedTerms ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from("dlo_rental_agreements")
      .insert(row)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("dlo_rental_agreements")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submissions: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
