using System.Text.Json;
using PharmacyApi.Models;

namespace PharmacyApi.Repositories
{
    // Stores the medicines in Data/medicines.json as required by the assignment.
    public class JsonMedicineRepository : IMedicineRepository
    {
        private readonly string _filePath;
        private readonly object _lock = new object();

        private readonly JsonSerializerOptions _options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true,
            WriteIndented = true
        };

        public JsonMedicineRepository(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "Data", "medicines.json");
        }

        public List<Medicine> GetAll()
        {
            return Load();
        }

        public Medicine Add(Medicine medicine)
        {
            // lock so two requests at the same time don't overwrite each other
            lock (_lock)
            {
                List<Medicine> medicines = Load();

                medicine.Id = medicines.Count == 0 ? 1 : medicines.Max(m => m.Id) + 1;
                medicines.Add(medicine);

                Save(medicines);

                return medicine;
            }
        }

        private List<Medicine> Load()
        {
            if (!File.Exists(_filePath))
            {
                return new List<Medicine>();
            }

            string json = File.ReadAllText(_filePath);

            if (string.IsNullOrWhiteSpace(json))
            {
                return new List<Medicine>();
            }

            List<Medicine>? medicines = JsonSerializer.Deserialize<List<Medicine>>(json, _options);

            return medicines ?? new List<Medicine>();
        }

        private void Save(List<Medicine> medicines)
        {
            string json = JsonSerializer.Serialize(medicines, _options);
            File.WriteAllText(_filePath, json);
        }
    }
}
