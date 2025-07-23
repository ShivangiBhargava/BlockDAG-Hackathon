
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, ExternalLink, Github, Video, FileText, Calendar } from "lucide-react";

const SubmissionChecklist = () => {
  const [checkedItems, setCheckedItems] = useState({
    testnet: false,
    video: false,
    description: true, // Already complete
    github: true, // Already complete
    roadmap: true // Already complete
  });

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const requirements = [
    {
      id: 'testnet',
      title: '1. Live on BlockDAG Testnet',
      description: 'Smart contract deployed and verified on BlockDAG testnet',
      status: 'ready',
      action: 'Deploy Contract',
      details: [
        'RiskOracle.sol contract ready for deployment',
        'Hardhat configuration includes BlockDAG testnet',
        'Demo risk scores will be populated',
        'Explorer verification available'
      ],
      icon: <CheckCircle className="w-5 h-5" />,
      links: [
        { text: 'Deploy Script', url: '/scripts/deploy.js', icon: <FileText className="w-4 h-4" /> },
        { text: 'Hardhat Config', url: '/hardhat.config.js', icon: <FileText className="w-4 h-4" /> }
      ]
    },
    {
      id: 'video',
      title: '2. Demo Video (2-5 minutes)',
      description: 'Screen recording showing live functionality',
      status: 'script-ready',
      action: 'Record & Upload',
      details: [
        'Demo script created with 4 scenes',
        'Sample transactions prepared',
        'BlockDAG integration highlights',
        'Upload to YouTube required'
      ],
      icon: <Video className="w-5 h-5" />,
      links: [
        { text: 'Video Script', url: '/demo-script', icon: <FileText className="w-4 h-4" /> }
      ]
    },
    {
      id: 'description',
      title: '3. Concise Product Description',
      description: '2-3 sentences highlighting BlockDAG advantages',
      status: 'complete',
      action: 'View Description',
      details: [
        'Clear explanation of AI-powered transaction analysis',
        'BlockDAG-specific benefits highlighted',
        'Consensus, speed, and data availability emphasized',
        'Available in ProjectSummary component'
      ],
      icon: <CheckCircle className="w-5 h-5" />,
      links: [
        { text: 'Project Summary', url: '/project-summary', icon: <FileText className="w-4 h-4" /> }
      ]
    },
    {
      id: 'github',
      title: '4. Open GitHub Repository',
      description: 'Public repository with complete source code',
      status: 'complete',
      action: 'Repository Active',
      details: [
        'GitHub integration configured',
        'Real-time sync enabled',
        'All source code publicly accessible',
        'README and documentation included'
      ],
      icon: <Github className="w-5 h-5" />,
      links: [
        { text: 'GitHub Repository', url: '#', icon: <ExternalLink className="w-4 h-4" /> }
      ]
    },
    {
      id: 'roadmap',
      title: '5. Future Roadmap Slide',
      description: '3-4 bullet points outlining next steps',
      status: 'complete',
      action: 'View Roadmap',
      details: [
        'Phase 1: Production Launch (Q2 2025)',
        'Phase 2: Multi-Chain Expansion (Q3 2025)',
        'Phase 3: AI Security Ecosystem (Q4 2025)',
        'Phase 4: Decentralized Security Layer (2026)'
      ],
      icon: <Calendar className="w-5 h-5" />,
      links: [
        { text: 'Roadmap Slide', url: '/presentation', icon: <FileText className="w-4 h-4" /> }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case 'ready':
        return <Badge className="bg-blue-100 text-blue-800">Ready to Deploy</Badge>;
      case 'script-ready':
        return <Badge className="bg-orange-100 text-orange-800">Script Ready</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const completedCount = requirements.filter(req => req.status === 'complete').length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl">BlockDAG Hackathon Submission Checklist</span>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {completedCount}/5 Complete
            </Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Ensure all submission requirements are met for the BlockDAG Hackathon 2025
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {requirements.map((req) => (
              <div key={req.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleCheck(req.id)}
                      className="mt-1"
                    >
                      {checkedItems[req.id] ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{req.title}</h3>
                      <p className="text-muted-foreground mb-2">{req.description}</p>
                      {getStatusBadge(req.status)}
                    </div>
                  </div>
                  <req.icon.type {...req.icon.props} className={`w-6 h-6 ${
                    req.status === 'complete' ? 'text-green-600' : 
                    req.status === 'ready' ? 'text-blue-600' :
                    req.status === 'script-ready' ? 'text-orange-600' : 'text-gray-400'
                  }`} />
                </div>

                <div className="ml-9">
                  <h4 className="font-medium mb-2">Details:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    {req.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {req.links.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <a href={link.url} className="flex items-center gap-2">
                          {link.icon}
                          {link.text}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Submission Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">✅ Ready to Submit:</h4>
                <ul className="space-y-1">
                  <li>• Product description (complete)</li>
                  <li>• GitHub repository (live & synced)</li>
                  <li>• Future roadmap (4 phases outlined)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚀 Final Steps:</h4>
                <ul className="space-y-1">
                  <li>• Deploy contract to BlockDAG testnet</li>
                  <li>• Record demo video (script ready)</li>
                  <li>• Upload video to YouTube</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionChecklist;
