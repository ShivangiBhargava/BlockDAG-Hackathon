
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  summary: string;
  riskScore: number;
  transactionType: string;
  valueTransferred: string;
  gasUsed: string;
  contractInfo?: {
    isVerified: boolean;
    name?: string;
  };
  recommendations?: string[];
}

export const useTransactionAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeTransaction = async (txHash: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Analyzing transaction:', txHash);
      
      const { data, error: functionError } = await supabase.functions.invoke('analyze-transaction', {
        body: { transactionHash: txHash }
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(functionError.message || 'Failed to analyze transaction');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      console.log('Analysis result:', data);
      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeTransaction,
    isLoading,
    result,
    error
  };
};
