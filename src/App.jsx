import  data  from "./data.json";
import RestaurantDetails from './components/RestaurantDetails';
function App() {
  // console.log(data);
  return (
    <>
    <RestaurantDetails data={data} />
    </>
  )
}

export default App
