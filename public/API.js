const PORT = 5000;


const getAllJSONUsers = async () =>{

    let user = {};
     await fetch(

        `https://jsonplaceholder.typicode.com/users/`,
        {
            headers: { // this made us not get an empty object
                "Content-Type": "application/json"
            },
            method: 'GET',
        }

    ).then(
        resp => resp.json()

    ).then(

        dataSent => { user = dataSent }
    ).catch( e => {
        console.log(e);
    })

    return user;

}

const getJSONUser = async (user) => { // gets the data from JSON PLACE HOLDER'S API

    await fetch(

    `https://jsonplaceholder.typicode.com/users/${user}`,
    {
            headers: { // this made us not get an empty object
                "Content-Type": "application/json"
            },
            method: 'GET',
        }

    ).then(
        resp => resp.json()

    ).then(
        dataSent => { postUserInfo( dataSent) }
    ).catch( e => {
        console.log(e);
    })
}

const getUserInfo = async () => { // RETURN IT TO US FROM THE DATABASE WE SAVE IT TO

    await fetch(

        `http://localhost:${PORT}/`,
        {
            method : 'GET'
        }

    ).then(

        resp => resp.json()

    ).then(

        dataSent => { displayUsersInList(); displayUserData(dataSent); }  // AFTER FETCHING FROM DB, LET DISPLAY IT UNTO OUR BROWSER

    ).catch( (e)=>{

        console.log(e);
    } )
}

const postUserInfo = async (user) => { // POST IT TO THE DATABASE

    await fetch(

        `http://localhost:${PORT}/postuser`,
        {

            headers: { // this made us not get an empty object
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify( user ),

        }

    ).then(

        resp => resp.json()

    ).then(

        () => { getUserInfo() }

    ).catch( (e)=>{

        console.log(e);
    } )

    console.log('made post')
}

const deleteUserInfo = async (id) => {

    await fetch(

    `http://localhost:${PORT}/${id}`,
        {
            method: 'DELETE',
        }


    ).then(

        resp => resp.json()

    ).then(

        dataSent => { console.log(dataSent);  }

    ).catch( (e)=>{

        console.log(e);
    } )
}



getUserInfo();
