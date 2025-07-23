import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Shield, Brain, Zap, Users, TrendingUp, Target, Rocket, Calendar, ArrowRight } from "lucide-react";

const SlidePresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      title: "Title",
      content: (
        <div className="text-center">
          <div className="mb-8">
            <Shield className="w-16 md:w-24 h-16 md:h-24 text-purple-600 mx-auto mb-4" />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-purple-800 mb-4">Sherlock AI</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6">DeFi's AI-Powered Transaction Explainer</p>
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full inline-block text-sm md:text-base">
              AI × Smart Contracts - MVP Prototype
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 2: Problem
    {
      title: "The Problem",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold">Blockchain Transactions Are Opaque</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-red-800 mb-2">$3.8 Billion Lost in 2022</h3>
              <p className="text-red-700">DeFi hacks and exploits continue to plague the ecosystem</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Current Challenges:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Technical complexity</li>
                  <li>• Lack of human-readable explanations</li>
                  <li>• No proactive risk assessment</li>
                  <li>• Poor user experience</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">User Pain Points:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Can't understand transaction risks</li>
                  <li>• Fear of interacting with contracts</li>
                  <li>• Limited security tools</li>
                  <li>• Reactive rather than proactive</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: Solution
    {
      title: "Our Solution",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold">AI-Powered Transaction Analysis</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">🧠 Plain English Analysis</h3>
                <p className="text-sm text-purple-700">AI explains what transactions do in simple terms</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Risk Scoring (1-10)</h3>
                <p className="text-sm text-blue-700">Instant security assessment with detailed rationale</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Contract Analysis</h3>
                <p className="text-sm text-green-700">Smart contract verification and analysis</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">💡 Smart Recommendations</h3>
                <p className="text-sm text-orange-700">Actionable security advice for each transaction</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-800 mb-2">⚡ Real-time Processing</h3>
                <p className="text-sm text-indigo-700">Fast analysis with intelligent caching</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-800 mb-2">🔗 BlockDAG Integration</h3>
                <p className="text-sm text-pink-700">Live deployment on BlockDAG testnet</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Technical Architecture
    {
      title: "Technical Architecture",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold">MVP Technical Stack</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">Frontend</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Responsive Design</li>
                <li>• Real-time Updates</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-3">Backend</h3>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Supabase Edge Functions</li>
                <li>• PostgreSQL Database</li>
                <li>• Row-Level Security</li>
                <li>• Analysis Caching</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">AI Integration</h3>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• OpenAI GPT-4</li>
                <li>• Advanced Prompting</li>
                <li>• BlockDAG RPC</li>
                <li>• Security Analysis</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm md:text-base">AI Analysis Pipeline:</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 text-xs md:text-sm">
              <span className="bg-white px-2 md:px-3 py-1 rounded text-center">Transaction Hash</span>
              <span className="text-purple-600 font-bold md:hidden">↓</span>
              <span className="hidden md:inline text-purple-600 font-bold">→</span>
              <span className="bg-white px-2 md:px-3 py-1 rounded text-center">BlockDAG RPC</span>
              <span className="text-purple-600 font-bold md:hidden">↓</span>
              <span className="hidden md:inline text-purple-600 font-bold">→</span>
              <span className="bg-white px-2 md:px-3 py-1 rounded text-center">GPT-4 Analysis</span>
              <span className="text-purple-600 font-bold md:hidden">↓</span>
              <span className="hidden md:inline text-purple-600 font-bold">→</span>
              <span className="bg-white px-2 md:px-3 py-1 rounded text-center">Risk Assessment</span>
              <span className="text-purple-600 font-bold md:hidden">↓</span>
              <span className="hidden md:inline text-purple-600 font-bold">→</span>
              <span className="bg-white px-2 md:px-3 py-1 rounded text-center">User Interface</span>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Market Opportunity
    {
      title: "Market Opportunity",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold">Massive Market Potential</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center bg-purple-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">$3.8B</div>
              <div className="text-sm text-purple-700">Lost to DeFi hacks in 2022</div>
            </div>
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">50M+</div>
              <div className="text-sm text-blue-700">Active DeFi users globally</div>
            </div>
            <div className="text-center bg-green-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-sm text-green-700">Need security tools</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Target Segments</h3>
              <ul className="text-sm space-y-1">
                <li>• DeFi users (50M+ globally)</li>
                <li>• Blockchain developers</li>
                <li>• Security researchers</li>
                <li>• Institutional investors</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Future Revenue Streams</h3>
              <ul className="text-sm space-y-1">
                <li>• Freemium model</li>
                <li>• API licensing</li>
                <li>• White-label solutions</li>
                <li>• Premium features</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Demo
    {
      title: "Live Demo",
      content: (
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold">See Sherlock AI MVP in Action</h2>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-lg mb-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Sample Analysis Output</h3>
              <div className="text-left space-y-3">
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                  <strong className="text-red-800">HIGH RISK (8/10):</strong>
                  <p className="text-red-700 text-sm mt-1">This transaction interacts with an unverified smart contract requesting unlimited token approval. This is a common pattern in token drainer attacks.</p>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                  <strong className="text-yellow-800">Recommendations:</strong>
                  <ul className="text-yellow-700 text-sm mt-1 list-disc list-inside">
                    <li>Verify contract source code before proceeding</li>
                    <li>Use a separate wallet for unverified contracts</li>
                    <li>Consider using Revoke.cash to manage approvals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-medium mb-2">Try sample transactions to see real AI analysis!</p>
            <a href="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm underline">
              Click here to access the live MVP demo
            </a>
          </div>
        </div>
      )
    },

    // Slide 7: Future Roadmap
    {
      title: "Future Roadmap",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">Next Steps Beyond MVP</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-purple-800">Phase 1: Production Launch</h3>
                <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Near Term</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                    Deploy to BlockDAG mainnet with premium features
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                    Advanced ML models for threat detection
                  </li>
                </ul>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                    Real-time transaction monitoring dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                    Browser extension for wallet protection
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-800">Phase 2: Multi-Chain Expansion</h3>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Medium Term</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    Support for Ethereum, BSC, Polygon networks
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    Cross-chain risk correlation analysis
                  </li>
                </ul>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    API marketplace for developers
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    White-label solutions for enterprises
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-orange-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-green-800">Phase 3: AI Security Ecosystem</h3>
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">Long Term</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    Predictive threat intelligence system
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    Community-driven security database
                  </li>
                </ul>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    Automated smart contract auditing
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    Insurance integration for verified transactions
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-orange-800">Phase 4: Decentralized Security Layer</h3>
                <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Future</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                    Launch $SHERLOCK governance token
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                    Decentralized oracle network for security data
                  </li>
                </ul>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                    Staking rewards for security validators
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                    Open-source AI model marketplace
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: Thank You
    {
      title: "Thank You",
      content: (
        <div className="text-center">
          <div className="mb-8">
            <Shield className="w-16 md:w-24 h-16 md:h-24 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-800 mb-4">Thank You!</h1>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 md:p-8 rounded-lg shadow-xl">
            <div className="bg-white p-4 md:p-6 rounded-lg border-2 border-purple-200">
              <div className="text-center">
                <h4 className="text-lg md:text-xl font-bold text-purple-800 mb-4">Team Name: Real and Ready</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-purple-800 font-bold mb-2">Shivangi Bhargava</div>
                    <div className="text-purple-600 text-sm font-medium">M.Tech in AI & DS - VIT Bhopal</div>
                    <div className="text-gray-700 text-xs mt-1">Blockchain Enthusiast, Backend Developer</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-blue-800 font-bold mb-2">Shreem Bhargava</div>
                    <div className="text-blue-600 text-sm font-medium">Integrated M.Tech in AI - VIT Bhopal</div>
                    <div className="text-gray-700 text-xs mt-1">AI&ML Engineer, UI/UX, Frontend Developer</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Built for BlockDAG Hackathon 2025 • AI × Smart Contracts • MVP Prototype
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen p-4" style={{background: 'linear-gradient(135deg, hsl(260 85% 8%), hsl(220 85% 12%), hsl(310 70% 15%))'}}>
      <div className="max-w-6xl mx-auto">
        {/* Slide Counter */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-600">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Main Slide */}
        <Card className="min-h-[600px] p-8 mb-6">
          {slides[currentSlide].content}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlidePresentation;
