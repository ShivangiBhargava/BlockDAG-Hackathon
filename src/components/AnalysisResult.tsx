
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, AlertCircle, TrendingUp, Fuel, Clock } from "lucide-react";

interface AnalysisResultProps {
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
}

const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const getRiskColor = (score: number) => {
    if (score >= 7) return "risk-high";
    if (score >= 4) return "risk-medium";
    return "risk-low";
  };

  const getRiskIcon = (score: number) => {
    if (score >= 7) return <AlertTriangle className="w-4 h-4" />;
    if (score >= 4) return <AlertCircle className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  const getRiskLabel = (score: number) => {
    if (score >= 7) return "High Risk";
    if (score >= 4) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-4">
      {/* Main Analysis Card */}
      <Card className="p-6 detective-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">Analysis Complete</h3>
            <Badge className={`${getRiskColor(result.riskScore)} flex items-center gap-1`}>
              {getRiskIcon(result.riskScore)}
              {getRiskLabel(result.riskScore)} ({result.riskScore}/10)
            </Badge>
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-purple-500">
            <p className="text-sm leading-relaxed whitespace-pre-line">{result.summary}</p>
          </div>
        </div>
      </Card>

      {/* Transaction Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold">Transaction Details</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{result.transactionType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Value:</span>
              <span className="font-medium">{result.valueTransferred}</span>
            </div>
            {result.contractInfo && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract:</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{result.contractInfo.name || 'Unknown'}</span>
                  <Badge variant={result.contractInfo.isVerified ? "default" : "destructive"} className="text-xs">
                    {result.contractInfo.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Fuel className="w-4 h-4 text-orange-600" />
            <h4 className="font-semibold">Gas Information</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gas Used:</span>
              <span className="font-medium">{result.gasUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span className="font-medium">BlockDAG Testnet</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Analysis completed just now</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-green-600" />
            <h4 className="font-semibold">Security Recommendations</h4>
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResult;
