import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from './firebase-config';
import { addDoc, collection } from 'firebase/firestore';

function App() {
  const [location, setLocation] = useState({});
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
      console.log('thiss  location', location);
    }
  }, [location]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src={logo}
          className='App-logo'
          alt='logo'
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
