import { useState, useEffect } from 'react';
import { getMedicines, addMedicine } from './api';
import MedicineForm from './components/MedicineForm';
import MedicineList from './components/MedicineList';
import './App.css';

function App() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    try {
      const data = await getMedicines();
      setMedicines(data);
    } catch (err) {
      setError(err.message + ' Please check that the API is running.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(medicine) {
    const saved = await addMedicine(medicine);
    setMedicines([...medicines, saved]);
  }

  // filtered on every render instead of keeping it in state
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>ABC Pharmacy - Medicine Stock</h1>

      <MedicineForm onAdd={handleAdd} />

      <div className="list-header">
        <h2>Medicines</h2>
        <input
          type="text"
          className="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="legend">
        <span className="legend-item">
          <span className="box red"></span> Expiring in less than 30 days
        </span>
        <span className="legend-item">
          <span className="box yellow"></span> Quantity less than 10
        </span>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="message">Loading...</p>
      ) : (
        <MedicineList medicines={filteredMedicines} />
      )}
    </div>
  );
}

export default App;
