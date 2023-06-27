const emptydiv = document.getElementById("emptydiv");

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


}

function localStorageErrorHandle() {
    try {
        // Code that may throw an exception

        m = JSON.parse(localStorage.getItem("id"));

        if(m.mealId.length <1) {
            emptydiv.style.display = "block";
        }
        else{

            dataIteration(m.meals);
        }

    } catch (error) {
        console.log("Error in retrieving data from localStorage",error);
    }


}


//create the favourites meals list(DOM)
function dataIteration(list) {

    for (let i = 0; i < list.length; i++) {

        //Create tag element
        const card = document.createElement('div');
        const card_image = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('p');
        const button = document.createElement('button');

        //set values
        card.setAttribute("id", `card_${i}`);
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

        //set attributes
        button.innerHTML = "Remove";
        button.style.backgroundColor = "red";
        button.style.color = "white";
        card.style.backgroundColor = "#F97B22";
        title.style.color = "white";

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
            //deletion of meal from the list
            m.mealId.splice(m.mealId.indexOf(id), 1);
            m.meals.splice(m.meals.indexOf(list[i]), 1);

            //show the empty text field
            if(m.mealId.length ==0){
                emptydiv.style.display = "block";
            }
        
            //update the localstorage
            localStorage.setItem("id", JSON.stringify(m));

            //to remove the child
            const cardID = document.getElementById(`card_${i}`);
            cardID.remove();
        });


    }
}

localStorageErrorHandle();













