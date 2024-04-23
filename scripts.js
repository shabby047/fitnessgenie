// scripts.js

document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const fitnessLevel = document.getElementById('fitness-level').value;
    const bodyPart = document.getElementById('body-part').value;

    // Load workout plans from JSON file
    fetch('workout-plans.json')
        .then(response => response.json())
        .then(data => {
            // Find the appropriate workout plan based on fitness level and body part
            const workoutPlan = data[fitnessLevel][bodyPart];

            // Display the workout plan
            displayWorkoutPlan(workoutPlan);
        })
        .catch(error => console.error('Error loading workout plans:', error));
});

function displayWorkoutPlan(workoutPlan) {
    const workoutPlanElement = document.getElementById('workout-plan');
    workoutPlanElement.innerHTML = '';

    // Create list items for each workout in the plan
    workoutPlan.forEach(workout => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${workout.name}</h3>
            <p>${workout.description}</p>
            <ul>
                ${workout.exercises.map(exercise => `<li>${exercise.name} - ${exercise.sets} sets of ${exercise.reps}</li>`).join('')}
            </ul>
        `;
        workoutPlanElement.appendChild(listItem);
    });
}
