import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HalakPUT.css';

const HalSzerkesztes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      nev: '',
      faj: '',
      meretCm: 0,
      toId: '',
      kep: null,
    });
  
    useEffect(() => {
      const fetchHal = async () => {
        const response = await axios.get(`https://localhost:7067/api/halak/${id}`);
        setFormData(response.data);
      };
      fetchHal();
    }, [id]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, kep: reader.result.split(',')[1] });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`https://localhost:7067/api/halak/${id}`, formData);
        navigate('/halak');
      } catch (error) {
        console.error('Hiba a szerkesztés során:', error);
      }
    };
  
    return (
      <div className="hal-szerkesztes">
        <h2>Hal szerkesztése</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Név:
            <input type="text" name="nev" value={formData.nev} onChange={handleChange} required />
          </label>
          <label>
            Faj:
            <input type="text" name="faj" value={formData.faj} onChange={handleChange} required />
          </label>
          <label>
            Méret (cm):
            <input type="number" name="meretCm" value={formData.meretCm} onChange={handleChange} required />
          </label>
          <label>
            Tó ID:
            <input type="number" name="toId" value={formData.toId} onChange={handleChange} required />
          </label>
          <label>
            Kép:
            <input type="file" name="kep" onChange={handleFileChange} />
          </label>
          <button type="submit">Mentés</button>
        </form>
      </div>
    );
};

export default HalSzerkesztes;
