import React from 'react';

const MealRow = ({ food, addMealDetails, currentMeal }) => {
  return (
    <tr>
      <td>{ food }</td>
      <td> 
        <input type="number" min="0" value={currentMeal[food]} onChange={ (event) =>  addMealDetails(event, food) } />
      </td>
    </tr>
  )
}


export default MealRow;
