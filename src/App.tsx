import { useState } from "react";
import { getGenerativeModel, InferenceMode } from "firebase/ai";
import { ai } from "./firebase";

export default function App() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setError("");
    setText("");
    setSource("");
    try {
      const model = getGenerativeModel(ai, {
        mode: InferenceMode.PREFER_ON_DEVICE,
      });
      const result = await model.generateContent(
        "In one sentence, explain what SQL injection is to a beginner."
      );
      setText(result.response.text());
      setSource(String(result.response.inferenceSource));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Gatewarden</h1>
      <button onClick={run} disabled={loading}>
        {loading ? "Thinking..." : "Test hybrid AI"}
      </button>
      {source && <p><b>Ran:</b> {source}</p>}
      {text && <p>{text}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}