//get the all required id
const image = document.getElementById("photo");
const title = document.getElementById("item-name");
const category = document.getElementById("category");
const area = document.getElementById("area");
const tag = document.getElementById("tag");
const instruction = document.getElementById("instruction");

const youtube = document.getElementById("youtube");

//receive the id from the homepage
const id = sessionStorage.getItem("id");
console.log("received " + id);
console.log(typeof (id));

// localstorage
const storage = JSON.parse(localStorage.getItem("id"));
const mealId = storage.mealId;
console.log(mealId);


// button text
const btn_txt = document.getElementById("btn_txt");
// button id
const btn = document.getElementById("fav");

// to manage localstorage id to retrive
function localStorageErrorHandle() {
    try {
        // Code that may throw an exception
        console.log("here");
        m = JSON.parse(localStorage.getItem("id"));
        console.log("1nd", m.mealId);
        console.log("1nd", m.meals);
        storedId = m;
        
    } catch (error) {
                //console.log("Error in retrieving data from localStorage");
            console.log(error);
        
    }


}

//set meal details
function setValue(list) {
    //set image
    image.setAttribute("src", list[0].strMealThumb);
    //set title
    title.innerHTML = list[0].strMeal;
    //set category
    category.innerHTML = list[0].strCategory;
    //set area
    area.innerHTML = list[0].strArea;
    //set tag
    tag.innerHTML = list[0].strTags;
    //set instruction
    instruction.innerHTML = list[0].strInstructions;


}


if (mealId.includes(id)) {
    //set button text(available in localstorage)
    btn_txt.textContent = "Remove";
    btn.style.backgroundColor = "red"

}
else {
    //set button text(not available in localstorage)
    btn_txt.textContent = "Add";
    btn.style.backgroundColor = "#66ff66"


}





// to fetch data from api
async function fetchDatabyId() {

    try {
        // fetch data from api
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (response.ok) {
            //data retrieved in json format
            const data = await response.json();
            //console.log(data);

            // list all the meals in the list
            list = data.meals;

            console.log(list[0]);

            // set the data to tags
            setValue(list);


            //url of youtube
            const url = list[0].strYoutube;

            if (url != "") {
                //youtube button
                youtube.addEventListener("click", () => window.open(list[0].strYoutube, "_blank"));

            }
            else {
                // alert if url is not available
                youtube.addEventListener("click", () => alert("video is not available"));

            }
        }

        else {
            //error message occur when problem in retrive data from api
            throw new Error('Something went wrong');
        }

    }
    catch (error) {
        // any error occured 
        console.error(error)
    }

}




//add/remove button
btn.addEventListener("click", () => {
    //to solve retiving data from localstorage
    localStorageErrorHandle();

    if (m.mealId.includes(id)) {
        btn.style.backgroundColor = "#66ff66";
        //change button text
        btn_txt.textContent = "Add";

        // index of id
        const index = mealId.indexOf(id);

        //Update the localStorage (after deletion)
        m.mealId.splice(index, 1);
        m.meals.splice(index, 1);
        localStorage.setItem("id", JSON.stringify(m));

    }
    else {
        //change button text
        btn_txt.textContent = "Remove";

        btn.style.backgroundColor = "red"

        //Update the localStorage (after insertion)
        localStorageErrorHandle();
        m.meals.push(list[0]);
        m.mealId.push(id);
        localStorage.setItem("id", JSON.stringify(m));


    }

});



// function call
fetchDatabyId();



