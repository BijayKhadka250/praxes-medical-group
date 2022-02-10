import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Table, Form} from "react-bootstrap";
import Axios from "axios";

function App() {
  
  const [carData, setCarData] = useState([])
  const [brandNames, setBrandNames] = useState([])
  const [brand, setBrand] = useState("")

  // const handleFilter = () => {
  //   console.log("brand",brand);
  //   console.log("carData",carData);
  //   if(brand !== "" && brand !== "Select Brand"){
  //     let filterData = carData.filter(item => item.brand === brand)
  //     console.log("filterData",filterData);
  //     setCarData(filterData)
  //   }
    
  // }

  const getFilteredData = () => {
    console.log("carData getFilteredData",carData);
    // let data = carData
    console.log("brand",brand);
    if(brand !== "" && brand !== "Select Brand"){
          let filterData = carData.filter(item => item.brand === brand)
          console.log("filterData",filterData);
          return filterData
        }else {
          return carData
        }
  }

  useEffect(() => {
    Axios.get('https://praxesdemo-default-rtdb.firebaseio.com/brands.json').then(brand => {
      console.log("brand",brand);
      let data = brand.data.filter((item) => item !== null)
      setBrandNames(data)
    })
    Axios.get('https://praxesdemo-default-rtdb.firebaseio.com/cars.json').then(response => {
      console.log("response",response);
      let data = response.data.filter((item) => item !== null)
      console.log("response after",data);
      setCarData(data)
    })
  },[])
  console.log("brand",brand);
  

  const filterData = getFilteredData()
  console.log("filterData",filterData);
  
//   if(brand !== "" && brand !== "Select Brand"){
//      filterData = carData.filter(item => item.brand === brand)
//     console.log("filterData",filterData);
//     // setCarData(filterData)
//   }
// console.log("carData",carData);
  // if(filterData.length === 0){
  //   return(<h1>Loading...</h1>)
  // }
  return (
    <div className="App">
      <Form.Label>Filter By Brand:</Form.Label>
      <select className="form-select" style={{margin: "5px auto 0px", width:"50%"}} onChange={(e) => setBrand(e.target.value)}>
      <option selected>Select Brand</option> 
      {
          brandNames.map((item) => (
            <option>{item}</option>
          ))
        }
      </select>
      {/* <Button variant="primary" onClick= {handleFilter}>Filter</Button> */}
      {/* <DropdownButton
        title="select Brand"
      >
        {
          brandNames.map((item) => (
            <Dropdown.Item >{item}</Dropdown.Item>
          ))
        } */}
        {/* <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Active Item
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
      {/* </DropdownButton> */}
      <Table striped bordered hover responsive style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((item) => (
            <tr>
              <td>{item.brand}</td>
              <td>{item.model}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
