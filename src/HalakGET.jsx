import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './HalakGET.css';

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('API hiba:', error);
    return { error: 'Nem sikerült betölteni az adatokat.' };
  }
};

const HalakListaja = () => {
    const [halak, setHalak] = useState([]);
    const [tavak, setTavak] = useState([]);
    const [betoltott, setBetoltott] = useState(false);
    const [hiba, setHiba] = useState('');
  
    useEffect(() => {
      const adatBetoltes = async () => {
        const halakAdatok = await fetchData('https://localhost:7067/api/halak');
        if (halakAdatok.error) {
          setHiba(halakAdatok.error);
          return;
        }
  
        const tavakAdatok = await fetchData('https://localhost:7067/api/Tavak');
        if (tavakAdatok.error) {
          setHiba(tavakAdatok.error);
          return;
        }
  
        const halakTavakkal = halakAdatok.map((hal) => {
          const to = tavakAdatok.find((to) => to.id === hal.toId);
          return {
            ...hal,
            toNev: to ? to.nev : 'Ismeretlen tó',
          };
        });
  
        setHalak(halakTavakkal);
        setTavak(tavakAdatok);
        setBetoltott(true);
      };
      adatBetoltes();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`https://localhost:7067/api/halak/${id}`);
        setHalak(halak.filter((hal) => hal.id !== id));
      } catch (error) {
        console.error('Törlési hiba:', error);
      }
    };
  
    if (!betoltott) return <div className="betoltes">Betöltés...</div>;
    if (hiba) return <div className="hiba">{hiba}</div>;
  
    return (
      <div className="halak-lista">
        <h2>Halak listája</h2>
        <Link to="/halak/uj" className="uj-hal-gomb">
          Új hal hozzáadása
        </Link>
        <table>
          <thead>
            <tr>
              <th>Név</th>
              <th>Faj</th>
              <th>Méret (cm)</th>
              <th>Tó neve</th>
              <th>Kép</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {halak.map((hal) => (
              <tr key={hal.id}>
                <td>{hal.nev}</td>
                <td>{hal.faj}</td>
                <td>{hal.meretCm}</td>
                <td>{hal.toNev}</td>
                <td>
                  {hal.kep && (
                    <img
                      src={`data:image/jpeg;base64,${hal.kep}`}
                      alt={hal.nev}
                      style={{ maxWidth: '100px' }}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/halak/szerkesztes/${hal.id}`} className="szerkesztes-gomb">
                    Szerkesztés
                  </Link>
                  <button onClick={() => handleDelete(hal.id)} className="torles-gomb">
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default HalakListaja;