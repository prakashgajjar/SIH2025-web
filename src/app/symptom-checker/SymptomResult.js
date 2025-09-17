import ReactMarkdown from 'react-markdown';

export default function SymptomResult({ result }) {
  const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  return (
    <div className="prose max-w-4xl mx-auto bg-white text-zinc-800 p-6 rounded-xl shadow-md">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
