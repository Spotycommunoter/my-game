import { useState, useEffect } from 'react';

interface GameItem {
  name: string;
  description: string;
  points: number;
}

const gameItems: GameItem[] = [
  { name: 'Apple', description: 'Get the apple', points: 10 },
  { name: 'Banana', description: 'Get the banana', points: 20 },
  { name: 'Cherry', description: 'Get the cherry', points: 30 },
];

const Game = () => {
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!currentItem) {
        const randomItem = gameItems[Math.floor(Math.random() * gameItems.length)];
        setCurrentItem(randomItem);
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [currentItem]);

  const handleCatch = () => {
    if (currentItem) {
      setScore(score + currentItem.points);
      setCurrentItem(null);
    }
  };

  const handleMiss = () => {
    setGameOver(true);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentItem(null);
    setGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Fruit Catcher Game</h1>
      {gameOver ? (
        <div>
          <p className="text-lg">Game Over! Your score is {score}.</p>
          <button onClick={handleRestart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Restart
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg">Score: {score}</p>
          {currentItem ? (
            <div>
              <p className="text-lg">{currentItem.name} ({currentItem.points} points)</p>
              <button onClick={handleCatch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Catch
              </button>
              <button onClick={handleMiss} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Miss
              </button>
            </div>
          ) : (
            <p className="text-lg">Waiting for fruit...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;

// Publicize your game on the web for free:
// 1. Create a GitHub repository for your game and upload the code.
// 2. Create a GitHub Pages site for your repository to host your game.
// 3. Share your game on social media platforms like Twitter, Facebook, and LinkedIn.
// 4. Submit your game to online game directories like Itch.io and GameJolt.
// 5. Participate in online game development communities like GameDev.net and Gamasutra to showcase your game.
// 6. Reach out to gaming bloggers and influencers to review and feature your game.
// 7. Optimize your game's website for search engines to improve visibility.
// 8. Create a YouTube video showcasing your game and share it on your channel.
// 9. Share your game on Reddit's r/gamedev and r/webdev communities.
// 10. Collaborate with other game developers to cross-promote each other's games.
