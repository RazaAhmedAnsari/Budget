var budgetInput = document.getElementById('budget-Input');
var setBudgetButton = document.getElementById("update-budget-button");
var totalBudgetId = document.getElementById('total-budget');
var balanceId = document.getElementById('balance');
var message = document.getElementById("alert");
var totalBudget = 0;
var balanceAmt = 0;

function setBudget() {
  var budgetAmount = +budgetInput.value;
  if (isNaN(budgetAmount) || budgetAmount <= 0) {
    message.innerHTML = "Please enter a valid budget amount.";
    message.style.color = "#D32F2F";
    console.log(message);
    return;
  } else if (budgetAmount === 0) {
  } else {
    message.innerHTML = "";
    message.style.color = "";
  }
  totalBudget += budgetAmount;
  totalBudgetId.textContent = totalBudget;
  balanceAmt = totalBudget - totalExpense;
  balanceId.textContent = balanceAmt;

  budgetInput.value = "";
}

function removeNegativeInput() {
  if (budgetInput.value < 0) {
    budgetInput.value = -budgetInput.value;
  }
}

setBudgetButton.addEventListener('click', setBudget);
budgetInput.addEventListener('input', removeNegativeInput);

var AllTransactionAmount = document.getElementById("All-Transaction-Amount");
var noOfTransaction = document.getElementById("No-OF-transactions");
var expenseList = document.getElementById("expense-list");
var expenseDescription = document.getElementById("expense-description");
var expenseDate = document.getElementById("expense-date");
var expenseAmount = document.getElementById("expense-amount");
var expenseBtn = document.getElementById("expense-btn");
var transactionList = document.getElementById("transaction-list");
var expenseTotal = document.getElementById("expense");
var transactions = [];
var totalExpense = 0;

function displayTransaction() {


  var expType = expenseList.value;
  var expDep = expenseDescription.value;
  var expDate = expenseDate.value;
  var expAmt = +(expenseAmount.value);

  var transaction = {
    type: expType,
    description: expDep,
    date: expDate,
    amount: expAmt
  };

  transactions.push(transaction);

  var transactionDiv = document.createElement("div");
  transactionDiv.classList.add("transaction");
  transactionDiv.style.display = "flex";
  transactionDiv.style.justifyContent = "space-around";
  transactionDiv.style.backgroundColor = "#8b8c81";
  transactionDiv.style.lineHeight = "0.3";
  transactionDiv.style.alignItems = "center";
  transactionDiv.style.borderRadius = "5px";
  transactionDiv.style.color = "#fff";
  transactionDiv.style.fontWeight = "bold";
  transactionDiv.style.fontSize = "17px";

  var typeDiv = document.createElement("div");
  typeDiv.innerHTML = "<h4>Type:</h4><br>" + transaction.type;
  typeDiv.style.flex = "2";
  typeDiv.style.textAlign = "center";
  transactionDiv.appendChild(typeDiv);

  var descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = "<h4>Description:</h4><br>" + transaction.description;
  descriptionDiv.style.flex = "2";
  descriptionDiv.style.textAlign = "center";
  transactionDiv.appendChild(descriptionDiv);

  var dateDiv = document.createElement("div");
  var transactionDate = new Date(transaction.date);
  var dateFormate = transactionDate.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  dateDiv.innerHTML = "<h4>Date:</h4><br>" + dateFormate;
  dateDiv.style.flex = "2";
  dateDiv.style.textAlign = "center";
  transactionDiv.appendChild(dateDiv);

  var expDiv = document.createElement("div");
  expDiv.innerHTML = "<h4>Amount:</h4><br>" + transaction.amount;
  expDiv.style.flex = "2";
  expDiv.style.textAlign = "center";
  transactionDiv.appendChild(expDiv);

  // edit button
  var editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square");
  editButton.style.backgroundColor = "transparent";
  editButton.style.border = "none";
  editButton.style.fontSize = "1.3em";
  editButton.style.flex = "0.5";
  editButton.style.textalign = "center";

  editButton.addEventListener("mouseover", function () {
    editButton.style.fontSize = "1.5em";
  });

  editButton.addEventListener("mouseout", function () {
    editButton.style.fontSize = "1.3em";
  });

  editButton.addEventListener("click", function () {
    typeDiv.innerHTML = "";

    var editExpenseList = document.createElement("select");
    for (var i = 0; i < expenseList.options.length; i++) {
      var option = document.createElement("option");
      option.value = expenseList.options[i].value;
      option.text = expenseList.options[i].text;
      editExpenseList.appendChild(option);
    }
    editExpenseList.value = transaction.type;

    var typeList = document.createElement("h4");
    typeList.appendChild(document.createTextNode("Type:"));

    typeDiv.appendChild(typeList);
    typeDiv.appendChild(document.createElement("br"));
    typeDiv.appendChild(editExpenseList);

    var editExpenseDescription = document.createElement("input");
    editExpenseDescription.value = transaction.description;
    editExpenseDescription.placeholder = "Write Expense Description";

    var descriptionHeading = document.createElement("h4");
    descriptionHeading.appendChild(document.createTextNode("Description:"));

    descriptionDiv.innerHTML = "";
    descriptionDiv.appendChild(descriptionHeading);
    descriptionDiv.appendChild(document.createElement("br"));
    descriptionDiv.appendChild(editExpenseDescription);

    var editExpenseDate = document.createElement("input");
    editExpenseDate.value = transaction.date;
    editExpenseDate.type = "date";

    var dateHeading = document.createElement("h4");
    dateHeading.appendChild(document.createTextNode("Date:"));

    dateDiv.innerHTML = "";
    dateDiv.appendChild(dateHeading);
    dateDiv.appendChild(document.createElement("br"));
    dateDiv.appendChild(editExpenseDate);

    var editExpenseAmount = document.createElement("input");
    editExpenseAmount.value = transaction.amount;
    editExpenseAmount.placeholder = "Enter expense amount";

    var amountHeading = document.createElement("h4");
    amountHeading.appendChild(document.createTextNode("Amount:"));

    expDiv.innerHTML = "";
    expDiv.appendChild(amountHeading);
    expDiv.appendChild(document.createElement("br"));
    expDiv.appendChild(editExpenseAmount);

    editButton.style.display = "none";

    var saveButton = document.createElement("button");
    saveButton.innerHTML = "<i class='fa-solid fa-save'></i>";
    saveButton.style.backgroundColor = "transparent";
    saveButton.style.border = "none";
    saveButton.style.fontSize = "1.3em";
    saveButton.style.flex = "0.5";
    saveButton.style.textAlign = "center";

    saveButton.addEventListener("mouseover", function () {
      saveButton.style.fontSize = "1.5em";
    });

    saveButton.addEventListener("mouseout", function () {
      saveButton.style.fontSize = "1.3em";
    });

    saveButton.addEventListener("click", function () {
      var previousInputAmount = transaction.amount;
      transaction.type = editExpenseList.value;
      transaction.description = editExpenseDescription.value;
      transaction.date = new Date(editExpenseDate.value).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
      transaction.amount = +editExpenseAmount.value;

      typeDiv.innerHTML = "<h4>Type:</h4><br>" + transaction.type;
      descriptionDiv.innerHTML = "<h4>Description:</h4><br>" + transaction.description;
      dateDiv.innerHTML = "<h4>Date:</h4><br>" + transaction.date;
      expDiv.innerHTML = "<h4>Amount:</h4><br>" + transaction.amount;

      transactionDiv.removeChild(saveButton);
      editButton.style.display = "inline-block";

      totalExpense = totalExpense - previousInputAmount + transaction.amount;
      expenseTotal.textContent = totalExpense;
      AllTransactionAmount.textContent = totalExpense;
      balanceAmt = totalBudget - totalExpense;
      balanceId.textContent = balanceAmt;

      editButton.style.display = "inline-block";
    });

    var editButtonClone = editButton.cloneNode(true);
    editButtonClone.addEventListener("click", function () {
    });

    editButton.parentNode.insertBefore(saveButton, editButton.nextSibling);
    editButton.parentNode.insertBefore(editButtonClone, saveButton.nextSibling);
  });


  // delete button
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can");
  deleteButton.style.flex = "0.5";
  deleteButton.style.textalign = "center";
  deleteButton.style.backgroundColor = "transparent";
  deleteButton.style.border = "none";
  deleteButton.style.fontSize = "1.3em";

  deleteButton.addEventListener("mouseover", function () {
    deleteButton.style.fontSize = "1.5em";
  });

  deleteButton.addEventListener("mouseout", function () {
    deleteButton.style.fontSize = "1.3em";
  });

  deleteButton.addEventListener("click", function () {
    var index = Array.from(transactionList.children).indexOf(transactionDiv);
    transactions.splice(index, 1);
    transactionList.removeChild(transactionDiv);

    totalExpense -= transaction.amount;
    expenseTotal.textContent = totalExpense;
    AllTransactionAmount.textContent = totalExpense;

    var noOfTransactionPrint = transactions.length;
    noOfTransaction.textContent = noOfTransactionPrint;

    balanceAmt = totalBudget - totalExpense;
    balanceId.textContent = balanceAmt;
  });

  transactionDiv.appendChild(editButton);
  transactionDiv.appendChild(deleteButton);
  transactionList.appendChild(transactionDiv);

  totalExpense += expAmt;
  expenseTotal.textContent = totalExpense;
  AllTransactionAmount.textContent = totalExpense;

  var noOfTransactionPrint = transactions.length;
  noOfTransaction.textContent = noOfTransactionPrint;

  balanceAmt = totalBudget - totalExpense;
  balanceId.textContent = balanceAmt;

  expenseList.value = "";
  expenseDescription.value = "";
  expenseDate.value = "";
  expenseAmount.value = "";
}

expenseBtn.addEventListener("click", displayTransaction);
