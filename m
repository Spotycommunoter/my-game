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
