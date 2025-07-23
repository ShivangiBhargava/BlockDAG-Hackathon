
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Network, Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface TransactionVisualizationProps {
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
  };
}

const TransactionVisualization = ({ result }: TransactionVisualizationProps) => {
  const getRiskColor = (score: number) => {
    if (score >= 7) return "text-red-600";
    if (score >= 4) return "text-orange-600";
    return "text-green-600";
  };

  const getRiskBgColor = (score: number) => {
    if (score >= 7) return "bg-red-50 border-red-200";
    if (score >= 4) return "bg-orange-50 border-orange-200";
    return "bg-green-50 border-green-200";
  };

  const securityMetrics = [
    { label: "Contract Verification", value: result.contractInfo?.isVerified ? 100 : 0, max: 100 },
    { label: "Risk Assessment", value: (10 - result.riskScore) * 10, max: 100 },
    { label: "Gas Efficiency", value: parseInt(result.gasUsed.replace(/\D/g, '')) < 50000 ? 85 : 60, max: 100 }
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Network className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">BlockDAG Transaction Analysis</h3>
      </div>

      {/* Risk Score Visualization */}
      <div className={`p-4 rounded-lg border-2 ${getRiskBgColor(result.riskScore)}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${getRiskColor(result.riskScore)}`} />
            <span className="font-semibold">Security Risk Score</span>
          </div>
          <Badge variant="outline" className={getRiskColor(result.riskScore)}>
            {result.riskScore}/10
          </Badge>
        </div>
        <ProgressBar 
          progress={(result.riskScore / 10) * 100}
          className="mb-2"
          showPercentage={false}
        />
        <p className="text-sm text-gray-600">
          {result.riskScore <= 3 ? "Low risk transaction - Safe to proceed" :
           result.riskScore <= 6 ? "Medium risk - Exercise caution" :
           "High risk - Review carefully before proceeding"}
        </p>
      </div>

      {/* Security Metrics */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700">Security Metrics</h4>
        {securityMetrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              {metric.value >= 80 ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : metric.value >= 50 ? (
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
              <ProgressBar 
                progress={metric.value}
                label={metric.label}
                showPercentage={true}
                className="flex-1"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Flow Visualization - Mobile Friendly */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-4">Transaction Flow</h4>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
            <span className="mt-2 text-center text-xs md:text-sm font-medium">Transaction<br />Submitted</span>
          </div>
          
          <div className="flex justify-center md:mx-2">
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
            <span className="mt-2 text-center text-xs md:text-sm font-medium">BlockDAG<br />Processing</span>
          </div>
          
          <div className="flex justify-center md:mx-2">
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
            <span className="mt-2 text-center text-xs md:text-sm font-medium">AI Security<br />Analysis</span>
          </div>
          
          <div className="flex justify-center md:mx-2">
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
            <span className="mt-2 text-center text-xs md:text-sm font-medium">Results<br />Delivered</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransactionVisualization;
