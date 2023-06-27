// required ids of the tags
const searchbtn = document.getElementById("searchButton");
const searchbox = document.getElementById("searchInput")


const errdiv = document.getElementById("errordiv");
// fetch the posts node from the DOM
const postsContainer = document.querySelector(".cardbox");


if (!navigator.onLine) {
    // console.log("You are connected to the internet.");
    alert("You are connected to the internet")
}

//intialize the localstorage
if (localStorage.length == 0) {

    //l = { id: [] };
    l = { "mealId": [], "meals": [] };
    localStorage.setItem("id", JSON.stringify(l));
    console.log(JSON.parse(localStorage.getItem("id")));

}

//search button
searchbtn.addEventListener("click", () => {

    //fetching data from api
    fetchData();
});

// //enter key to search
searchbox.addEventListener("input", function () {

    //fetching data from api
    fetchData();
    


});



//to handle the local storage
function localStorageErrorHandle() {
    try {
        // Code that may throw an exception

        m = JSON.parse(localStorage.getItem("id"));

    } catch (error) {
        if (error instanceof TypeError) {

            // Code to handle TypeError
            m = JSON.parse(localStorage.getItem("id"));
            m = m.mealId

        } else {
            // Code to handle other types of errors
            console.log("Error in retrieving data from localStorage");
        }
    }

}


// function to fetch data from api
async function fetchData() {
    try {
        //lacalstorage open for add/remove/exist data
        localStorageErrorHandle();

        //search input value
        const find = searchbox.value.trim();
        //console.log(find);

        const list = document.getElementById("parent");
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        // retrieve data from api
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${find}`);
        //console.log(response);
        if (response.ok) {
            // data retrieved in jsonformat
            const data = await response.json();
            //console.log(data);
            const list = data.meals;
            
            //for error if meal not found(display become block)
            errdiv.style.display = "none";

            //list all the child of meals
            dataIteration(list);

        
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {

        //to show the text if there was an error(meals not found)
        errdiv.style.display = "block";

        console.log("sorry match not found");
        //console.error(error);
    }
}

//function to add  searc child of meals
function dataIteration(list) {

    for (let i = 0; i < list.length; i++) {

        //Create tag element
        const card = document.createElement('div');
        const card_image = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('p');
        const button = document.createElement('button');

        //set values
        image.src = list[i].strMealThumb;
        image.setAttribute("id", list[i].idMeal);
        title.innerHTML = list[i].strMeal;

        const id = image.getAttribute("id");
        button.setAttribute("id", id + `_${i}`);

        //add class name
        card.classList.add("card");
        card_image.classList.add("card-image");
        title.classList.add("text-title");
        button.classList.add("card-button");

        // add text according to favourite
        if (m.mealId.includes(id)) {
            button.innerHTML = "Added";
            button.style.backgroundColor = "#F97B22";
            button.style.color = "white";
            card.style.backgroundColor = "#F97B22";
            title.style.color = "white";
        }
        else {

            button.innerHTML = "Add";
            button.style.backgroundColor = "white";
            button.style.color = "black";

        }

        //append child
        card.appendChild(card_image);
        card_image.appendChild(image);
        card.appendChild(title);
        card.appendChild(button);

        //add to main container
        postsContainer.appendChild(card);

        image.addEventListener("click", () => {
            sessionStorage.setItem("id", id);
            window.location.href = "more_details.html";
        });


        //add and remove buttons
        button.addEventListener("click", () => {
            if (m.mealId.includes(id)) {

                button.textContent = "Add";
                button.style.backgroundColor = "white";
                button.style.color = "black";
                card.style.backgroundColor = "rgb(178, 233, 178)";
                title.style.color = "black";

                localStorageErrorHandle()

                m.mealId.splice(m.mealId.indexOf(id), 1);
                m.meals.splice(m.meals.indexOf(list[i]), 1);
                localStorage.setItem("id", JSON.stringify(m));

            }
            else {
                card.style.backgroundColor = "#F97B22";
                title.style.color = "white";

                button.textContent = "Added";
                button.style.backgroundColor = "#F97B22";
                button.style.color = "white";

                localStorageErrorHandle();

                m.meals.push(list[i]);
                m.mealId.push(id);
                localStorage.setItem("id", JSON.stringify(m));

            }
        });


    }


}






