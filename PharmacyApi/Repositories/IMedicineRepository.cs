using PharmacyApi.Models;

namespace PharmacyApi.Repositories
{
    public interface IMedicineRepository
    {
        List<Medicine> GetAll();

        Medicine Add(Medicine medicine);
    }
}
