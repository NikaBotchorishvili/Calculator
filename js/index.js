"use strict";
const historyListElement = document.getElementById("history-list");
const inputBox = document.getElementById("input-box");
const items = document.querySelectorAll(".item");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
let action = false;
let lastAction = "";
if (window.localStorage.getItem("calculationHistory") == null) {
    window.localStorage.setItem("calculationHistory", "");
}
else {
    const calculationHistory = window.localStorage.getItem("calculationHistory");
    if (calculationHistory != null && calculationHistory != "") {
        const calcHistoryArray = calculationHistory.split(" ");
        calcHistoryArray.forEach(element => {
            if (element != "") {
                CreateCalculationListItem(element);
                console.log(element);
            }
        });
    }
}
//	This piece of code loops through every item such as actions and numbers except equals and clear
items.forEach((item) => {
    //	The click event listener is being added on every given item
    item.addEventListener("click", () => {
        //	If the number value exists in dataset and the input box isn't null
        if (item.getAttribute("data-num") && inputBox != null) {
            // The number from dataset gets added to the input box value
            inputBox.innerText += item.getAttribute("data-num");
            // 	Now we check if we can access action value in dataset and also that the input box isn't null
        }
        else if (item.getAttribute("data-action") && inputBox != null) {
            let actionValue = item.getAttribute("data-action");
            if (!action && inputBox.innerText != "") {
                inputBox.innerText += actionValue;
                action = true;
                lastAction = actionValue;
            }
            else if (action && actionValue != null) {
                if (lastAction != actionValue) {
                    inputBox.innerText =
                        inputBox.innerText.slice(0, -1) + actionValue;
                    lastAction = actionValue;
                }
            }
        }
    });
});
equals === null || equals === void 0 ? void 0 : equals.addEventListener("click", () => {
    if ((inputBox === null || inputBox === void 0 ? void 0 : inputBox.innerText) != "" && inputBox != null) {
        let answer = eval(inputBox.innerText);
        let equation = `${inputBox.innerText}=${answer}`;
        inputBox.innerText = answer;
        CreateCalculationListItem(equation);
        const oldCalculationHistory = window.localStorage.getItem("calculationHistory");
        window.localStorage.setItem("calculationHistory", oldCalculationHistory + ' ' + `${equation}`);
        action = false;
        // 	This action=false makes it so we can continue addition, multiplication, division etc after clicking on equals
    }
});
clear === null || clear === void 0 ? void 0 : clear.addEventListener("click", () => {
    if (inputBox != null)
        inputBox.innerText = "";
    action = false;
});
function CreateCalculationListItem(equation) {
    const listElement = document.createElement("li");
    listElement.classList.add("history-item");
    const equationElement = document.createElement("h4");
    equationElement.classList.add("equation");
    equationElement.innerText = equation;
    listElement.appendChild(equationElement);
    historyListElement === null || historyListElement === void 0 ? void 0 : historyListElement.append(listElement);
}
