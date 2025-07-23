
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Loader2, ExternalLink } from "lucide-react";

interface TransactionInputProps {
  onAnalyze: (txHash: string) => void;
  isLoading: boolean;
}

const TransactionInput = ({ onAnalyze, isLoading }: TransactionInputProps) => {
  const [txHash, setTxHash] = useState("");

  const sampleTxHashes = [
    {
      hash: "0x4e3ac5d5b5f5a5e5d5c5b5a595857565554535251504f4e4d4c4b4a49484746",
      label: "Sample ERC-20 Approval",
      type: "high-risk"
    },
    {
      hash: "0x7f8e9d6c5b4a39281726354849302847165849302847165849302847165849",
      label: "Sample ETH Transfer", 
      type: "safe"
    },
    {
      hash: "0x9a8b7c6d5e4f3928475849302847165849302847165849302847165849302847",
      label: "Sample DEX Swap",
      type: "medium-risk"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (txHash.trim()) {
      onAnalyze(txHash.trim());
    }
  };

  const handleSampleClick = (hash: string) => {
    setTxHash(hash);
    onAnalyze(hash);
  };

  const openBlockDAGExplorer = () => {
    window.open('https://primordial.bdagscan.com/', '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 space-y-4">
      <Card className="p-6 detective-shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <label htmlFor="txHash" className="text-sm font-medium">
                Transaction Hash
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={openBlockDAGExplorer}
                size="sm"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:from-purple-100 hover:to-blue-100 text-purple-700 hover:text-purple-800 text-xs sm:text-sm px-3 py-2 h-8 sm:h-9"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Get from BlockDAG Explorer</span>
                <span className="sm:hidden">BlockDAG Explorer</span>
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                id="txHash"
                type="text"
                placeholder="0x4e3ac5d5b5f5a5e5d5c5b5a595857565..."
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="font-mono text-sm"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={!txHash.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3">Try these sample transactions:</p>
          <div className="space-y-2">
            {sampleTxHashes.map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(sample.hash)}
                disabled={isLoading}
                className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{sample.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sample.type === 'high-risk' ? 'bg-red-100 text-red-700' :
                    sample.type === 'medium-risk' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {sample.type.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono mt-1 truncate">
                  {sample.hash}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionInput;
