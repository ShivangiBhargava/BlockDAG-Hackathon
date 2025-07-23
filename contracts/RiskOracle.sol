// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title RiskOracle
 * @dev A smart contract that provides on-chain risk scores for addresses and contracts
 * Built for BlockDAG Hackathon 2025 - Sherlock AI Integration
 */
contract RiskOracle is Ownable, Pausable, ReentrancyGuard {
    
    // Events
    event RiskScoreUpdated(address indexed target, uint8 riskScore, string reason);
    event OracleUpdated(address indexed oracle, bool active);
    event EmergencyUpdate(address indexed target, uint8 riskScore);
    
    // Structs
    struct RiskData {
        uint8 score;           // Risk score (1-10)
        uint256 lastUpdated;   // Timestamp of last update
        string reason;         // Reason for risk score
        bool exists;           // Whether risk data exists
    }
    
    struct OracleInfo {
        bool isActive;         // Whether oracle is active
        uint256 reputationScore; // Oracle reputation (0-100)
        uint256 totalUpdates;  // Total updates submitted
    }
    
    // State variables
    mapping(address => RiskData) public riskScores;
    mapping(address => OracleInfo) public oracles;
    mapping(address => mapping(address => uint8)) public oracleVotes; // oracle => target => vote
    
    address[] public authorizedOracles;
    uint256 public constant MAX_RISK_SCORE = 10;
    uint256 public constant MIN_RISK_SCORE = 1;
    uint256 public constant VOTE_THRESHOLD = 3; // Minimum oracles needed for consensus
    uint256 public immutable deploymentTime;
    
    // Risk categories
    enum RiskCategory {
        SAFE,           // 1-3
        MEDIUM,         // 4-6  
        HIGH,           // 7-8
        CRITICAL        // 9-10
    }
    
    constructor() {
        deploymentTime = block.timestamp;
        // Initialize with owner as first oracle
        oracles[msg.sender] = OracleInfo({
            isActive: true,
            reputationScore: 100,
            totalUpdates: 0
        });
        authorizedOracles.push(msg.sender);
    }
    
    /**
     * @dev Get risk score for a given address
     * @param target The address to check
     * @return score The risk score (1-10)
     */
    function getRisk(address target) external view returns (uint8 score) {
        require(target != address(0), "Invalid address");
        
        RiskData memory data = riskScores[target];
        if (!data.exists) {
            return 1; // Default safe score for unknown addresses
        }
        
        // Check if data is stale (older than 24 hours)
        if (block.timestamp - data.lastUpdated > 86400) {
            return 1; // Return safe score for stale data
        }
        
        return data.score;
    }
    
    /**
     * @dev Get detailed risk information
     * @param target The address to check
     * @return score Risk score
     * @return lastUpdated Last update timestamp
     * @return reason Reason for risk score
     * @return category Risk category
     */
    function getRiskDetails(address target) 
        external 
        view 
        returns (
            uint8 score, 
            uint256 lastUpdated, 
            string memory reason, 
            RiskCategory category
        ) 
    {
        RiskData memory data = riskScores[target];
        if (!data.exists) {
            return (1, 0, "No data available", RiskCategory.SAFE);
        }
        
        return (
            data.score,
            data.lastUpdated,
            data.reason,
            _getRiskCategory(data.score)
        );
    }
    
    /**
     * @dev Update risk score for an address (Oracle only)
     * @param target The address to update
     * @param newScore New risk score (1-10)
     * @param reason Reason for the risk score
     */
    function updateRiskScore(
        address target, 
        uint8 newScore, 
        string calldata reason
    ) external onlyActiveOracle whenNotPaused nonReentrant {
        require(target != address(0), "Invalid address");
        require(newScore >= MIN_RISK_SCORE && newScore <= MAX_RISK_SCORE, "Invalid risk score");
        require(bytes(reason).length > 0, "Reason required");
        
        // Record oracle vote
        oracleVotes[msg.sender][target] = newScore;
        
        // Calculate consensus
        uint8 consensusScore = _calculateConsensus(target);
        
        // Update risk score if consensus reached
        if (consensusScore > 0) {
            riskScores[target] = RiskData({
                score: consensusScore,
                lastUpdated: block.timestamp,
                reason: reason,
                exists: true
            });
            
            oracles[msg.sender].totalUpdates++;
            
            emit RiskScoreUpdated(target, consensusScore, reason);
        }
    }
    
    /**
     * @dev Emergency update function for critical risks
     * @param target The address to update
     * @param newScore New risk score
     * @param reason Reason for emergency update
     */
    function emergencyUpdate(
        address target, 
        uint8 newScore, 
        string calldata reason
    ) external onlyOwner {
        require(target != address(0), "Invalid address");
        require(newScore >= MIN_RISK_SCORE && newScore <= MAX_RISK_SCORE, "Invalid risk score");
        require(newScore >= 8, "Emergency updates only for high risk");
        
        riskScores[target] = RiskData({
            score: newScore,
            lastUpdated: block.timestamp,
            reason: string(abi.encodePacked("EMERGENCY: ", reason)),
            exists: true
        });
        
        emit EmergencyUpdate(target, newScore);
    }
    
    /**
     * @dev Add new oracle
     * @param oracle Address of new oracle
     */
    function addOracle(address oracle) external onlyOwner {
        require(oracle != address(0), "Invalid oracle address");
        require(!oracles[oracle].isActive, "Oracle already active");
        
        oracles[oracle] = OracleInfo({
            isActive: true,
            reputationScore: 80, // Start with good reputation
            totalUpdates: 0
        });
        
        authorizedOracles.push(oracle);
        emit OracleUpdated(oracle, true);
    }
    
    /**
     * @dev Remove oracle
     * @param oracle Address of oracle to remove
     */
    function removeOracle(address oracle) external onlyOwner {
        require(oracles[oracle].isActive, "Oracle not active");
        
        oracles[oracle].isActive = false;
        
        // Remove from authorized oracles array
        for (uint i = 0; i < authorizedOracles.length; i++) {
            if (authorizedOracles[i] == oracle) {
                authorizedOracles[i] = authorizedOracles[authorizedOracles.length - 1];
                authorizedOracles.pop();
                break;
            }
        }
        
        emit OracleUpdated(oracle, false);
    }
    
    /**
     * @dev Batch risk score retrieval for multiple addresses
     * @param targets Array of addresses to check
     * @return scores Array of risk scores
     */
    function getBatchRiskScores(address[] calldata targets) 
        external 
        view 
        returns (uint8[] memory scores) 
    {
        scores = new uint8[](targets.length);
        for (uint i = 0; i < targets.length; i++) {
            scores[i] = this.getRisk(targets[i]);
        }
    }
    
    /**
     * @dev Check if address is in a specific risk category
     * @param target Address to check
     * @param category Risk category to check against
     * @return inCategory Whether address is in the category
     */
    function isInRiskCategory(address target, RiskCategory category) 
        external 
        view 
        returns (bool inCategory) 
    {
        uint8 score = this.getRisk(target);
        return _getRiskCategory(score) == category;
    }
    
    /**
     * @dev Get total number of active oracles
     */
    function getActiveOracleCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint i = 0; i < authorizedOracles.length; i++) {
            if (oracles[authorizedOracles[i]].isActive) {
                count++;
            }
        }
        return count;
    }
    
    // Internal functions
    
    function _calculateConsensus(address target) internal view returns (uint8) {
        uint256 activeOracleCount = 0;
        uint256 totalScore = 0;
        uint256 voteCount = 0;
        
        for (uint i = 0; i < authorizedOracles.length; i++) {
            address oracle = authorizedOracles[i];
            if (oracles[oracle].isActive) {
                activeOracleCount++;
                uint8 vote = oracleVotes[oracle][target];
                if (vote > 0) {
                    totalScore += vote;
                    voteCount++;
                }
            }
        }
        
        // Require minimum number of votes
        if (voteCount < VOTE_THRESHOLD && voteCount < activeOracleCount / 2) {
            return 0; // No consensus
        }
        
        // Return average score
        return uint8(totalScore / voteCount);
    }
    
    function _getRiskCategory(uint8 score) internal pure returns (RiskCategory) {
        if (score <= 3) return RiskCategory.SAFE;
        if (score <= 6) return RiskCategory.MEDIUM;
        if (score <= 8) return RiskCategory.HIGH;
        return RiskCategory.CRITICAL;
    }
    
    // Modifiers
    
    modifier onlyActiveOracle() {
        require(oracles[msg.sender].isActive, "Not an active oracle");
        _;
    }
    
    // Admin functions
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // View functions for contract stats
    
    function getContractStats() external view returns (
        uint256 totalRiskEntries,
        uint256 totalOracles,
        uint256 contractAge
    ) {
        // Count total risk entries (approximation)
        totalRiskEntries = 0; // Would need to track this in practice
        totalOracles = authorizedOracles.length;
        contractAge = block.timestamp - deploymentTime;
    }
}