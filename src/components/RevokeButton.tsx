import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useBlockDAGProvider } from '@/hooks/useBlockDAGProvider';
import { Loader2, Shield, X } from 'lucide-react';

interface RevokeButtonProps {
  tokenAddress: string;
  spenderAddress: string;
  contractName?: string;
  riskScore: number;
  disabled?: boolean;
}

const RevokeButton = ({ 
  tokenAddress, 
  spenderAddress, 
  contractName = 'Unknown Contract',
  riskScore,
  disabled = false 
}: RevokeButtonProps) => {
  const [isRevoking, setIsRevoking] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const { revokeTokenApproval } = useBlockDAGProvider();
  const { toast } = useToast();

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
        toast({
          title: "Wallet Connected",
          description: "MetaMask connected successfully",
        });
      } else {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask to revoke approvals",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleRevoke = async () => {
    if (!walletConnected) {
      await connectWallet();
      return;
    }

    setIsRevoking(true);
    try {
      const tx = await revokeTokenApproval(tokenAddress, spenderAddress, window.ethereum);
      
      toast({
        title: "Revoke Transaction Sent",
        description: `Transaction hash: ${tx.hash}`,
      });

      // Wait for confirmation
      await tx.wait();
      
      toast({
        title: "Approval Revoked Successfully",
        description: `Token approval for ${contractName} has been revoked`,
      });
    } catch (error: any) {
      console.error('Error revoking approval:', error);
      toast({
        title: "Revoke Failed",
        description: error.message || "Failed to revoke token approval",
        variant: "destructive",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  const isHighRisk = riskScore >= 7;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={isHighRisk ? "destructive" : "outline"}
          size="sm"
          disabled={disabled || isRevoking}
          className={`${isHighRisk ? 'animate-pulse' : ''} transition-all duration-300`}
        >
          {isRevoking ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <X className="w-4 h-4 mr-2" />
          )}
          {isRevoking ? 'Revoking...' : 'Revoke Approval'}
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-500" />
            Revoke Token Approval
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              You're about to revoke the token approval for <strong>{contractName}</strong>.
              This will prevent the contract from accessing your tokens.
            </p>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">
                <strong>Contract:</strong> {spenderAddress}
              </p>
              <p className="text-sm text-orange-800">
                <strong>Token:</strong> {tokenAddress}
              </p>
              {isHighRisk && (
                <p className="text-sm text-red-800 font-semibold mt-2">
                  ⚠️ HIGH RISK: This approval is flagged as potentially dangerous. Revoking is strongly recommended.
                </p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              This action requires a blockchain transaction and will cost gas fees.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRevoke}
            disabled={isRevoking}
            className={isHighRisk ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {isRevoking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Revoking...
              </>
            ) : (
              <>
                <X className="w-4 h-4 mr-2" />
                {walletConnected ? 'Revoke Approval' : 'Connect & Revoke'}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RevokeButton;