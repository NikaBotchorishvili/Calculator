const historyListElement = document.getElementById("history-list");
const clearHistoryElement = document.querySelector(".clear-history");

const inputBox = document.getElementById("input-box");

const items = document.querySelectorAll(".item");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

let action: boolean = false;
let lastAction: string | null = "";

if (window.localStorage.getItem("calculationHistory") == null) {
	window.localStorage.setItem("calculationHistory", "");
} else {
	const calculationHistory =
		window.localStorage.getItem("calculationHistory");
	if (calculationHistory != null && calculationHistory != "") {
		const calcHistoryArray = calculationHistory.split(" ");
		calcHistoryArray.forEach((element) => {
			if (element != "") {
				CreateCalculationListItem(element);
				console.log(element);
			}
		});
	}
}

items.forEach((item) => {
	item.addEventListener("click", () => {
		if (item.getAttribute("data-num") && inputBox != null) {
			inputBox.innerText += item.getAttribute("data-num");
		} else if (item.getAttribute("data-action") && inputBox != null) {
			let actionValue = item.getAttribute("data-action");
			if (!action && inputBox.innerText != "") {
				inputBox.innerText += actionValue;
				action = true;
				lastAction = actionValue;
			} else if (action && actionValue != null) {
				if (lastAction != actionValue) {
					inputBox.innerText =
						inputBox.innerText.slice(0, -1) + actionValue;
					lastAction = actionValue;
				}
			}
		}
	});
});

equals?.addEventListener("click", () => {
	if (inputBox?.innerText != "" && inputBox != null) {
		let answer = eval(inputBox.innerText);
		let equation: string = `${inputBox.innerText}=${answer}`;
		inputBox.innerText = answer;

		CreateCalculationListItem(equation);

		const oldCalculationHistory =
			window.localStorage.getItem("calculationHistory");
		window.localStorage.setItem(
			"calculationHistory",
			oldCalculationHistory + " " + `${equation}`
		);
		action = false;
		// 	This action=false makes it so we can continue addition, multiplication, division etc after clicking on equals
	}
});

clear?.addEventListener("click", () => {
	if (inputBox != null) inputBox.innerText = "";
	action = false;
});

clearHistoryElement?.addEventListener("click", () => {
	window.localStorage.removeItem("calculationHistory");
	if (historyListElement != null) historyListElement.innerHTML = "";
});

function CreateCalculationListItem(equation: string) {
	const listElement = document.createElement("li");
	listElement.classList.add("history-item");
	const equationElement = document.createElement("h4");
	equationElement.classList.add("equation");
	equationElement.innerText = equation;

	listElement.appendChild(equationElement);
	historyListElement?.append(listElement);
}
