"use strict";
const inputBox = document.getElementById("input-box");
const items = document.querySelectorAll(".item");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
let action = false;
let lastAction = "";
items.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.getAttribute("data-num") && inputBox != null) {
            inputBox.innerText += item.getAttribute("data-num");
        }
        else if (item.getAttribute("data-action") && inputBox != null) {
            let actionValue = item.getAttribute("data-action");
            if (!action) {
                inputBox.innerText += actionValue;
                action = true;
                lastAction = actionValue;
                console.log(inputBox.innerText);
            }
            else if (action && actionValue != null) {
                action = false;
                inputBox.innerText = actionValue.slice(0, -1);
            }
        }
    });
});
equals === null || equals === void 0 ? void 0 : equals.addEventListener("click", () => {
    if ((inputBox === null || inputBox === void 0 ? void 0 : inputBox.innerText) != "" && inputBox != null) {
        inputBox.innerText = eval(inputBox.innerText);
    }
});
clear === null || clear === void 0 ? void 0 : clear.addEventListener("click", () => {
    if (inputBox != null)
        inputBox.innerText = "";
    action = false;
});
