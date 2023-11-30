let peopleData = [];
fetch('https://randomuser.me/api?results=20')
    .then(response => response.json())
    .then(data => {
        peopleData = data.results
        displayPeople(peopleData)
    });
function displayPeople(people) {
    let container = document.getElementById('people-container')
    container.innerHTML = ''

    if (people.length === 0) {
        document.getElementById('notFoundMessage').innerText = 'Name not found.'
    } else {
        document.getElementById('notFoundMessage').innerText = ''
        people.forEach(person => {
            let personDiv = document.createElement('div')
            personDiv.textContent = `${person.name.first} ${person.name.last}`
            container.appendChild(personDiv)
        });
    }
}
function filterNames() {
    let searchInput = document.getElementById('searchInput')
    let searchTerm = searchInput.value.toLowerCase()
    if (searchTerm === '') {
        displayPeople(peopleData);
    } else {
        let filteredPeople = peopleData.filter(person =>
            person.name.first.toLowerCase().includes(searchTerm)
        );
        displayPeople(filteredPeople)
    }
}
let filtbtn = document.getElementById('searchInput').addEventListener('input', filterNames)

function toggleSort() {
    let sortedPeople = peopleData.slice().sort((a, b) =>
    a.name.first.localeCompare(b.name.first)
    )
    
    peopleData = peopleData === sortedPeople ? sortedPeople.reverse() : sortedPeople
    displayPeople(peopleData)
}
let srtbtn = document.querySelector('[data-btn]').addEventListener('click',toggleSort)