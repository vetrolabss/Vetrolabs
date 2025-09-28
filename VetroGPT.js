import { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function TryVetroGPT() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setStatus('Generating...');

    // Simulasi AI response
    setTimeout(() => {
      const generatedCode = `function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Counter App</h1>
      <p>Count: {count}</p>
      <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setCount(c => c + 1)}>+</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`;

      setCode(generatedCode);
      setStatus('✅ Syntax valid • ✅ Tests passed • ✅ Ready to deploy');
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied!');
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VetroGPT_Component.js';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Try VetroGPT</h1>
        <p className="mb-6 text-gray-600">Describe your idea and let VetroGPT build it for you.</p>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg"
          rows={4}
          placeholder="e.g. Create a React counter app with increment, decrement, and reset buttons"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate with VetroGPT'}
        </button>

        {status && (
          <div className="mt-4 text-sm text-green-700">
            {status}
          </div>
        )}

        {code && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Generated Code</h3>
                <div className="space-x-2">
                  <button onClick={copyToClipboard} className="text-sm text-blue-600 hover:underline">Copy</button>
                  <button onClick={downloadCode} className="text-sm text-blue-600 hover:underline">Download</button>
                </div>
              </div>
              <SyntaxHighlighter language="javascript" style={tomorrow}>
                {code}
              </SyntaxHighlighter>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Live Preview</h3>
              <LiveProvider code={code} scope={{ React }}>
                <LiveEditor className="hidden" />
                <LiveError className="text-red-500 text-sm" />
                <div className="border rounded p-4 bg-white">
                  <LivePreview />
                </div>
              </LiveProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
