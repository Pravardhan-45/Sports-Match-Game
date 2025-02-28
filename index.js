import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const players = [
  { name: 'Rohit Sharma', img: 'https://sm.mashable.com/t/mashable_me/photo/default/untitled-2025-02-26t171915363_jp6a.2496.jpg' },
  { name: 'Virat Kohli', img: 'https://static.cricketaddictor.com/images/posts/2025/Virat-Kohli-20-.webp?q=80' },
  { name: 'Sachin Tendulkar', img: 'https://tse4.mm.bing.net/th?id=OIP.BfIYservwcctlvwtq2dqewHaEK&pid=Api&P=0&h=220' },
  { name: 'Chris Gayle', img: 'https://www.sportsindiashow.com/wp-content/uploads/2019/08/chris-gayle-.jpg' },
  { name: 'AB de Villiers', img: 'https://w0.peakpx.com/wallpaper/392/642/HD-wallpaper-abd-rcb.jpg' },
  { name: 'Shubman Gill', img: 'https://images.hindustantimes.com/img/2023/01/19/1600x900/PTI01-18-2023-000156A-0_1674140876686_1674140876686_1674140899204_1674140899204.jpg' }
];

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const shuffledCards = [...players, ...players]
      .map((item, index) => ({ id: index, name: item.name, img: item.img }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (time > 0 && !win) {
      const timer = setInterval(() => setTime(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (time === 0 && matched.length < players.length) {
      setGameOver(true);
    }
  }, [time, win, matched]);

  useEffect(() => {
    if (matched.length === players.length) {
      setWin(true);
      setGameOver(true);
    }
  }, [matched]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].name === cards[second].name) {
        setMatched([...matched, cards[first].name]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  const handleClick = (index) => {
    if (!gameOver && flipped.length < 2 && !flipped.includes(index) && !matched.includes(cards[index].name)) {
      setFlipped([...flipped, index]);
    }
  };

  const restartGame = () => {
    setTime(30);
    setGameOver(false);
    setWin(false);
    setMatched([]);
    setFlipped([]);
    const shuffledCards = [...players, ...players]
      .map((item, index) => ({ id: index, name: item.name, img: item.img }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  return (
    <div className="App">
      <h1>Match the Players</h1>
      <h2>Time Left: {time}s</h2>
      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || matched.includes(card.name) ? 'flipped' : ''}`}
            onClick={() => handleClick(index)}
            style={{ pointerEvents: gameOver ? 'none' : 'auto' }}
          >
            {flipped.includes(index) || matched.includes(card.name) ? (
              <img src={card.img} alt={card.name} />
            ) : (
              '??'
            )}
          </div>
        ))}
      </div>
      {gameOver && !win && (
        <>
          <h2>Game Over! Try again!</h2>
          <button onClick={restartGame}>Restart</button>
        </>
      )}
      {win && (
        <>
          <h2>Congratulations! You matched all players!</h2>
          <button onClick={restartGame}>Play Again</button>
        </>
      )}
      <style>{`
        .App {
          text-align: center;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 150px);
          gap: 10px;
          justify-content: center;
        }
        
        .card {
          width: 150px;
          height: 150px;
          background-color: #f4f4f4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 10px;
          transition: background-color 0.3s;
        }
        
        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }

        .card.flipped {
          background-color: #4caf50;
          color: white;
        }

        button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
