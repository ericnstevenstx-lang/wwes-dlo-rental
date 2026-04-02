-- DLO Rental Agreement submissions
-- Open access: anonymous insert + select via Supabase anon key

CREATE TABLE IF NOT EXISTS public.dlo_rental_agreements (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      timestamptz DEFAULT now(),

  -- Customer info
  company_name            text,
  company_address         text,
  company_email           text,
  employee_pickup         text,
  wwes_account_number     text,

  -- Check-out
  checkout_date           date,
  invoice_number          text,
  dlo_qty                 text,
  dlo_weights             text,
  male_whips_qty          text,
  male_whips_weights      text,
  female_whips_qty        text,
  female_whips_weights    text,
  wwes_rep_checkout       text,
  renter_signature_checkout text,
  checkout_deficiencies   text,

  -- Check-in
  check_in_date           date,
  dlo_qty_return          text,
  dlo_weights_return      text,
  male_whips_qty_return   text,
  male_whips_weights_return text,
  female_whips_qty_return text,
  female_whips_weights_return text,
  visual_deficiencies     text,
  known_deficiencies      text,
  renter_signature_checkin text,
  wwes_rep_checkin        text,

  -- Back charges
  charges                 jsonb       DEFAULT '{}'::jsonb,
  total_charges           numeric(10,2) DEFAULT 0,
  back_charge_notes       text,
  charge_invoice          text,
  wwes_supervisor         text,

  -- Terms acceptance
  terms_accepted          boolean     DEFAULT false,
  terms_accepted_at       timestamptz
);

-- RLS: open insert + select, no update/delete from anon
ALTER TABLE public.dlo_rental_agreements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON public.dlo_rental_agreements
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous reads"
  ON public.dlo_rental_agreements
  FOR SELECT
  TO anon
  USING (true);

-- Index on invoice number for lookups
CREATE INDEX idx_dlo_rental_invoice ON public.dlo_rental_agreements (invoice_number);
CREATE INDEX idx_dlo_rental_account ON public.dlo_rental_agreements (wwes_account_number);
CREATE INDEX idx_dlo_rental_created ON public.dlo_rental_agreements (created_at DESC);
