import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import MealName from './components/MealName';
import MealCreation from './components/MealCreation';
import MealDisplay from './components/MealDisplay';

import './stylesheet.css';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  constructor(props) {
    super();
    const foodGroups = ['Vegetable', 'Protein', 'Fat', 'Carb', 'Drink'];
    let basicMeal = foodGroups.reduce((groups, food) =>  {
      groups[food] = 0;
      return groups;
    }, { mealName: '' });

    this.state = {
      foodGroups,
      currentMeal: Object.assign({}, basicMeal),
      meals: {},
      mealType: ['', 'Breakfast', 'Lunch', 'Dinner', 'Snack'],
      startDate: moment(),
      selectedMeal: null,
    }
    this.addMealDetails = this.addMealDetails.bind(this);
    this.submitMeal = this.submitMeal.bind(this);
    this.createDate = this.createDate.bind(this);
    this.checkFoodGoals = this.checkFoodGoals.bind(this);
    this.addToServings = this.addToServings.bind(this);
    this.basicMeal = basicMeal;
    this.selectMeal = this.selectMeal.bind(this);
  }

  addMealDetails(event, detail) {
    let meal = Object.assign({}, this.state.currentMeal);
    let value = event.target.value;
    if (detail) {
      meal[detail] = value;
      this.setState({
        currentMeal: meal,
      });
    } else {
      meal['mealName'] = value;
      this.setState({
        currentMeal: meal,
      })
    }
  }

  createDate(date) {
    date = date || new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let record = `${day}-${month}-${year}`;
    return record;
  }

  checkFoodGoals(mealTotal, mealNumber) {
    let foodGoals = {
      mealNumber,
    };
    let feedback = '';
    for (var key in mealTotal) {

      let message = `You're eating too many ${key}s, your daily recommended ${key} intake is 2 servings and you're at ${mealTotal[key]}. '`;
      if (key === 'Protein' && mealTotal[key] > 3) {

        feedback += `You're eating too much ${key}, your daily recommended ${key} intake is 3 servings and you're at ${mealTotal[key]}. '`;
      } else if (key === 'Fat' && mealTotal[key] > 2) {
        feedback += message;
      } else if (key === 'Carb' && mealTotal[key] > 2) {

        feedback += message;
      }
    }

    foodGoals['feedback'] = feedback;
    return foodGoals;
  }

  addToServings(totalServings, currentServings) {
    for (var key in totalServings) {
      totalServings[key] = Number(totalServings[key]) + Number(currentServings[key])
    }
    return totalServings;
  }

  selectMeal(date) {
    let targetDate = this.createDate(date['_d']);
    let meals = Object.assign({}, this.state.meals);
    let selectedMeal = meals[targetDate];
    if (selectedMeal) {
      this.setState({
      startDate: date,
      selectedMeal,
      });
    } else {
      alert('No meals on that date');
    }
  }

  submitMeal() {
    let meal = Object.assign({}, this.state.currentMeal);
    let mealServings = Object.assign({}, this.state.currentMeal);
    delete mealServings['mealName'];
    let meals = Object.assign({}, this.state.meals);
    let servings = Math.min(...Object.values(mealServings)) >= 0 && Object.values(mealServings).reduce((acc, val) => acc + val) > 0;
    let date = this.createDate();
    let dailyMeal = meals[date];
    if (meal['mealName'].length && servings) {
      if (dailyMeal) {
        dailyMeal['meals'].push(meal);
        this.addToServings(dailyMeal['mealServings'], mealServings);
        dailyMeal['foodGoal'] = this.checkFoodGoals(dailyMeal['mealServings'], dailyMeal['meals'].length);
        this.setState({
          meals,
          currentMeal: Object.assign({}, this.basicMeal),
        });
      } else {
        dailyMeal = Object.assign({}, this.state.currentMeal);
        let foodGoal = this.checkFoodGoals(mealServings, 1);
        let newMeal = {
          meals: [dailyMeal],
          mealServings,
          foodGoal,
        }; 
        meals[date] = newMeal;
        this.setState({
          meals,
          currentMeal: Object.assign({}, this.basicMeal),
        });
      }
    } else {
      alert('Make sure to enter a meal name and at least one serving (over zero servings) please'); 
    }
  }

  render() {
    return (
      <div className="App">
      <h1>Meal Planner 9000</h1>
      <h3>Create Meal</h3>
        <MealName addMealDetails={ this.addMealDetails }  currentMealName={ this.state.currentMeal['mealName'] } mealType={ this.state.mealType }/>
        <MealCreation foodGroups = { this.state.foodGroups } addMealDetails = { this.addMealDetails } currentMeal={ this.state.currentMeal } />
        <button type="button" onClick={this.submitMeal}>Submit Meal</button>
        <h3>Select Daily Meals</h3>
        <DatePicker
        selected={this.state.startDate}
        onSelect={this.selectMeal}
        />
        {this.state.selectedMeal ? <MealDisplay currentMeals={this.state.selectedMeal} foodGroups={this.state.foodGroups} /> : null}
      </div>
    );
  }
}

export default App;
