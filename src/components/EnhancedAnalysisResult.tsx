
import React from 'react';
import AnalysisResult from './AnalysisResult';
import TransactionVisualization from './TransactionVisualization';
import AIInsights from './AIInsights';
import BlockDAGIntegration from './BlockDAGIntegration';
import EnhancedTransactionAnalysis from './EnhancedTransactionAnalysis';

interface EnhancedAnalysisResultProps {
  result: {
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
  };
  transactionHash: string;
}

const EnhancedAnalysisResult = ({ result, transactionHash }: EnhancedAnalysisResultProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-6">
      {/* Network Status */}
      <BlockDAGIntegration />
      
      {/* Enhanced Real-time Analysis */}
      <EnhancedTransactionAnalysis 
        transactionHash={transactionHash}
        analysisResult={result}
      />
      
      {/* Transaction Visualization */}
      <TransactionVisualization result={result} />
      
      {/* AI Insights */}
      <AIInsights transactionHash={transactionHash} result={result} />
    </div>
  );
};

export default EnhancedAnalysisResult;
