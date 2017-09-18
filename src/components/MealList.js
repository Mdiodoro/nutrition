import React from 'react';

const MealList = ({ meal, foodGroups }) => {
  const {
    mealName,
  } = meal;
  let servings = Object.values(meal);
  servings = servings.splice(1);
  return (
    <div style={styles}>
    <span>Name </span><span>{mealName}</span>
    {servings.map((serving, index) => {
      return (
        <div>
        <span>{foodGroups[index]}</span> <span>{serving}</span>
        </div>
      )
    })}
    </div>
  )
}


const styles = {
  padding: '10px',
  display : 'inline-block'
}

export default MealList;

