
import { Button } from "@/components/ui/button";
import { Shield, FileText, Presentation } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sherlock AI
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              Analyzer
            </Link>
            <Link to="/summary" className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors">
              <FileText className="w-4 h-4" />
              Project Summary
            </Link>
            <Link to="/presentation" className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors">
              <Presentation className="w-4 h-4" />
              Slide Deck
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 hidden sm:block">
              AI-Powered BlockDAG Security
            </p>
            <div className="flex gap-2 md:hidden">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/summary">
                  <FileText className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/presentation">
                  <Presentation className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
