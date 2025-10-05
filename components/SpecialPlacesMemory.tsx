// components/SpecialPlacesMemory.tsx
import React, { useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

interface SpecialPlacesMemoryProps {
  onSolve: (nextSectionIndex: number) => void;
}

const SpecialPlacesMemory: React.FC<SpecialPlacesMemoryProps> = ({ onSolve }) => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [solved1, setSolved1] = useState(false);
  const [solved2, setSolved2] = useState(false);
  const [solved3, setSolved3] = useState(false);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showHint3, setShowHint3] = useState(false);

  const handleFirstAnswer = () => {
    if (answer1.trim().toUpperCase() === "PLACE") {
      setSolved1(true);
      toast.success("Exactly! ❤️ Anywhere with you becomes my favorite PLACE!", {
        icon: "📍",
        style: { background: "#22c55e", color: "#fff" },
      });
    } else {
      toast.error("Not that one! Think about the word in quotes 😉", {
        icon: "🧐",
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  const handleSecondAnswer = () => {
    if (answer2.trim().toUpperCase() === "YOUR ARMS") {
      setSolved2(true);
      toast.success("Awww 🥹 Yes! My safest PLACE is YOUR ARMS 💞", {
        icon: "🤗",
        style: { background: "#22c55e", color: "#fff" },
      });
    } else {
      toast.error("Hehe nope! Where do I always want to be when sad? 🫶", {
        icon: "😝",
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  const handleThirdAnswer = () => {
    if (answer3.trim().toUpperCase() === "KITCHEN") {
      setSolved3(true);
      toast.success("Haha yesss 😋 The KITCHEN — where love (and food) happens!", {
        icon: "🍳",
        style: { background: "#22c55e", color: "#fff" },
      });
    } else {
      toast.error("Wrong! It’s where your puppy cooks love… and omelets 😂", {
        icon: "🐶",
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  return (
    <div className="section-container">
      <div className="content-card">
        <div className="icon-wrapper">
          <Heart className="section-icon celebration-icon" size={64} />
        </div>

        <h2 className="section-title">Our Special Places</h2>

        <div className="text-content">
          <p className="description">
            Every place becomes special when we are together. From quiet cafes to bustling streets,
            anywhere with you feels like home.
          </p>
        </div>

        {/* Question 1 */}
        <div className="puzzle-container">
          <p className="puzzle-label">Riddle 1:</p>
          <div className="riddle-box">
            <p className="riddle-text">
              “Everywhere I go with you becomes my favorite _____”
            </p>
          </div>

          <input
            type="text"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            className="puzzle-input"
            placeholder="Enter the missing word"
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
            <p className="hint-text mt-2">
              Hint: You literally said it just now 😜
            </p>
          )}
        </div>

        {/* Question 2 */}
        {solved1 && (
          <div className="puzzle-container mt-8 animate-fadeIn">
            <p className="puzzle-label">Riddle 2:</p>
            <div className="riddle-box">
              <p className="riddle-text">
                “Where do I feel safest and happiest when I’m with you?”
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
                Hint: neeku telusuuuuu
              </p>
            )}
          </div>
        )}

        {/* Question 3 */}
        {solved1 && solved2 && (
          <div className="puzzle-container mt-8 animate-fadeIn">
            <p className="puzzle-label">Riddle 3 (Funny Trick 😋):</p>
            <div className="riddle-box">
              <p className="riddle-text">
                “Where does true love begin? 💕
              </p>
            </div>

            <input
              type="text"
              value={answer3}
              onChange={(e) => setAnswer3(e.target.value)}
              className="puzzle-input"
              placeholder="Enter your answer"
              disabled={solved3}
            />

            <div className="button-group">
              <button
                onClick={handleThirdAnswer}
                className="primary-button"
                disabled={solved3}
              >
                {solved3 ? "✅ Correct!" : "Submit Answer"}
              </button>
              <button
                onClick={() => setShowHint3(!showHint3)}
                className="hint-button"
              >
                {showHint3 ? "Hide Hint" : "Need a Hint?"}
              </button>
            </div>

            {showHint3 && (
              <p className="hint-text mt-2">
                Hint: puppy go over there very often
              </p>
            )}
          </div>
        )}

        {/* Continue Button */}
        {solved1 && solved2 && solved3 && (
          <div className="flex justify-center mt-10 animate-fadeIn">
            <button
              onClick={() => onSolve(9)} // Pass the next section index
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

export default SpecialPlacesMemory;
