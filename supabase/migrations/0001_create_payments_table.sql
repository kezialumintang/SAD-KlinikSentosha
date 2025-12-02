-- Create a payments table for the app

-- NOTE: Run this in your Supabase SQL editor or with supabase cli `supabase db push`.

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  method text NOT NULL,
  note text,
  created_at timestamptz DEFAULT now()
);

-- optional: a simple view for the latest payments
CREATE OR REPLACE VIEW public.recent_payments AS
SELECT id, patient_id, amount, method, note, created_at
FROM public.payments
ORDER BY created_at DESC;
