
import { useState } from "react";
import Header from "@/components/Header";
import TransactionInput from "@/components/TransactionInput";
import EnhancedAnalysisResult from "@/components/EnhancedAnalysisResult";
import { useTransactionAnalysis } from "@/hooks/useTransactionAnalysis";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Search, Lock } from "lucide-react";

const Index = () => {
  const { analyzeTransaction, isLoading, result, error } = useTransactionAnalysis();
  const [currentTransactionHash, setCurrentTransactionHash] = useState<string>("");

  const handleAnalyze = (txHash: string) => {
    setCurrentTransactionHash(txHash);
    analyzeTransaction(txHash);
  };

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced GPT-4 models analyze transaction patterns and provide human-readable explanations with 96% accuracy."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Risk Assessment",
      description: "Real-time risk scoring from 1-10 based on contract verification, approval patterns, and threat intelligence."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "BlockDAG Integration",
      description: "Native integration with BlockDAG testnet for fast, accurate transaction data retrieval and network monitoring."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy Focused",
      description: "Zero-knowledge analysis with edge computing. Your transaction data never leaves the secure environment."
    }
  ];

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, hsl(260 85% 8%), hsl(220 85% 12%), hsl(310 70% 15%))'}}> 
      <Header />
      
      <main className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <TransactionInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            {error && (
              <div className="max-w-2xl mx-auto px-4">
                <Card className="p-4 border-red-200 bg-red-50">
                  <p className="text-red-800 text-sm">{error}</p>
                </Card>
              </div>
            )}
            
            {result && (
              <EnhancedAnalysisResult 
                result={result} 
                transactionHash={currentTransactionHash}
              />
            )}
            
            {!result && !isLoading && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Why Choose Sherlock AI?</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                    Get instant, AI-powered insights into any BlockDAG transaction with enterprise-grade security analysis
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {features.map((feature, index) => (
                    <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                        <div className="text-purple-600">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Ready to Analyze Your First Transaction?</h3>
                    <p className="text-purple-100 mb-6 text-xs sm:text-sm md:text-base">
                      Paste any BlockDAG transaction hash above and get instant AI-powered security insights
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-purple-100">
                      <span>✓ Instant Analysis</span>
                      <span>✓ Risk Assessment</span>
                      <span className="hidden sm:inline">✓ Plain English</span>
                      <span>✓ Security Recommendations</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 py-4 text-gray-500">
          <p className="text-xs sm:text-sm text-purple-600 font-medium">
            Made with <span className="text-red-500 animate-pulse">❤</span> by Team Real and Ready
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
