/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            displayPeople(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            displayPeople(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonDescendants(person, people) {
    let descendants = [];
    let newDescendants = [];
    let personId = person.id;
    let i = 0
    descendants = people.filter(function(el){
        if(el.parents.includes(personId) === true){
            return true;
        }
        else{
            return false;
        }})
    while(i != descendants.length){
        let currentDescendant = descendants[i]
        newDescendants = people.filter(function(el){
            if(el.parents.includes(currentDescendant.id)){
                return true
            }
            else{
                return false
            }})
        descendants = descendants.concat(newDescendants)
        i++
    }
    return descendants
}


function findPersonParents(person, people){
    if(person.parents.length !== 0){
        let parentOne = person.parents[0];
        let parentTwo = person.parents[1];
        let arrayOne = []

        people.map(function(person){
            if(parentOne !== undefined){
                if(person.id === parentOne){
                    arrayOne.push( parentOne);
                }
            }
            if(parentTwo !== undefined){
                if(person.id === parentTwo){
                    arrayOne.push( parentTwo);
                }
            }
        })
        let parents = arrayOne.map(parent => {
            return people.filter(function(person){
                if(person.id === parent){
                    return true;
                }   
            })
        })

        return parents.map(parent => {
            return {
                firstName: parent[0].firstName,
                lastName: parent[0].lastName
            }
        })
    }
}


function findPersonSpouse(person, people){
    let currentSpouse = person.currentSpouse;
    
    let spouse = people.filter(function(person){
        if(person.currentSpouse === currentSpouse){
            return true;
        }
        
    })
    let personId = spouse[0].currentSpouse
    spouse = people.filter(function(person){
        if(person.id === personId){
            return true;
        }
            
    })
    const myspouse = {
        firstName: spouse[0].firstName,
        lastName: spouse[0].lastName
    }
    return myspouse
}

function findPersonSiblings(person, people) {
    if(person.parents.length !== 0){
        let parentOne = person.parents[0];
        let parentTwo = person.parents[1];
        let arrayOne = []
        let personId = person.id

        people.map(function(person){
            if(parentOne !== undefined){
                if(person.id === parentOne){
                    arrayOne.push( parentOne);
                }
            }
            if(parentTwo !== undefined){
                if(person.id === parentTwo){
                    arrayOne.push( parentTwo);
                }
            }
        })
        let siblings = people.filter(function(person){
            if(person.parents.includes(parentOne) === true && person.id !== personId || person.parents.includes(parentTwo) === true && person.id !== personId){
                return true;
            }
            else{
                return false;
            }})
    
            return siblings
        }
    
}

function findPersonFamily(person, people){
    let family = []
    let parents = findPersonParents(person, people);
    if(parents){
        parents.map(parent => {
            family.push(parent)
        })
    }

    let siblings = findPersonSiblings(person, people);
    if(siblings){
        siblings.map(sibling => {
            family.push(sibling)
        })
    }
    family.push( findPersonSpouse(person, people));
    return family

}

function searchByTraits(people){
    let peopleFound
    let userInput = prompt('would you like to search one trait or multiple traits\n enter one or multiple')
    switch (userInput) {
        case "one":
            peopleFound = singleSearch(people)
            return peopleFound;

        case "multiple":
            peopleFound = multipleSearch(people)
            return peopleFound;
        default:
            searchByTraits(people)
    return peopleFound;
    }
}

function singleSearch(people){
    let userInput = prompt('what trait do you want to search?\n traits are gender, dob, height, weight, eye color, and occupation.')
    let result
    switch (userInput) {
        case "gender": 
            result = gender(people)
            return result

        case "dob":
            result = dob(people)
            return result
        
        case "height":
            result = height(people)
            return result

        case "weight":
            result = weight(people)
            return result

        case "eye color": 
            result = eyeColor(people)
            return result

        case "occupation": 
            result = occupation(people)
            return result

        default:
            return singleSearch(people)
}}


function multipleSearch(people){
    let filteredPeople = people
    let userInput
    let i = 0
    while(userInput !== 'yes' && i < 6 && filteredPeople.length >= 2){
        let trait = prompt('select a trait')

        switch (trait) {
            case "gender": 
                filteredPeople = gender(filteredPeople)
                i++
                break;
    
            case "dob":
                filteredPeople = dob(filteredPeople)
                i++
                break;
            
            case "height":
                filteredPeople = height(filteredPeople)
                i++
                break;
    
            case "weight":
                filteredPeople = weight(filteredPeople)
                i++
                break;
    
            case "eye color": 
                filteredPeople = eyeColor(filteredPeople)
                i++
                break;
    
            case "occupation": 
                filteredPeople = occupation(filteredPeople)
                i++
                break;

            default:
                break;
        }  
        if (filteredPeople.lenth === 0){
            return filteredPeople;
        }
        else if (filteredPeople.length >= 2){
            userInput = prompt('is the first person who you are searching for?')
        }
    }
    return filteredPeople
}

function gender(people)
    {let gender = prompt('what is their gender')
    let foundPeople = people.filter(function (person) {
        if (person.gender === gender) {
            return true;
        }
    });
    if (foundPeople.length === 0){
        alert('no result found.')
        return foundPeople;
    }
    displayPeople(foundPeople);
    return foundPeople;}

function dob(people)
    {let dob = prompt('what is their dob')
    let foundPeople = people.filter(function (person) {
        if (person.dob === dob) {
            return true;
        }
    });
    if (foundPeople.length === 0){
        alert('no result found.')
        return foundPeople;
    }
    displayPeople(foundPeople);
    return foundPeople;}

function height(people)
    {let height = prompt('what is their height')
    let foundPeople = people.filter(function (person) {
        if (person.height == height) {
            return true;
        }
    });
    if (foundPeople.length === 0){
        alert('no result found.')
        return foundPeople;
    }
    displayPeople(foundPeople);
    return foundPeople;}

function weight(people){
    let weight = prompt('what is their weight')
    let foundPeople = people.filter(function (person) {
        if (person.weight == weight) {
            return true;
        }
    });
    if (foundPeople.length === 0){
        alert('no result found.')
        return foundPeople;
    }
    displayPeople(foundPeople);
    return foundPeople;}

function eyeColor(people){
    let eyeColor = prompt('what is their eye color')
    let foundPeople = people.filter(function (person) {
        if (person.eyeColor === eyeColor) {
            return true;
        }
    });
    if (foundPeople.length === 0){
        alert('no result found.')
        return foundPeople;
    }
    displayPeople(foundPeople);
    return foundPeople;}

function occupation(people){
    let occupation = prompt('what is their occupation')
    let foundPeople = people.filter(function (person) {
        if (person.occupation === occupation) {
            return true;
        }
    });
    if (foundPeople.length === 0){
        alert('no result found.')
        return foundPeople;
    }
    displayPeople(foundPeople);
    return foundPeople;}






