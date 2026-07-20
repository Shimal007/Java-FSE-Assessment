import './App.css';
import office from './assets/office.jpg'

function App() {

  const officeSpaces = [
    {
      Name: "DBS",
      Rent: 50000,
      Address: "Chennai",
      Image: office
    },
    {
      Name: "WeWork",
      Rent: 75000,
      Address: "Bangalore",
      Image: office
    },
    {
      Name: "Regus",
      Rent: 55000,
      Address: "Hyderabad",
      Image: office
    },
    {
      Name: "SmartWorks",
      Rent: 90000,
      Address: "Mumbai",
      Image: office
    }
  ];

  return (
    <div className="App">

      <h1>Office Space, at Affordable Range</h1>

      {
        officeSpaces.map((item, index) => (

          <div key={index} className="card">

            <img
              src={item.Image}
              alt="Office Space"
              width="300"
              height="200"
            />

            <h2>Name: {item.Name}</h2>

            <h3
              style={{
                color: item.Rent <= 60000 ? "red" : "green"
              }}
            >
              Rent: Rs. {item.Rent}
            </h3>

            <h3>Address: {item.Address}</h3>

            <hr />

          </div>

        ))
      }

    </div>
  );
}

export default App;