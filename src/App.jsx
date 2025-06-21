import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import placeholderJoker from './assets/joker.gif'


function App() {
  const [cards, setCards] = useState(Array(12).fill(null).map((_, index) => (
    {
      id: index,
      url: placeholderJoker,
      name: `plchldr-${index + 1}`
    }
  )))

  useEffect(() => {
    async function loadStickers() {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/stickers/search?api_key=JZL477j9WLFc1BVImLOgVoKfhqexXLVj&q=balatro&limit=12`, //THIS GETS 12 STICKERS IN ONE CALL
          { mode: 'cors' }
        );
        
        if (!response.ok) throw new Error("Failed to fetch stickers");
        
        const stickerData = await response.json();
        console.log(stickerData)
        const uniqueCards = stickerData.data.slice(0, 12).map(sticker => ({
          id: sticker.id,
          url: sticker.images.original.url,
          // name: `balatro-${sticker.id}`
        }));
        
        setCards(uniqueCards);
      } catch (err) {
        console.error("Sticker loading failed:", err);
        document.querySelector('.game-title').textContent = "Error loading cards";
      }
    }
  
    loadStickers();
  }, []);

  function shuffleCards() {
    setCards(prevCards => { //"prevCards is automatically provided by React - it's the current value of cards state at the moment the update is processed"
      const tempCards = [...prevCards]; //BETTER WAY TO COPY ARRAY
      
      for (let i = tempCards.length - 1; i > 0; i--) {       // FISHER-YATES SHUFFLE
        const j = Math.floor(Math.random() * (i + 1));
        [tempCards[i], tempCards[j]] = [tempCards[j], tempCards[i]];
      }
      
      return tempCards;
    });
  }

  return (
    <>
      <h1 className='game-title'>Balatro Balatrero Memoria</h1>
      <h2 className='game-description'>Get balatro points by balatro clicking on a balatro image, but don't balatro click on any balatro more than balatro once!</h2>
      <section className='game-container'>
        {cards.map((card) => (
          <Card key={card.id} image={card.url} name={card.name} onClick={shuffleCards} />
        ))}
      </section>
    </>
  )
}

export default App