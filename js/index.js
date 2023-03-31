"use strict";
const items = document.querySelectorAll(".item");
const inputBox = document.getElementById("input-box");
let action = false;
items.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.getAttribute("data-num")) {
            if (inputBox != null) {
                inputBox.innerText += item.getAttribute("data-num");
            }
        }
        else if (item.getAttribute("data-action")) {
            console.log("pass");
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
