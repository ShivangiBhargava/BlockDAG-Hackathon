
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RiskBadge from './RiskBadge';
import RevokeButton from './RevokeButton';
import { useBlockDAGProvider } from '@/hooks/useBlockDAGProvider';
import { Activity, Clock, Fuel, Zap, ExternalLink, AlertTriangle } from 'lucide-react';

interface EnhancedTransactionAnalysisProps {
  transactionHash: string;
  analysisResult: any;
}

const EnhancedTransactionAnalysis = ({ transactionHash, analysisResult }: EnhancedTransactionAnalysisProps) => {
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getTransaction, getContractInfo, estimateOptimalGas, isConnected } = useBlockDAGProvider();

  useEffect(() => {
    fetchRealTimeData();
  }, [transactionHash, getTransaction]);

  const fetchRealTimeData = async () => {
    if (!transactionHash || !isConnected) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const txData = await getTransaction(transactionHash);
      
      if (txData) {
        let contractInfo = null;
        if (txData.to && txData.input !== '0x') {
          contractInfo = await getContractInfo(txData.to);
        }

        setRealTimeData({
          ...txData,
          contractInfo
        });
      }
    } catch (error) {
      console.error('Error fetching real-time data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatGasPrice = (gasPrice: string) => {
    try {
      const gwei = parseInt(gasPrice) / 1e9;
      return `${gwei.toFixed(2)} Gwei`;
    } catch {
      return 'Unknown';
    }
  };

  const isApprovalTransaction = () => {
    return realTimeData?.input?.includes('095ea7b3') || // approve function signature
           analysisResult?.transactionType?.toLowerCase().includes('approval') ||
           analysisResult?.summary?.toLowerCase().includes('approve');
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span>Fetching real-time transaction data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-lg sm:text-xl">Risk Assessment</span>
            <RiskBadge score={analysisResult?.riskScore || 1} size="lg" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {analysisResult?.summary}
          </p>
          
          {analysisResult?.riskScore >= 7 && isApprovalTransaction() && realTimeData?.to && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">High Risk Approval Detected</h4>
                  <p className="text-sm text-red-700">
                    This transaction grants token spending permissions to a potentially risky contract.
                  </p>
                </div>
                <RevokeButton
                  tokenAddress="0x..." // Would be extracted from transaction data
                  spenderAddress={realTimeData.to}
                  contractName={realTimeData.contractInfo?.name}
                  riskScore={analysisResult.riskScore}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real-time Transaction Data */}
      {realTimeData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Live Transaction Data
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
                BlockDAG Testnet
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Transaction Hash</h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <code className="text-xs bg-muted p-2 rounded flex-1 font-mono break-all">
                    {realTimeData.hash}
                  </code>
                  <Button variant="outline" size="sm" asChild className="w-fit">
                    <a 
                      href={`https://explorer-testnet.blockdag.network/tx/${realTimeData.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Block Number</h4>
                <p className="text-sm font-mono">#{realTimeData.blockNumber.toLocaleString()}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Gas Used</h4>
                <p className="text-sm break-words">{parseInt(realTimeData.gasUsed).toLocaleString()}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Gas Price</h4>
                <p className="text-sm break-words">{formatGasPrice(realTimeData.gasPrice)}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Value</h4>
                <p className="text-sm break-words">{realTimeData.value} BDAG</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Status</h4>
                <Badge variant={realTimeData.status === 1 ? "default" : "destructive"} className="w-fit">
                  {realTimeData.status === 1 ? "Success" : "Failed"}
                </Badge>
              </div>
            </div>

            {realTimeData.contractInfo && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Contract Information</h4>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{realTimeData.contractInfo.name}</span>
                      <Badge variant={realTimeData.contractInfo.isVerified ? "default" : "destructive"} className="w-fit">
                        {realTimeData.contractInfo.isVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm text-muted-foreground">Address:</span>
                    <code className="text-xs bg-muted p-1 rounded font-mono break-all">
                      {realTimeData.contractInfo.address}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {analysisResult?.recommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Security Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysisResult.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedTransactionAnalysis;
