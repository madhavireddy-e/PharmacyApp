import MedicineRow from './MedicineRow';

function MedicineList({ medicines }) {
  if (medicines.length === 0) {
    return <p className="message">No medicines found.</p>;
  }

  return (
    <table className="medicine-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Expiry Date</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map((medicine) => (
          <MedicineRow key={medicine.id} medicine={medicine} />
        ))}
      </tbody>
    </table>
  );
}

export default MedicineList;
