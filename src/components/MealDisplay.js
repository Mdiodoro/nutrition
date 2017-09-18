import React from 'react';
import MealServings from './MealServings';
import MealList from './MealList';

const MealDisplay = ({ currentMeals, foodGroups }) => {
  const {
    meals,
    mealServings, 
    foodGoal,
  } = currentMeals;

  return (
    <div style={styles}>
    <h3>Food Goals</h3>
    <h4>Total Servings</h4>
    <MealServings mealServings={mealServings} foodGroups={foodGroups} />
    <h4>Feedback: </h4><span>{foodGoal.feedback}</span>
    <h4 display="inline">Total Meals: </h4><span>{foodGoal.mealNumber}</span>
    <h4>Todays Meals</h4>
    {meals.map((meal, index) => {
      return <MealList meal={meal} foodGroups={foodGroups} key={index} />
    })}
    </div>
  )
}

const styles = {
  padding: '10px',
  display : 'inline-block'
}

export default MealDisplay;


