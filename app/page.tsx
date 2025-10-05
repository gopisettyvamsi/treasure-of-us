"use client";

import React, { useState, useRef } from "react";
import {
  Heart,
  Mountain,
  Waves,
  ArrowRight,
  ArrowLeft,
  MapPin,
  RotateCcw,
  Sparkles,
  Coffee,
  Music,
  Star,
  Sun,
  Moon,
  Camera,
  HeartHandshake,
  Gift,
  Book,
  Home,
  Plane,
} from "lucide-react";
import PhotoMemorySection from "@/components/PhotoMemorySection";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast

const TreasureHunt = () => {


  const [currentSection, setCurrentSection] = useState(0);
  const [unlockedSections, setUnlockedSections] = useState<boolean[]>(
    [true, ...Array(14).fill(false)]
  );
  const [puzzleSolved, setPuzzleSolved] = useState<Record<string, boolean>>({});
  const [userInput, setUserInput] = useState("");
  // const [showProposal, setShowProposal] = useState(false);
  // Removed inputError and showHint states as toast will handle these

  const [showProposal, setShowProposal] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });  // NEW
  const noButtonRef = useRef(null);  // NEW

  interface Position {
    x: number;
    y: number;
  }



  const handleNoDance = () => {
    if (noButtonRef.current) {
      const maxX = 100;
      const maxY = 500;
      setNoPosition({
        x: Math.random() * maxX - maxX / 2,  // Number
        y: Math.random() * maxY - maxY / 2,  // Number
      });
    }
  };

  const handleSolvePuzzle = (sectionId: string, correctAnswer: string) => {
    const cleanedInput = userInput.trim().toUpperCase();
    const cleanedAnswer = correctAnswer.toUpperCase();

    if (cleanedInput === cleanedAnswer) {
      setPuzzleSolved((prev) => ({ ...prev, [sectionId]: true }));
      const nextSection = currentSection + 1;
      setUnlockedSections((prev) => {
        const newUnlocked = [...prev];
        if (nextSection < sections.length) {
          newUnlocked[nextSection] = true;
        }
        return newUnlocked;
      });
      setUserInput("");
      toast.success("Correct! You're a genius bangaram! 🎉", {
        icon: '🥳',
        style: {
          background: '#22c55e',
          color: '#fff',
        },
      });
      setTimeout(() => setCurrentSection(nextSection), 500);
    } else {
      toast.error("Oops! That's not quite right. Try again, my love! 🤔", {
        icon: '😅',
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    }
  };

  const handleShowHint = (hintText: string) => {
    toast(hintText, {
      icon: '💡',
      style: {
        background: '#fbbf24',
        color: '#000',
      },
    });
  };

  const handleProposalYes = () => {
    setShowProposal(true);
    const nextSection = currentSection + 1;
    setUnlockedSections((prev) => {
      const newUnlocked = [...prev];
      if (nextSection < sections.length) {
        newUnlocked[nextSection] = true;
      }
      return newUnlocked;
    });
    toast.success("YES! My heart just did a happy dance! 💖", {
      icon: '💍',
      duration: 3000,
      style: {
        background: '#ec4899',
        color: '#fff',
      },
    });
    setTimeout(() => setCurrentSection(nextSection), 2000);
  };

  const sections = [
    // 0 - Prologue
    {
      id: "prologue",
      title: "Welcome",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Heart className="section-icon celebration-icon" />
            </div>

            <h1 className="main-title">Hello Nana</h1>

            <div className="text-content">
              <p className="subtitle">It's me, your Pandhi.</p>
              <p className="description">
                Today, I will take you on a special journey through our memories and dreams.
              </p>
              <p className="description">
                Every step brings you closer to my heart.
              </p>
            </div>

            <button
              onClick={() => {
                setUnlockedSections((prev) => {
                  const newUnlocked = [...prev];
                  newUnlocked[1] = true;
                  return newUnlocked;
                });
                setCurrentSection(1);
              }}
              className="primary-button"
            >
              <span>Begin Our Journey</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ),
    },

    // 1 - Memory Map
    {
      id: "memory-map",
      title: "Our Memories",
      content: (
        <div className="section-container">
          <div className="content-card">
            <h2 className="section-title">Our Memory Map</h2>

            <div className="memory-grid">
              {[
                { icon: Mountain, label: "Movie Time", unlocked: true },
                { icon: Waves, label: "Night Walk", unlocked: puzzleSolved["mountains"] || false },
                { icon: Coffee, label: "Coffee Talks", unlocked: puzzleSolved["beach"] || false },
                { icon: Star, label: "Starry Nights", unlocked: puzzleSolved["coffee"] || false },
                { icon: Music, label: "Our Song", unlocked: puzzleSolved["starry"] || false },
                { icon: Camera, label: "Photo Memories", unlocked: puzzleSolved["song"] || false },
                { icon: Heart, label: "Special Places", unlocked: puzzleSolved["photo"] || false },
                { icon: Sparkles, label: "The Question", unlocked: puzzleSolved["places"] || false },
              ].map((region, idx) => (
                <div
                  key={idx}
                  className={`memory-card ${region.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <region.icon className="memory-icon" size={40} />
                  <p className="memory-label">{region.label}</p>
                  {!region.unlocked && (
                    <div className="locked-overlay">
                      <span>🔒</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="hint-text">Solve each puzzle to unlock the next memory</p>

            <button
              onClick={() => setCurrentSection(2)}
              className="primary-button"
              style={{ marginTop: '2rem' }}
            >
              <span>Start Adventure</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ),
    },

    // 2 - Mountains
    {
      id: "mountains",
      title: "Mountain Memory",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Mountain className="section-icon" size={64} />
            </div>

            <h2 className="section-title">Bangalore Meet</h2>

            <div className="quote-box">
              <p className="quote-text">
                "Love climbs higher than any peak."
              </p>
            </div>

            <div className="text-content">
              <p className="description">
                Remember our first movie meet-out?<br /> Being together for the first time.
              </p>
            </div>

            <div className="puzzle-container">
              <p className="puzzle-label">Color of the dress I wore on that day ?</p>
              <div className="puzzle-text"></div>

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                className="puzzle-input"
                placeholder="Enter your answer"
                autoFocus
              />

              <div className="button-group">
                <button
                  onClick={() => handleSolvePuzzle("mountains", "Black")}
                  className="primary-button"
                >
                  Submit Answer
                </button>
                <button
                  onClick={() => handleShowHint("My Life without you")}
                  className="hint-button"
                >
                  Need a Hint?
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // 3 - Beach
    {
      id: "beach",
      title: "Beach Memory",
      content: (() => {
        const [answer1, setAnswer1] = useState("");
        const [answer2, setAnswer2] = useState("");
        const [solved1, setSolved1] = useState(false);
        const [solved2, setSolved2] = useState(false);
        const [showHint1, setShowHint1] = useState(false);
        const [showHint2, setShowHint2] = useState(false);

        const handleFirstAnswer = () => {
          if (answer1.trim().toUpperCase() === "LOVE") {
            setSolved1(true);
          } else {
            alert("Try again 😅");
          }
        };

        const handleSecondAnswer = () => {
          if (answer2.trim().toUpperCase() === "FUTURE") {
            setSolved2(true);
          } else {
            alert("Close, but think of what we spoke about the most 💭");
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
                    onClick={() => {
                      setUnlockedSections((prev) => {
                        const newUnlocked = [...prev];
                        newUnlocked[6] = true; // 👉 unlock next section index
                        return newUnlocked;
                      });
                      setCurrentSection(6);
                    }}
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
      })(),
    },
    // 4 - Coffee Talks
    {
      id: "coffee",
      title: "Coffee Talks",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Coffee className="section-icon" size={64} />
            </div>

            <h2 className="section-title">Coffee Shop Memories</h2>

            <div className="text-content">
              <p className="description">
                It started as a normal evening — laughter, stories, and having some coffee.
                Then came that tiny chaos: accidentally one of our friend spilled accidentally cofee on you
                I rushed to the medical store, found nothing fancy, but came back with a small bottle of honey.
                <br />
                <br />
                I said, trying to calm you,
                That moment — a mix of worry, care and love — but your reaction made me speechless😑
              </p>
            </div>

            <div className="puzzle-container">
              <p className="puzzle-label">Fill in the blank:</p>
              <div className="riddle-box">
                <p className="riddle-text">
                  “In that moment, love wasn’t about words — it was about a spoon of ______”
                </p>
              </div>

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                className="puzzle-input"
                placeholder="Enter your answer"
                autoFocus
              />

              <div className="button-group">
                <button
                  onClick={() => handleSolvePuzzle("coffee", "HONEY")}
                  className="primary-button"
                >
                  Submit Answer
                </button>
                <button
                  onClick={() => handleShowHint("Your Voice")}
                  className="hint-button"
                >
                  Need a Hint?
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // 5 - Starry Nights
    {
      id: "starry",
      title: "Starry Nights",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Star className="section-icon sparkle-icon" size={64} />
            </div>

            <h2 className="section-title">Under the Stars</h2>

            <div className="quote-box">
              <p className="quote-text">
                "Even among millions of stars, you're the brightest one I see."
              </p>
            </div>

            <div className="text-content">
              <p className="description">
                Those nights we spent stargazing, dreaming about our future together.
              </p>
            </div>

            <div className="puzzle-container">
              <p className="puzzle-label">Math puzzle:</p>
              <div className="riddle-box">
                <p className="riddle-text">
                  How many letters are in <br /> "FOREVER TOGETHER"?
                </p>
              </div>

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                className="puzzle-input"
                placeholder="Enter the number"
                autoFocus
              />

              <div className="button-group">
                <button
                  onClick={() => handleSolvePuzzle("starry", "12")}
                  className="primary-button"
                >
                  Submit Answer
                </button>
                <button
                  onClick={() => handleShowHint("Maths Thopuu kada nuvvuu")}
                  className="hint-button"
                >
                  Need a Hint?
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // 6 - Our Song
    {
      id: "song",
      title: "Our Song",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Music className="section-icon" size={64} />
            </div>

            <h2 className="section-title">Our Song</h2>

            <div className="text-content">
              <p className="description">
                Every time I hear it, I think of you. Music speaks what words cannot.
              </p>
            </div>

            <div className="puzzle-container">
              <p className="puzzle-label">Complete the phrase:</p>
              <div className="riddle-box">
                <p className="riddle-text">
                  "Nene neeku _____"
                </p>
              </div>

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                className="puzzle-input"
                placeholder="Enter your answer"
                autoFocus
              />

              <div className="button-group">
                <button
                  onClick={() => {
                    const answer = userInput.trim().toUpperCase();
                    if (answer === "SONTHAM") {
                      const audio = new Audio("/music/nuvve_naa_lokam.mp3"); // ✅ put file in public/songs
                      audio.play();
                      toast.success("That's our song! 🎶", {
                        icon: '❤️',
                        style: {
                          background: '#22c55e',
                          color: '#fff',
                        },
                      });
                      // Wait for song duration (e.g., 12s) before going to next section
                      setTimeout(() => {
                        handleSolvePuzzle("song", "sontham");
                      }, 2000);
                    } else {
                      toast.error("Try again ra puppy ❤️", {
                        icon: '🥺',
                        style: {
                          background: '#ef4444',
                          color: '#fff',
                        },
                      });
                    }
                  }}
                  className="primary-button"
                >
                  Submit Answer
                </button>

                <button
                  onClick={() => handleShowHint("Ayaa neeku telidha puppy ?")}
                  className="hint-button"
                >
                  Need a Hint?
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },


    // 7 - Photo Memories
    {
      id: "photo",
      title: "Photo Memories",
      content: (
        <>
          <PhotoMemorySection handleSolvePuzzle={handleSolvePuzzle} />

          <div className="flex justify-center">
            <button
              onClick={() => {
                setUnlockedSections((prev) => {
                  const newUnlocked = [...prev];
                  newUnlocked[11] = true;
                  return newUnlocked;
                });
                setCurrentSection(8);
              }}
              className="primary-button mt-8"
            >
              <span>Continue Our Story</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </>
      ),
    },

    // 8 - Special Places
    {
      id: "places",
      title: "Special Places",
      content: (() => {
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
                  Every place becomes special when we're together. From quiet cafes to bustling streets,
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
                    onClick={() => {
                      setUnlockedSections((prev) => {
                        const newUnlocked = [...prev];
                        newUnlocked[8] = true; // unlock proposal section
                        return newUnlocked;
                      });
                      toast.success("You’ve unlocked the biggest surprise 💍", {
                        icon: "💖",
                        style: { background: "#ec4899", color: "#fff" },
                      });
                      setTimeout(() => setCurrentSection(9), 1500);
                    }}
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
      })(),
    },


    // 9 - Proposal
    {
      id: "proposal",
      title: "The Question",
      content: (
        <div className="section-container">
          {!showProposal ? (
            <div className="content-card proposal-card">
              <div className="icon-wrapper">
                <Sparkles className="section-icon sparkle-icon" size={80} />
              </div>

              <h2 className="main-title">My Dearest Likitha</h2>

              <div className="text-content">
                <p className="description">
                  You've journeyed through all our memories with me.
                </p>
                <p className="quote-text">
                  You are my calm, my strength, and my greatest joy.
                </p>
                <p className="description">
                  Every moment with you has led to this.
                </p>
              </div>

              <div className="proposal-box">
                <div className="heart-icon-wrapper">
                  <Heart className="heart-icon" size={60} />
                </div>

                <p className="proposal-question">
                  Will you marry me, Likitha?
                </p>

                <div className="proposal-buttons">
                  <button
                    onClick={handleProposalYes}
                    className="yes-button"
                  >
                    Yes! 💍
                  </button>

                  <button
                    ref={noButtonRef}
                    onMouseEnter={handleNoDance}
                    className="no-button dancing-no"
                    style={{
                      position: 'relative',
                      left: noPosition.x,
                      top: noPosition.y,
                    }}
                  >
                    No 😏
                  </button>
                </div>
                <p className="hint-text small">The answer is already in your heart ❤️ (P.S. Try clicking No if you dare—it's got moves!)</p>
              </div>
            </div>
          ) : (
            <div className="content-card celebration-card">
              {/* Bubbles popping up with "yes" inside */}
              <div className="yes-bubbles-container">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="yes-bubble"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 2}s`,
                    }}
                  >
                    yes! ✨
                  </div>
                ))}
              </div>

              <div className="icon-wrapper">
                <Heart className="section-icon celebration-icon" size={80} />
              </div>

              <h2 className="celebration-title">She Said Yes! 🎉</h2>

              <div className="celebration-text">
                Thank you puppy for coming into my Life
              </div>

              <div className="celebration-content">
                <p className="description">
                  I promise to stand by you through every season of life, in sunshine and in storm.
                </p>
                <p className="description">
                  To cherish you more deeply with each passing day, finding new reasons to love you endlessly.
                </p>
                <p className="description">
                  I promise to listen with patience, to speak with kindness
                </p>
                <p className="description">
                  To celebrate your triumphs as my own, and to lift you up when the road feels long.
                </p>
                <p className="description">
                  I promise to keep laughter in our home, joy in our hearts, and peace in our souls.
                </p>
                <p className="description">
                  To share in your dreams and build a life that reflects both our hopes and faith.
                </p>
                <p className="description">
                  And above all, I promise to love you faithfully — today, tomorrow, and forever. nana
                </p>
              </div>

            </div>
          )}
        </div>
      ),
    },


    // 10 - Future Together
    {
      id: "future",
      title: "Our Future",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Sun className="section-icon sparkle-icon" size={64} />
            </div>

            <h2 className="section-title">Our Future Awaits</h2>

            <div className="text-content">
              <p className="description">
                This is just the beginning of our forever.
              </p>
              <p className="description">
                Together, we'll create countless more memories.
              </p>
            </div>

            <div className="future-dreams">
              <div className="dream-item">
                <Moon size={32} className="dream-icon" />
                <p>Late night conversations</p>
              </div>
              <div className="dream-item">
                <Heart size={32} className="dream-icon" />
                <p>Growing old together</p>
              </div>
              <div className="dream-item">
                <Sparkles size={32} className="dream-icon" />
                <p>Making every day magical</p>
              </div>
              <div className="dream-item">
                <Star size={32} className="dream-icon" />
                <p>Reaching for the stars</p>
              </div>
              <div className="dream-item">
                <Sun size={32} className="dream-icon" />
                <p>Waking up to your smile</p>
              </div>
              <div className="dream-item">
                <Coffee size={32} className="dream-icon" />
                <p>Morning coffee and quiet talks</p>
              </div>
              <div className="dream-item">
                <Plane size={32} className="dream-icon" />
                <p>Traveling the world together</p>
              </div>
              <div className="dream-item">
                <Home size={32} className="dream-icon" />
                <p>Building your dream home with full of love</p>
              </div>
              <div className="dream-item">
                <Music size={32} className="dream-icon" />
                <p>Dancing to our favorite songs</p>
              </div>
              <div className="dream-item">
                <Book size={32} className="dream-icon" />
                <p>Writing our story, one memory at a time</p>
              </div>
              <div className="dream-item">
                <Gift size={32} className="dream-icon" />
                <p>Surprising each other just because</p>
              </div>
              <div className="dream-item">
                <HeartHandshake size={32} className="dream-icon" />
                <p>Supporting each other in every dream</p>
              </div>
            </div>

            <button
              onClick={() => {
                setUnlockedSections((prev) => {
                  const newUnlocked = [...prev];
                  newUnlocked[11] = true;
                  return newUnlocked;
                });
                setCurrentSection(11);
              }}
              className="primary-button"
              style={{ marginTop: '2rem' }}
            >
              <span>Continue Our Story</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ),
    },

    // 11 - Thank You
    {
      id: "thankyou",
      title: "Thank You",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Heart className="section-icon celebration-icon" size={80} />
            </div>

            <h2 className="celebration-title">Thank You</h2>

            <div className="text-content">
              <p className="quote-text">
                Thank you for being you.
              </p>
              <p className="description">
                Thank you for your patience, your kindness, and your love that never gives up on me.
              </p>
              <p className="description">
                Thank you for standing by my side through every laugh and every tear.
              </p>
              <p className="description">
                Thank you for the little things — your smile, your hugs, and the peace you bring to my heart.
              </p>
              <p className="description">
                Thank you for choosing me, not just once, but every single day.
              </p>
              <p className="description">
                You are my best friend, my home, and my forever.
              </p>
              <p className="description">
                I can’t wait to grow, dream, and share every tomorrow with you.
              </p>
            </div>


            <div className="signature-box">
              <p className="signature-text">Forever yours,</p>
              <p className="signature-name">Your kannamma🤗</p>
            </div>

            <button
              onClick={() => {
                setUnlockedSections((prev) => {
                  const newUnlocked = [...prev];
                  newUnlocked[11] = true;
                  return newUnlocked;
                });
                setCurrentSection(12);
              }}
              className="primary-button"
              style={{ marginTop: '2rem' }}
            >
              <span>Continue Our Story</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ),
    },

    // 12 - Credits
    {
      id: "credits",
      title: "Credits",
      content: (
        <div className="section-container">
          <div className="content-card">
            <h2 className="section-title">A Love Story</h2>

            <div className="credits-list">
              {[
                { role: "Written & Created by", name: "Yours nana" },
                { role: "Inspired by", name: "Our Beautiful Love Story" },
                { role: "Starring", name: "Likitha ⭐" },
                { role: "Best Supporting Role", name: "Every Shared Moment" },
                { role: "Special Thanks", name: "To All Our Memories" },
                { role: "Dedicated to", name: "Our Forever Together" },
              ].map((credit, idx) => (
                <div key={idx} className="credit-item">
                  <p className="credit-role">{credit.role}</p>
                  <p className="credit-name">{credit.name}</p>
                </div>
              ))}
            </div>

            <div className="icon-wrapper">
              <Heart className="credits-heart" size={48} />
            </div>

            <p className="hint-text">Made with ❤️ for you</p>
            <button
              onClick={() => {
                setUnlockedSections((prev) => {
                  const newUnlocked = [...prev];
                  newUnlocked[11] = true;
                  return newUnlocked;
                });
                setCurrentSection(13);
              }}
              className="primary-button"
              style={{ marginTop: '2rem' }}
            >
              <span>Continue Our Story</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ),
    },

    // 13 - Secret Easter Egg
    {
      id: "secret",
      title: "Secret",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Sparkles className="section-icon sparkle-icon" size={64} />
            </div>

            <h2 className="section-title">You Found a Secret! 🎁</h2>

            <div className="secret-box">
              <p className="description">
                You found this secret by exploring every little corner — just like how you’ve found every piece of my heart.
              </p>
              <p className="quote-text">
                "Every moment with you is a treasure I’ll keep close to my heart forever."
              </p>
              <p className="description">
                Like this hidden message, our love is full of quiet surprises, soft laughter, and memories waiting to be discovered.
              </p>
            </div>


            <div className="secret-message">
              <p className="secret-text">PS: I love you more than words can ever say 💕</p>
            </div>
            <button
              onClick={() => {
                setUnlockedSections((prev) => {
                  const newUnlocked = [...prev];
                  newUnlocked[11] = true;
                  return newUnlocked;
                });
                setCurrentSection(14);
              }}
              className="primary-button"
              style={{ marginTop: '2rem' }}
            >
              <span>Continue Our Story</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ),
    },

    // 14 - Journey Control
    {
      id: "replay",
      title: "Journey Control",
      content: (
        <div className="section-container">
          <div className="content-card">
            <div className="icon-wrapper">
              <Heart className="section-icon" size={64} />
            </div>

            <h2 className="section-title">Our Journey</h2>

            <div className="text-content">
              <p className="description">
                Relive our story anytime you want.
              </p>
            </div>

            <div className="control-buttons">
              <button
                onClick={() => {
                  setCurrentSection(0);
                  setPuzzleSolved({});
                  setUnlockedSections([true, ...Array(14).fill(false)]);
                  setShowProposal(false);
                  setUserInput("");
                  // No need to hide hint/error states as they are handled by toast
                }}
                className="secondary-button"
              >
                <RotateCcw size={20} />
                <span>Restart Journey</span>
              </button>

              <button
                onClick={() => setCurrentSection(1)}
                className="primary-button"
              >
                <MapPin size={20} />
                <span>View Memory Map</span>
              </button>

              <button
                onClick={() => setCurrentSection(9)}
                className="secret-button"
              >
                <Sparkles size={20} />
                <span>Visit Secret Place</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="treasure-hunt">
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast container */}
      <style jsx global>{`
        /* CSS Reset & Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          overflow-x: hidden;
        }

        /* Wavy Background Pattern */
        .treasure-hunt {
          min-height: 100vh;
          background: linear-gradient(180deg, #000000 0%, #0a1628 50%, #000814 100%);
          position: relative;
          color: white;
        }

        .treasure-hunt::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              rgba(14, 165, 233, 0.03) 100px,
              rgba(14, 165, 233, 0.03) 200px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(14, 165, 233, 0.03) 100px,
              rgba(14, 165, 233, 0.03) 200px
            );
          opacity: 0.5;
          animation: wave-drift 20s linear infinite;
        }

        @keyframes wave-drift {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }

        /* Section Container */
        .section-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        /* Content Card */
        .content-card {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 24px;
          padding: 3rem;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
          animation: card-enter 0.5s ease;
        }

        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .content-card:hover {
          border-color: rgba(14, 165, 233, 0.4);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
        }

        /* Icon Wrapper */
        .icon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .section-icon {
          color: #0ea5e9;
          filter: drop-shadow(0 0 10px rgba(14, 165, 233, 0.5));
        }

        .sparkle-icon {
          color: #fbbf24;
          filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.5));
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
            opacity: 0.8;
          }
        }

        .celebration-icon {
          color: #ec4899;
          filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));
          animation: gentle-pulse 2s ease-in-out infinite;
        }

        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Typography */
        .main-title {
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 2rem;
          color: #0ea5e9;
        }

        .celebration-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 1rem;
          color: #cbd5e1;
        }

        .description {
          font-size: 1.125rem;
          line-height: 1.75;
          text-align: center;
          color: #94a3b8;
          margin-bottom: 1rem;
        }

        .text-content {
          margin-bottom: 2rem;
        }

        /* Quote Box */
        .quote-box {
          background: rgba(14, 165, 233, 0.1);
          border-left: 4px solid #0ea5e9;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-radius: 8px;
        }

        .quote-text {
          font-size: 1.5rem;
          font-style: italic;
          text-align: center;
          color: #e0f2fe;
          line-height: 1.6;
        }

        /* Puzzle Container */
        .puzzle-container {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 16px;
          padding: 2rem;
          margin-top: 2rem;
        }

        .puzzle-label {
          font-size: 1.125rem;
          text-align: center;
          color: #94a3b8;
          margin-bottom: 1rem;
        }

        .puzzle-text {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #0ea5e9;
          letter-spacing: 0.5rem;
          margin-bottom: 2rem;
          font-family: monospace;
        }

        .riddle-box {
          background: rgba(14, 165, 233, 0.05);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .riddle-text {
          font-size: 1.25rem;
          text-align: center;
          color: #cbd5e1;
          line-height: 1.6;
        }

        /* Input */
        .puzzle-input {
          width: 100%;
          padding: 1rem;
          font-size: 1.125rem;
          text-align: center;
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid rgba(14, 165, 233, 0.3);
          border-radius: 12px;
          color: white;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .puzzle-input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
        }

        .puzzle-input::placeholder {
          color: #64748b;
        }

        /* Error Text (now handled by toast, but keeping for potential future use or other elements) */
        .error-text {
          color: #ef4444;
          text-align: center;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          animation: shake 0.3s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* Memory Grid */
        .memory-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .memory-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .memory-card.unlocked {
          border-color: rgba(14, 165, 233, 0.5);
        }

        .memory-card.unlocked:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.2);
        }

        .memory-card.locked {
          opacity: 0.4;
          filter: grayscale(100%);
        }

        .memory-icon {
          color: #0ea5e9;
          margin: 0 auto 1rem;
        }

        .memory-label {
          font-size: 1rem;
          color: #cbd5e1;
          font-weight: 500;
        }

        .locked-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 16px;
          font-size: 1.5rem;
        }

        /* Hint Text (now handled by toast, but keeping for potential future use or other elements) */
        .hint-text {
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
        }

        .hint-text.small {
          font-size: 0.75rem;
          margin-top: 0.5rem;
        }

        /* Button Group */
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* Buttons */
        .primary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
        }

        .primary-button:active {
          transform: translateY(0);
        }

        .secondary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: #0ea5e9;
          background: rgba(14, 165, 233, 0.1);
          border: 2px solid rgba(14, 165, 233, 0.3);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-button:hover {
          background: rgba(14, 165, 233, 0.2);
          border-color: rgba(14, 165, 233, 0.5);
        }

        .hint-button {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hint-button:hover {
          background: rgba(251, 191, 36, 0.2);
          border-color: rgba(251, 191, 36, 0.5);
        }

        .secret-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .secret-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        /* Proposal Specific */
        .proposal-card {
          max-width: 700px;
        }

        .proposal-box {
          background: rgba(236, 72, 153, 0.1);
          border: 2px solid rgba(236, 72, 153, 0.3);
          border-radius: 20px;
          padding: 3rem 2rem;
          margin-top: 2rem;
        }

        .heart-icon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .heart-icon {
          color: #ec4899;
          filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));
          animation: gentle-pulse 2s ease-in-out infinite;
        }

        .proposal-question {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #fce7f3;
          margin-bottom: 2rem;
        }

        .proposal-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .yes-button {
          flex: 1;
          padding: 1.25rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }

        .yes-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.5);
        }

        .no-button {
          flex: 1;
          padding: 1.25rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #64748b;
          background: rgba(51, 65, 85, 0.5);
          border: 2px solid rgba(71, 85, 105, 0.5);
          border-radius: 12px;
          cursor: not-allowed;
          opacity: 0.5;
        }

        /* Celebration Specific */
        .celebration-card {
          text-align: center;
        }

        .celebration-text {
          font-size: 1.5rem;
          color: #fbbf24;
          text-align: center;
          margin-bottom: 2rem;
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
          }
        }

        .celebration-content {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.3);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        /* Future Dreams */
        .future-dreams {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }

        .dream-item {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .dream-item:hover {
          transform: translateY(-4px);
          background: rgba(139, 92, 246, 0.2);
        }

        .dream-icon {
          color: #c4b5fd;
          margin-bottom: 0.75rem;
        }

        .dream-item p {
          color: #cbd5e1;
          font-size: 0.875rem;
        }

        /* Signature Box */
        .signature-box {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          text-align: center;
        }

        .signature-text {
          font-size: 1rem;
          color: #94a3b8;
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .signature-name {
          font-size: 1.5rem;
          color: #ec4899;
          font-weight: 600;
        }

        /* Credits */
        .credits-list {
          margin-bottom: 2rem;
        }

        .credit-item {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .credit-role {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .credit-name {
          font-size: 1.25rem;
          color: #cbd5e1;
          font-weight: 600;
        }

        .credits-heart {
          color: #ec4899;
          filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));
        }

        /* Secret Box */
        .secret-box {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }

        .secret-message {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .secret-text {
          font-size: 1.125rem;
          color: #fbbf24;
          font-weight: 600;
        }

        /* Control Buttons */
        .control-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Progress Indicator */
        .progress-indicator {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .progress-icon {
          color: #0ea5e9;
        }

        .progress-text {
          color: #cbd5e1;
          font-weight: 600;
          font-size: 1rem;
        }

        .progress-bar-container {
          width: 120px;
          height: 8px;
          background: rgba(30, 41, 59, 0.8);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9 0%, #8b5cf6 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        /* Navigation Buttons */
        .nav-button {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 50%;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #0ea5e9;
        }

        .nav-button:hover {
          border-color: #0ea5e9;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .nav-button.left {
          left: 2rem;
        }

        .nav-button.right {
          right: 2rem;
        }

        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .section-container {
            padding: 1rem;
          }

          .content-card {
            padding: 2rem 1.5rem;
          }

          .main-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .celebration-title {
            font-size: 2rem;
          }

          .quote-text {
            font-size: 1.25rem;
          }

          .puzzle-text {
            font-size: 1.5rem;
            letter-spacing: 0.25rem;
          }

          .proposal-question {
            font-size: 1.5rem;
          }

          .memory-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .future-dreams {
            grid-template-columns: 1fr;
          }

          .proposal-buttons {
            flex-direction: column;
          }

          .nav-button.left {
            left: 1rem;
          }

          .nav-button.right {
            right: 1rem;
          }

          .progress-indicator {
            bottom: 1rem;
            padding: 0.75rem 1rem;
          }

          .progress-bar-container {
            width: 80px;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 1.75rem;
          }

          .section-title {
            font-size: 1.25rem;
          }

          .celebration-title {
            font-size: 1.75rem;
          }

          .primary-button,
          .secondary-button,
          .secret-button {
            font-size: 1rem;
            padding: 0.875rem 1.5rem;
          }
        }
      `}</style>

      {/* Section Rendering */}
      <div className="sections-wrapper">
        {sections[currentSection].content}
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <MapPin className="progress-icon" size={20} />
        <span className="progress-text">
          {currentSection + 1} / {sections.length}
        </span>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentSection > 0 && (
        <button
          onClick={() => setCurrentSection(currentSection - 1)}
          className="nav-button left"
          aria-label="Previous section"
        >
          <ArrowLeft size={24} />
        </button>
      )}

      {currentSection < sections.length - 1 && unlockedSections[currentSection + 1] && (
        <button
          onClick={() => setCurrentSection(currentSection + 1)}
          className="nav-button right"
          aria-label="Next section"
        >
          <ArrowRight size={24} />
        </button>
      )}
    </div>
  );
};

export default TreasureHunt;
