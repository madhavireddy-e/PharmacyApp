function getDaysToExpiry(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

// Red first, then yellow, so a medicine that is expiring and low on stock
// shows red.
function getRowClass(medicine) {
  if (getDaysToExpiry(medicine.expiryDate) < 30) {
    return 'row-red';
  }

  if (medicine.quantity < 10) {
    return 'row-yellow';
  }

  return '';
}

function formatDate(expiryDate) {
  return new Date(expiryDate).toLocaleDateString('en-GB');
}

function MedicineRow({ medicine }) {
  return (
    <tr className={getRowClass(medicine)}>
      <td>{medicine.name}</td>
      <td>{medicine.brand}</td>
      <td>{formatDate(medicine.expiryDate)}</td>
      <td>{medicine.quantity}</td>
      <td>{medicine.price.toFixed(2)}</td>
    </tr>
  );
}

export default MedicineRow;
