let button = document.getElementById("button");
let mealBody = document.getElementById("mealBody");
let ingredients = [];

button.addEventListener("click", () => {
    ingredients = [];
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => response.json())
        .then((data) => data.meals)
        .then((data) => data[0])
        .then((finalData) => {
            console.log(finalData)
            for (let i = 1; i <= 20; i++) {
                if (finalData[`strIngredient${i}`]) {
                    ingredients.push(finalData[`strIngredient${i}`] + " - " + finalData[`strMeasure${i}`])

                }
            }
            createMealBody(finalData)
            console.log(ingredients)
        })

})
let createMealBody = (data) => {
        mealBody.innerHTML = `
    <div class="row">
    <div class="firstColumn">
    <img src="${data.strMealThumb}">
    <p><strong>Category:</strong>
    ${data.strCategory}</p>
    <p><strong>Area:</strong>
    ${data.strArea}</p>
     <p><strong>Tags:</strong>
    ${data.strTags}</p>
    <h5>Ingredients : </h5>
    <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join(" ")}
    
    </ul>
    </div>
        <div class="secondColumn">
        <h4>${data.strMeal}</h4>
        <p>${data.strInstructions}</p>
        </div>

    </div>
    <div class="row2">
    <h5>Video Recipe</h5>
    <iframe src="https://www.youtube.com/embed/${data.strYoutube.slice(-11)}" width="680" height="415"></iframe>
    </div>
    `;
    }