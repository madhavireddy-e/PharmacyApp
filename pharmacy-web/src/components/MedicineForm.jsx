import { useState } from 'react';

function MedicineForm({ onAdd }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const medicine = {
      name: name,
      brand: brand,
      expiryDate: expiryDate,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      notes: notes,
    };

    try {
      await onAdd(medicine);

      // clear the form after a successful save
      setName('');
      setBrand('');
      setExpiryDate('');
      setQuantity('');
      setPrice('');
      setNotes('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="medicine-form" onSubmit={handleSubmit}>
      <h2>Add Medicine</h2>

      <div className="form-row">
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Quantity</label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label>Notes</label>
        <textarea
          rows="2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit">Add Medicine</button>
    </form>
  );
}

export default MedicineForm;
