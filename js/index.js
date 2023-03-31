"use strict";
const items = document.querySelectorAll(".item");
const inputBox = document.getElementById("input-box");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
let action = false;
items.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.getAttribute("data-num")) {
            if (inputBox != null) {
                inputBox.innerText += item.getAttribute("data-num");
            }
        }
        else if (item.getAttribute("data-action")) {
            if (inputBox != null) {
                if (!action) {
                    inputBox.innerText += item.getAttribute("data-action");
                    action = true;
                }
                else if (action) {
                    action = false;
                    inputBox.innerText = inputBox.innerText.slice(0, -1);
                }
            }
        }
    });
});
equals === null || equals === void 0 ? void 0 : equals.addEventListener("click", () => {
    if ((inputBox === null || inputBox === void 0 ? void 0 : inputBox.innerText) != '' && inputBox != null) {
        inputBox.innerText = eval(inputBox.innerText);
    }
});
