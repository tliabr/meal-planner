import { useState } from "react";
import './App.css';
import MealList from "./MealList";

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function handleChange(e) {
    setCalories(e.target.value);
  }

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=10e175f11a664899bf0752dec44f8ca5&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error")
      });
  }

  return (
    <div className='App'>
      <section className='controls'>
        <input
        type="number"
        placeholder="Calories: 2000"
        onChange={handleChange} />
      </section>
      <button onClick={getMealData}>Get a Meal Plan</button>
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default App;
