
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactionHash } = await req.json();
    
    console.log('Analyzing transaction with enhanced AI:', transactionHash);

    // Check cache first
    const { data: existingAnalysis } = await supabase
      .from('transaction_analyses')
      .select('*')
      .eq('transaction_hash', transactionHash)
      .single();

    if (existingAnalysis) {
      console.log('Found cached analysis');
      return new Response(JSON.stringify({
        summary: existingAnalysis.summary,
        riskScore: existingAnalysis.risk_score,
        transactionType: existingAnalysis.transaction_type,
        valueTransferred: existingAnalysis.value_transferred,
        gasUsed: existingAnalysis.gas_used,
        contractInfo: existingAnalysis.contract_info,
        recommendations: existingAnalysis.recommendations
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enhanced BlockDAG simulation with more realistic data
    const mockTransactionData = await simulateEnhancedBlockDAGCall(transactionHash);
    
    // Generate comprehensive AI analysis
    const aiAnalysis = await generateEnhancedAIAnalysis(mockTransactionData, openaiApiKey);
    
    // Store analysis
    const { error: insertError } = await supabase
      .from('transaction_analyses')
      .insert({
        transaction_hash: transactionHash,
        summary: aiAnalysis.summary,
        risk_score: aiAnalysis.riskScore,
        transaction_type: aiAnalysis.transactionType,
        value_transferred: aiAnalysis.valueTransferred,
        gas_used: aiAnalysis.gasUsed,
        contract_info: aiAnalysis.contractInfo,
        recommendations: aiAnalysis.recommendations
      });

    if (insertError) {
      console.error('Error storing analysis:', insertError);
    }

    return new Response(JSON.stringify(aiAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhanced analyze-transaction function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze transaction',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function simulateEnhancedBlockDAGCall(txHash: string) {
  console.log('Simulating enhanced BlockDAG API call for:', txHash);
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // More sophisticated transaction patterns based on hash
  const hashSum = txHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const riskPattern = hashSum % 100;
  
  if (txHash.includes('4e3ac5d5') || riskPattern > 85) {
    // High-risk unverified contract interaction
    return {
      type: 'contract_interaction',
      value: '0',
      gasUsed: '87456',
      gasPrice: '25000000000',
      contractAddress: '0x8a2ef1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
      contractVerified: false,
      contractCreationDate: Date.now() - (24 * 60 * 60 * 1000), // 1 day ago
      functionCalled: 'approve',
      parameters: { spender: '0x...', amount: 'unlimited' },
      blockHeight: 2456789,
      confirmations: 12,
      networkFees: '0.002187',
      deployerHistory: 'suspicious',
      similarContracts: 23,
      honeypotRisk: 'high'
    };
  } else if (txHash.includes('7f8e9d6c') || riskPattern < 20) {
    // Low-risk standard transfer
    return {
      type: 'transfer',
      value: '0.1',
      gasUsed: '21000',
      gasPrice: '20000000000',
      to: '0x742d35Cc6Eb4326D7B67f11B0d3B63FB5cF4e57B',
      from: '0x1234567890123456789012345678901234567890',
      blockHeight: 2456788,
      confirmations: 25,
      networkFees: '0.00042',
      addressAge: { from: 365, to: 180 }, // days
      transactionHistory: 'clean',
      addressLabels: { to: 'verified_exchange' }
    };
  } else {
    // Medium-risk DEX interaction
    return {
      type: 'dex_swap',
      value: '1.0',
      gasUsed: '156789',
      gasPrice: '22000000000',
      contractAddress: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
      contractVerified: true,
      contractName: 'Uniswap V3 Router',
      contractAudits: ['CertiK', 'ConsenSys Diligence'],
      swapDetails: { 
        tokenIn: 'ETH', 
        tokenOut: 'USDC', 
        amountIn: '1', 
        amountOut: '1520.45',
        slippage: '0.5%',
        priceImpact: '0.02%'
      },
      liquidityPoolTVL: '45600000',
      blockHeight: 2456790,
      confirmations: 8,
      networkFees: '0.00345',
      mevProtection: true
    };
  }
}

async function generateEnhancedAIAnalysis(txData: any, apiKey: string) {
  console.log('Generating enhanced AI analysis:', txData);
  
  const enhancedPrompt = `As a blockchain security expert and AI analyst, provide a comprehensive analysis of this BlockDAG transaction:

TRANSACTION DATA:
- Type: ${txData.type}
- Value: ${txData.value} ETH
- Gas Used: ${txData.gasUsed}
- Gas Price: ${txData.gasPrice || 'N/A'} wei
- Contract: ${txData.contractAddress || 'N/A'}
- Verified: ${txData.contractVerified || 'N/A'}
- Block Height: ${txData.blockHeight || 'N/A'}
- Confirmations: ${txData.confirmations || 'N/A'}
- Additional Context: ${JSON.stringify(txData, null, 2)}

ANALYSIS REQUIREMENTS:
1. COMPREHENSIVE SECURITY ASSESSMENT (1-10 risk score):
   - Consider contract verification status
   - Analyze gas usage patterns
   - Evaluate transaction timing and confirmations  
   - Assess counterparty reputation
   - Check for common attack vectors

2. DETAILED EXPLANATION:
   - What exactly this transaction does in plain English
   - Why the risk score was assigned
   - Specific red flags or positive indicators
   - Comparison to similar transaction patterns

3. ACTIONABLE RECOMMENDATIONS:
   - Specific steps the user should take
   - Warning signs to watch for
   - Best practices for this transaction type

4. TECHNICAL INSIGHTS:
   - Gas efficiency analysis
   - Network congestion impact
   - BlockDAG-specific considerations

Provide a detailed, technical yet accessible analysis that demonstrates deep understanding of blockchain security, smart contract risks, and transaction patterns. Focus on actionable insights and specific security considerations.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a world-class blockchain security expert with deep knowledge of smart contracts, DeFi protocols, and transaction analysis. You specialize in BlockDAG technology and have analyzed over 1 million transactions. Provide detailed, technical, yet accessible security analysis.' 
          },
          { role: 'user', content: enhancedPrompt }
        ],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    const aiResponse = await response.json();
    const analysis = aiResponse.choices[0].message.content;
    
    // Enhanced risk score extraction
    const riskMatch = analysis.match(/(?:risk score|score|rating)[:\s]*(\d+(?:\.\d+)?)/i);
    let riskScore = riskMatch ? parseFloat(riskMatch[1]) : calculateFallbackRiskScore(txData);
    riskScore = Math.min(Math.max(riskScore, 1), 10);
    
    // Generate comprehensive recommendations
    const recommendations = generateEnhancedRecommendations(txData, riskScore, analysis);
    
    return {
      summary: analysis,
      riskScore: Math.round(riskScore),
      transactionType: formatTransactionType(txData.type),
      valueTransferred: `${txData.value} ETH`,
      gasUsed: `${parseInt(txData.gasUsed).toLocaleString()} gas`,
      contractInfo: txData.contractAddress ? {
        isVerified: txData.contractVerified || false,
        name: txData.contractName || 'Unknown Contract',
        audits: txData.contractAudits || [],
        creationDate: txData.contractCreationDate || null
      } : null,
      recommendations
    };
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return generateEnhancedFallbackAnalysis(txData);
  }
}

function calculateFallbackRiskScore(txData: any): number {
  let score = 3; // Base score
  
  // Risk factors
  if (!txData.contractVerified && txData.contractAddress) score += 4;
  if (txData.honeypotRisk === 'high') score += 3;
  if (txData.deployerHistory === 'suspicious') score += 2;
  if (txData.gasUsed > 100000) score += 1;
  if (txData.confirmations < 10) score += 1;
  
  // Positive factors
  if (txData.contractAudits && txData.contractAudits.length > 0) score -= 2;
  if (txData.mevProtection) score -= 1;
  if (txData.addressLabels && txData.addressLabels.to) score -= 1;
  
  return Math.min(Math.max(score, 1), 10);
}

function generateEnhancedRecommendations(txData: any, riskScore: number, aiAnalysis: string): string[] {
  const recommendations = [];
  
  // Risk-based recommendations
  if (riskScore >= 8) {
    recommendations.push('🚨 HIGH RISK: Do not proceed with this transaction without expert review');
    recommendations.push('Consider using a test transaction with minimal value first');
    recommendations.push('Verify all contract addresses through multiple sources');
  } else if (riskScore >= 6) {
    recommendations.push('⚠️ MEDIUM-HIGH RISK: Proceed with extreme caution');
    recommendations.push('Double-check all transaction parameters before signing');
  } else if (riskScore >= 4) {
    recommendations.push('⚡ MEDIUM RISK: Review transaction details carefully');
  } else {
    recommendations.push('✅ LOW RISK: Transaction appears safe to proceed');
  }
  
  // Contract-specific recommendations
  if (txData.contractAddress && !txData.contractVerified) {
    recommendations.push('Verify contract source code on BlockDAG explorer');
    recommendations.push('Check contract deployment date and transaction history');
    recommendations.push('Use a separate wallet for unverified contract interactions');
  }
  
  // Function-specific recommendations
  if (txData.functionCalled === 'approve') {
    recommendations.push('Review token approval amounts and consider setting limits');
    recommendations.push('Use tools like Revoke.cash to manage token approvals');
    if (txData.parameters?.amount === 'unlimited') {
      recommendations.push('⚠️ Unlimited approval detected - revoke after use');
    }
  }
  
  // Gas and network recommendations
  if (parseInt(txData.gasUsed) > 100000) {
    recommendations.push('High gas usage detected - verify transaction complexity');
  }
  
  if (txData.confirmations < 10) {
    recommendations.push('Wait for more confirmations before considering transaction final');
  }
  
  // General security recommendations
  recommendations.push('Always verify recipient addresses before sending transactions');
  recommendations.push('Monitor your wallet for unexpected activities after transaction');
  recommendations.push('Keep transaction records for security auditing');
  
  return recommendations.slice(0, 8); // Limit to most important recommendations
}

function formatTransactionType(type: string): string {
  const typeMap: { [key: string]: string } = {
    'contract_interaction': 'Smart Contract Interaction',
    'transfer': 'ETH Transfer',
    'dex_swap': 'DEX Token Swap',
    'token_transfer': 'Token Transfer',
    'nft_transfer': 'NFT Transfer',
    'defi_interaction': 'DeFi Protocol Interaction'
  };
  return typeMap[type] || 'Unknown Transaction Type';
}

function generateEnhancedFallbackAnalysis(txData: any) {
  const riskScore = calculateFallbackRiskScore(txData);
  
  let summary = `Enhanced analysis of ${formatTransactionType(txData.type).toLowerCase()} on BlockDAG network. `;
  
  if (riskScore >= 8) {
    summary += `HIGH RISK DETECTED: This transaction shows multiple red flags including ${
      !txData.contractVerified ? 'unverified contract, ' : ''
    }${
      txData.honeypotRisk === 'high' ? 'potential honeypot pattern, ' : ''
    }and requires immediate attention. Our AI models indicate significant security concerns.`;
  } else if (riskScore >= 6) {
    summary += `MEDIUM-HIGH RISK: Several concerning patterns detected. While not immediately dangerous, this transaction requires careful review and additional security measures.`;
  } else if (riskScore >= 4) {
    summary += `MEDIUM RISK: Some areas of concern identified. The transaction appears generally acceptable but exercise normal caution and verify all details.`;
  } else {
    summary += `LOW RISK: Transaction follows standard patterns with good security indicators. Minimal concerns detected by our analysis algorithms.`;
  }
  
  return {
    summary,
    riskScore: Math.round(riskScore),
    transactionType: formatTransactionType(txData.type),
    valueTransferred: `${txData.value} ETH`,
    gasUsed: `${parseInt(txData.gasUsed).toLocaleString()} gas`,
    contractInfo: txData.contractAddress ? {
      isVerified: txData.contractVerified || false,
      name: txData.contractName || 'Unknown Contract'
    } : null,
    recommendations: generateEnhancedRecommendations(txData, riskScore, summary)
  };
}
