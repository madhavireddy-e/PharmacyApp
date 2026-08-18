using Microsoft.AspNetCore.Mvc;
using PharmacyApi.Models;
using PharmacyApi.Repositories;

namespace PharmacyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicinesController : ControllerBase
    {
        private readonly IMedicineRepository _repository;

        public MedicinesController(IMedicineRepository repository)
        {
            _repository = repository;
        }

        // GET: api/medicines
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Medicine> medicines = _repository.GetAll();

            return Ok(medicines);
        }

        // POST: api/medicines
        [HttpPost]
        public IActionResult Create([FromBody] Medicine medicine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Medicine saved = _repository.Add(medicine);

            return Ok(saved);
        }
    }
}
