# ABC Pharmacy — Medicine Stock

A single page application to keep track of pharmacy stock: view the medicines in
a colour coded grid, add a new medicine, and search the list by name.

- **Backend** — ASP.NET Core Web API (.NET 8), medicines stored in a JSON file
- **Frontend** — React (Vite), plain CSS

```
PharmacyApp/
├── PharmacyApi/
│   ├── Models/Medicine.cs
│   ├── Repositories/            IMedicineRepository + JsonMedicineRepository
│   ├── Controllers/MedicinesController.cs
│   ├── Data/medicines.json      the data file, comes with 12 seed medicines
│   └── Program.cs               DI, JSON options, CORS
└── pharmacy-web/
    └── src/
        ├── api.js               the two fetch calls
        ├── App.jsx              state, search, loading
        └── components/          MedicineForm, MedicineList, MedicineRow
```

## Prerequisites

- .NET 8 SDK
- Node 20 or newer

If `dotnet --list-sdks` does not show an 8.x version, check `which -a dotnet`.
A Homebrew install in `/opt/homebrew/bin` takes priority over the official one
in `/usr/local/share/dotnet` and only has the version Homebrew shipped. Putting
`/usr/local/share/dotnet` first on `PATH` fixes it.

## How to run

Two terminals, API first.

**1. API** — from `PharmacyApp/PharmacyApi`:

```bash
dotnet run --launch-profile http
```

Runs on <http://localhost:5053>. Swagger is at <http://localhost:5053/swagger>.

**2. Frontend** — from `PharmacyApp/pharmacy-web`:

```bash
npm install && npm run dev
```

Runs on <http://localhost:5173>. Open that in the browser.

The API URL is set at the top of `src/api.js` if the port ever needs changing.

### From VS Code

Open the `PharmacyApp` folder (not its parent), then press F5 and pick
**Run API**. It builds, starts the API and opens Swagger. **Run API +
Frontend** starts the Vite dev server as well and opens the React app.

If you are using an Open Preview pane instead, enter one of these URLs:

- `http://localhost:5173` — the React app
- `http://localhost:5053/swagger` — the API

`http://localhost:5053` on its own redirects to Swagger. Entering any other
path, or a port nothing is running on, gives a page not found.

## API

| Method | Route            | Description                           |
| ------ | ---------------- | ------------------------------------- |
| GET    | `/api/medicines` | Returns all medicines                 |
| POST   | `/api/medicines` | Adds one and returns it with its `id` |

POST body (the id is set by the API, so it is not sent):

```json
{
  "name": "Paracetamol 500mg",
  "notes": "Fast moving, keep at the counter.",
  "expiryDate": "2027-03-31",
  "quantity": 120,
  "price": 24.50,
  "brand": "Cipla"
}
```

Missing or invalid values come back as a 400 with the validation messages.

## Colour rule

Checked in this order, the first match wins:

1. **Red** — expiry date less than 30 days away. An already expired medicine
   also counts as red, the day count just goes negative.
2. **Yellow** — quantity less than 10.
3. **White** — everything else.

**Red takes precedence over yellow.** A medicine that is expiring soon *and* low
on stock shows red, because `getRowClass()` in `MedicineRow.jsx` checks the
expiry date first and returns. Two of the seed rows (Azithromycin, Insulin
Glargine) hit both conditions so this is easy to check on screen.

