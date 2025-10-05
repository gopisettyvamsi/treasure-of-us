import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

interface PhotoMemorySectionProps {
  handleSolvePuzzle: (sectionId: string, correctAnswer: string) => void;
}

const PhotoMemorySection: React.FC<PhotoMemorySectionProps> = ({
  handleSolvePuzzle,
}) => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [disableClick, setDisableClick] = useState(false);

  const [photos] = useState([
    { id: 1, src: "/photos/aunty.png", pair: "A" },
    { id: 2, src: "/photos/aunty.png", pair: "A" },
    { id: 3, src: "/photos/birth1.jpg", pair: "B" },
    { id: 4, src: "/photos/birth1.jpg", pair: "B" },
    { id: 5, src: "/photos/mickey.png", pair: "C" },
    { id: 6, src: "/photos/mickey.png", pair: "C" },
    { id: 7, src: "/photos/roller.png", pair: "D" },
    { id: 8, src: "/photos/roller.png", pair: "D" },
    { id: 9, src: "/photos/us.jpg", pair: "E" },
    { id: 10, src: "/photos/us.jpg", pair: "E" },
  ].sort(() => Math.random() - 0.5));

  const handleFlip = (id: number, pair: string) => {
    if (disableClick || flipped.includes(id) || matched.includes(pair)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisableClick(true);

      const [firstCard, secondCard] = newFlipped.map((fid) =>
        photos.find((p) => p.id === fid)
      );

      if (firstCard && secondCard && firstCard.pair === secondCard.pair) {
        setTimeout(() => {
          setMatched((prev) => [...prev, firstCard.pair]);
          setFlipped([]);
          setDisableClick(false);
        }, 600);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisableClick(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === 5) {
      setTimeout(() => {
        handleSolvePuzzle("photo", "MEMORIES");
      }, 1000);
    }
  }, [matched, handleSolvePuzzle]);

  return (
    <div className="section-container animate-fadeIn">
      <div className="content-card transition-all duration-700 ease-in-out transform hover:scale-[1.01]">
        <div className="icon-wrapper">
          <Camera className="section-icon text-pink-500" size={64} />
        </div>

        <h2 className="section-title">Photo Memory Puzzle</h2>

        <div className="text-content">
          <p className="description">
            Flip the cards to find the matching pairs — just like the photo box we made 📸💞
          </p>
        </div>

        {/* 3x3 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginTop: '24px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyItems: 'center'
        }}>
          {photos.slice(0, 9).map((photo) => {
            const isFlipped = flipped.includes(photo.id) || matched.includes(photo.pair);
            
            return (
              <div
                key={photo.id}
                onClick={() => handleFlip(photo.id, photo.pair)}
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.5s',
                }}
              >
                {/* Front - Wood pattern */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'repeating-linear-gradient(90deg, #8B7355 0px, #8B7355 2px, #A0826D 2px, #A0826D 4px, #6F5E4C 4px, #6F5E4C 6px)',
                  borderRadius: '2px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                  backfaceVisibility: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.1) 2px, rgba(0,0,0,.1) 4px)',
                    opacity: 0.3,
                  }} />
                </div>

                {/* Back - Photo */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'white',
                  padding: '6px',
                  borderRadius: '2px',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}>
                  <img
                    src={photo.src}
                    alt="Memory"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      border: matched.includes(photo.pair) ? '3px solid #f472b6' : 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {matched.length === 4 && (
          <p className="text-center mt-6 text-green-400 font-semibold text-lg animate-bounce">
            🎉 You matched all the memories! Memory unlocked!
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoMemorySection;