// components/BeachMemory.tsx
import React, { useState } from "react";
import { Waves, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

interface BeachMemoryProps {
  onSolve: (nextSectionIndex: number) => void;
}

const BeachMemory: React.FC<BeachMemoryProps> = ({ onSolve }) => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [solved1, setSolved1] = useState(false);
  const [solved2, setSolved2] = useState(false);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);

  const handleFirstAnswer = () => {
    if (answer1.trim().toUpperCase() === "LOVE") {
      setSolved1(true);
      toast.success("Exactly! ❤️ Anywhere with you becomes my favorite LOVE!", {
        icon: "📍",
        style: { background: "#22c55e", color: "#fff" },
      });
    } else {
      toast.error("Try again 😅", {
        icon: "🧐",
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  const handleSecondAnswer = () => {
    if (answer2.trim().toUpperCase() === "FUTURE") {
      setSolved2(true);
      toast.success("Awww 🥹 Yes! We spoke about our FUTURE 💞", {
        icon: "🤗",
        style: { background: "#22c55e", color: "#fff" },
      });
    } else {
      toast.error("Close, but think of what we spoke about the most 💭", {
        icon: "😝",
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  return (
    <div className="section-container">
      <div className="content-card">
        <div className="icon-wrapper">
          <Waves className="section-icon" size={64} />
        </div>

        <h2 className="section-title">Night Walk</h2>

        <div className="text-content">
          <p className="description">
            The streets shimmered under soft yellow lights, cafes still humming,
            and the cool Bengaluru breeze wrapped around us.
            Every step felt lighter — laughter echoing through Nagavara Road,
            time slowing just for us.
          </p>
        </div>

        {/* --- Question 1 --- */}
        <div className="puzzle-container">
          <p className="puzzle-label">Riddle 1:</p>
          <div className="riddle-box">
            <p className="riddle-text">
              “It grows when shared, speaks without words,
              and turns ordinary moments into memories. What is it?”
            </p>
          </div>

          <input
            type="text"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            className="puzzle-input"
            placeholder="Enter your answer"
            disabled={solved1}
          />

          <div className="button-group">
            <button
              onClick={handleFirstAnswer}
              className="primary-button"
              disabled={solved1}
            >
              {solved1 ? "✅ Correct!" : "Submit Answer"}
            </button>
            <button
              onClick={() => setShowHint1(!showHint1)}
              className="hint-button"
            >
              {showHint1 ? "Hide Hint" : "Need a Hint?"}
            </button>
          </div>
          {showHint1 && (
            <p className="hint-text mt-2">Hint: The answer has 4 letters ❤️</p>
          )}
        </div>

        {/* --- Question 2 --- */}
        {solved1 && (
          <div className="puzzle-container mt-8 animate-fadeIn">
            <p className="puzzle-label">Riddle 2:</p>
            <div className="riddle-box">
              <p className="riddle-text">
                “During our late-night walk, what did we talk about the most?”
              </p>
            </div>

            <input
              type="text"
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
              className="puzzle-input"
              placeholder="Enter your answer"
              disabled={solved2}
            />

            <div className="button-group">
              <button
                onClick={handleSecondAnswer}
                className="primary-button"
                disabled={solved2}
              >
                {solved2 ? "✅ Correct!" : "Submit Answer"}
              </button>
              <button
                onClick={() => setShowHint2(!showHint2)}
                className="hint-button"
              >
                {showHint2 ? "Hide Hint" : "Need a Hint?"}
              </button>
            </div>
            {showHint2 && (
              <p className="hint-text mt-2">
                Hint: We spoke about our dreams and plans 💭
              </p>
            )}
          </div>
        )}

        {/* --- Continue Button --- */}
        {solved1 && solved2 && (
          <div className="flex justify-center mt-10 animate-fadeIn">
            <button
              onClick={() => onSolve(6)} // Pass the next section index
              className="primary-button flex items-center gap-2"
            >
              <span>Continue Our Story</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeachMemory;
