/*

    TO-DO :
        1. don't re-call addToList()? because it make not put the name deleted at the end of the list
*/

let displayUserData = ( dataSent ) => {


    const users = Object.keys(dataSent);
    console.log(users.length);
    let cards = ``;
    let cardsDiv = document.getElementById("cards");

    if( users.length > 0 ){

        for( let x = 0; x < users.length; x+=1 ){

            cards += `
                      <div class="profile" data-id=${dataSent[x]._id}>
                          <img class="profile-image" src="${dataSent[x].imageFile}" alt=${dataSent[x].name}>
                          <div class="profile-name" >${dataSent[x].name}</div>
                          <div class="profile-title" >CEO of ${dataSent[x].company.bs}</div>
                          <div class="profile-detail" >
                          
                            <div class="profile-detail-address" > <i class="fas fa-map-marker-alt"></i> Currently residing at ${dataSent[x].address.street}, ${dataSent[x].address.suite} ${dataSent[x].address.city}, ${dataSent[x].address.zipcode}</div>
                          
                            <div class="profile-detail-contact" >
                                
                                <div class="profile-detail-contact-email"> <i class="fas fa-envelope"></i> <a href="mailto:${dataSent[x].email}">${dataSent[x].email}</a> </div>
                                <div class="profile-detail-contact-phone"> <i class="fas fa-phone-alt"></i> <a>${dataSent[x].phone}</a> </div>
                                <div class="profile-detail-contact-website"> <i class="fas fa-link"></i> <a href="${dataSent[x].website}" >${dataSent[x].website}</a> </div>
                            
                            </div>
                          </div>
                          <div class="profile-delete"><button onclick="deleteUserCard(this)" class="profile-delete-button" >Delete</button></div>
                      </div>
                      
                `
        }

    }

    cardsDiv.innerHTML = cards;

}


// ADDS USERS TO THE DROPDOWN LIST
let displayUsersInList = async () => {


    let users;
    let getUsers = await getAllJSONUsers().then( result => { users = result } );
    let ulElement = document.getElementById("users-list");
    let listElements = ``;

    let getNames = document.getElementsByClassName("profile-name");

    let hasCard = false;
    for( let x = 0; x < users.length; x+=1 ){

        for( let y = 0; y < getNames.length; y+=1 ){

            if( users[x].name === getNames[y].innerHTML ){ // if it has a card

                hasCard = true;
                break;

            }
        }

        if( !hasCard ){  // if it does no have a card, add it, along with its value so we can fetch that person when clicked

            listElements += `<li onclick="addFromList(this)" value="${users[x].id}">${users[x].name}</li>`
        }

        hasCard = false;
    }

    ulElement.innerHTML = listElements;
}


// ADD TO SCREEN, DELETE FROM DROPDOWN
let addFromList = async (element) => {


    await getJSONUser(element.getAttribute("value")); // gets that user to isplay on the screen

    element.remove(); // remove it from the dropdown

}


// DELETES THE CARD
let deleteUserCard = async (element) =>{

    element.parentElement.parentElement.remove(); // removes it as a card
    let idOfUser = element.parentElement.parentElement.getAttribute("data-id");

    try{

        await deleteUserInfo(idOfUser);

    }catch(e){

        console.log(e);
    }

    await displayUsersInList();// re-displays that user in the list
}



// SEARCH FUNCTIONALITY
let search = (element) => {

    let input = element.value.toLowerCase();

    let getNames = document.getElementsByClassName("profile-name");
    let getEmail = document.getElementsByClassName("profile-detail-contact-email");


    for( let x = 0; x < getNames.length; x+=1 ){

        let doesContain = getNames[x].innerHTML.toLowerCase().includes(input) || getEmail[x].innerHTML.toLowerCase().includes(input);
        getNames[x].parentElement.classList.toggle("hide", !doesContain ); // hide he ones that it does not contain

    }
}
