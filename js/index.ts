type calculationHistory = {
	equation: string;
};
const calculationHistory: calculationHistory[] = [];
const historyListElement = document.getElementById("history-list");

const inputBox = document.getElementById("input-box");

const items = document.querySelectorAll(".item");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

let action: boolean = false;
let lastAction: string | null = "";

//	This piece of code loops through every item such as actions and numbers except equals and clear
items.forEach((item) => {
	//	The click event listener is being added on every given item
	item.addEventListener("click", () => {
		//	If the number value exists in dataset and the input box isn't null
		if (item.getAttribute("data-num") && inputBox != null) {
			// The number from dataset gets added to the input box value
			inputBox.innerText += item.getAttribute("data-num");

			// 	Now we check if we can access action value in dataset and also that the input box isn't null
		} else if (item.getAttribute("data-action") && inputBox != null) {
			let actionValue = item.getAttribute("data-action");
			if (!action && inputBox.innerText != "") {
				inputBox.innerText += actionValue;
				action = true;
				lastAction = actionValue;
			} else if (action && actionValue != null) {
				if (lastAction != actionValue) {
					console.log(
						`Last Action: ${lastAction} CurrentAction: ${actionValue}`
					);
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
		calculationHistory.push({ equation: equation });

		const calculationHistoryItem = CreateCalculationListItem(equation);
		historyListElement?.append(calculationHistoryItem);
		action = false;
		// 	This action=false makes it so we can continue addition, multiplication, division etc after clicking on equals
	}
});

clear?.addEventListener("click", () => {
	if (inputBox != null) inputBox.innerText = "";
	action = false;
});

function CreateCalculationListItem(equation: string) {
	const listElement = document.createElement("li");
	listElement.classList.add("history-item");
	const equationElement = document.createElement("h4");
	equationElement.classList.add("equation");
	equationElement.innerText = equation;

	listElement.appendChild(equationElement);
	return listElement;
}
