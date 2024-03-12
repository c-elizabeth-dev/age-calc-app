const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];

(function populateMonths(){
    for(let i = 0; i < months.length; i++){
        const option = document.createElement('option');
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }
    monthSelect.value = "January";
})();

let previousDay;

function populateDays(month){
    //Delete all of the children of the day dropdown
    //if they do exist
    while(daySelect.firstChild){
        daySelect.removeChild(daySelect.firstChild);
    }
    //Holds the number fo days in the month
    let dayNum;

    let year = yearSelect.value;

    if(month === 'January' || month === 'March' || month === 'May' || month === 'July' || 
    month === 'August' || month === 'October' || month === 'December') {
        dayNum = 31;
    } else if(month === 'April' || month === 'June' ||month === 'September' || 
    month ==='November') {
        dayNum = 30;
    }else{
        //check for a leap year
        if(new Date(year, 1, 29).getMonth() === 1){
            dayNum = 29;
        }else{
            dayNum = 28;
        }
    }
    //Insert the correct days into the day <select>
    for(let i = 1; i <= dayNum; i++){
        const option = document.createElement("option");
        option.textContent = i;
        daySelect.appendChild(option);
    }
    if(previousDay){
        daySelect.value = previousDay;
        if(daySelect.value === ""){
            daySelect.value = previousDay - 1;
        }
        if(daySelect.value === ""){
            daySelect.value = previousDay - 2;
        }
        if(daySelect.value === ""){
            daySelect.value = previousDay - 3;
        }
    }
};

function populateYears(){
    //Get the current year as a number
    let year = new Date().getFullYear();
    //Make the previous 100 years be an option
    for(let i = 0; i <101; i++){
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
};

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function() {
    populateDays(monthSelect.value);
};
monthSelect.onchange = function() {
    populateDays(monthSelect.value);
};
daySelect.onchange = function() {
    previousDay = daySelect.value;
};


//---- this part of code gets the DOB user has input and calculates their age
//------by subtracting the birth date from the current date and then extracting 
//--------the years, months and days from the difference

const button = document.getElementById('svg-arrow');

button.onclick = function calculateAge() {
    let today = new Date();
    let showAge = document.getElementById('output');
    let yearOfBirth = document.getElementById('year').value;
    let monthOfBirth = document.getElementById('month').selectedIndex;
    let dayOfBirth = document.getElementById('day').value;

    let birthDate = new Date(yearOfBirth, monthOfBirth, dayOfBirth);
    let ageInMilliseconds = today - birthDate;

    let years = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    let months = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));

    // Calculate days separately 
    let remainingMilliseconds = ageInMilliseconds % (1000 * 60 * 60 * 24 * 365);
    let days = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));

    // Adjust months and days if they exceed the limits
    if (months >= 12) {
        years++;
        months = 0;
    }
    if (days >= 30.44) {
        months++;
        days = 0;
    }

    showAge.innerHTML = `${years} years<br> ${months} months<br> ${days} days`;
};





