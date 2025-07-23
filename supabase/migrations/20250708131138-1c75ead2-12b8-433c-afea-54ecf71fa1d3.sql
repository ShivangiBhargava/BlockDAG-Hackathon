
-- Create a table to store transaction analysis results
CREATE TABLE public.transaction_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_hash TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  risk_score INTEGER NOT NULL CHECK (risk_score >= 1 AND risk_score <= 10),
  transaction_type TEXT NOT NULL,
  value_transferred TEXT NOT NULL,
  gas_used TEXT NOT NULL,
  contract_info JSONB,
  recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store user favorites (optional - for logged in users)
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  transaction_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, transaction_hash)
);

-- Add Row Level Security
ALTER TABLE public.transaction_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Allow public read access to transaction analyses (everyone can see analysis results)
CREATE POLICY "Anyone can view transaction analyses" 
  ON public.transaction_analyses 
  FOR SELECT 
  USING (true);

-- Allow the system to insert new analyses
CREATE POLICY "System can insert transaction analyses" 
  ON public.transaction_analyses 
  FOR INSERT 
  WITH CHECK (true);

-- Users can only see their own favorites
CREATE POLICY "Users can view their own favorites" 
  ON public.user_favorites 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can add their own favorites
CREATE POLICY "Users can add their own favorites" 
  ON public.user_favorites 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can remove their own favorites
CREATE POLICY "Users can remove their own favorites" 
  ON public.user_favorites 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create an index for faster lookups
CREATE INDEX idx_transaction_analyses_hash ON public.transaction_analyses(transaction_hash);
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);
