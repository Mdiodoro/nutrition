import React from 'react';
import MealOption from './MealOption'

const MealName = ({ addMealDetails, currentMealName, mealType }) => {
  return (
    <div>
      <label>
        Meal Name:
        <input type="text" value={ currentMealName } onChange={ addMealDetails } />
      </label>
      <select onChange={ addMealDetails }>
        {mealType.map((meal, index) => <MealOption key={ index } meal={ meal } />)}
      </select>
    </div>
  )
}

export default MealName;

