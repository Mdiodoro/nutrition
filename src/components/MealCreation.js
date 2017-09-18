import React from 'react';
import MealRow from './MealRow';

const MealCreation = ({ foodGroups, addMealDetails, currentMeal }) => {
  return (
      <table>
        <tbody>
        { foodGroups.map((food) => {
          return (
            <MealRow key = { food } food = { food } addMealDetails = { addMealDetails } currentMeal={ currentMeal } />
          )
        }) }
        </tbody>
    </table>
  )
}



export default MealCreation;
