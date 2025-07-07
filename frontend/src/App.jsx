// frontend/src/App.jsx
import { useState } from 'react';

export default function App() {
  const [txHash, setTxHash] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const response = await fetch(`http://localhost:3000/analyze/${txHash}`);
    setResult(await response.json());
  };

  return (
    <div className="app">
      <h1>🔍 Sherlock AI</h1>
      <input 
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
        placeholder="Enter BlockDAG tx hash"
      />
      <button onClick={analyze}>Analyze</button>
      
      {result && (
        <div className={`result ${result.risk > 5 ? 'warning' : ''}`}>
          <p>{result.summary}</p>
          <p>Risk score: {result.risk}/10</p>
        </div>
      )}
    </div>
  );
}
