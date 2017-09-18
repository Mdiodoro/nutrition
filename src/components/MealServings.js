import React from 'react';

const MealServings = ({ mealServings }) => {
  console.log(mealServings)
  let mealKeys = Object.keys(mealServings);
  return (
    <div display="inline">
    {mealKeys.map((food, index) => {
      return (
        <div key={index}>
          <span>{food}</span> <span>{Object.values(mealServings)[index]}</span>
        </div>
      )})
    }
    </div>
  )
}

export default MealServings;