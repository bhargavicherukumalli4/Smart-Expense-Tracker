// Store transactions
let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


// Get HTML elements
const form = document.getElementById("transactionForm");

const incomeElement =
    document.getElementById("income");

const expenseElement =
    document.getElementById("expense");

const balanceElement =
    document.getElementById("balance");

const transactionList =
    document.getElementById("transactionList");


// Add Transaction
form.addEventListener("submit", function(event) {

    event.preventDefault();


    const type =
        document.getElementById("type").value;

    const amount =
        Number(document.getElementById("amount").value);

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("date").value;

    const description =
        document.getElementById("description").value;


    // Create transaction object
    const transaction = {

        id: Date.now(),

        type: type,

        amount: amount,

        category: category,

        date: date,

        description: description

    };


    // Add transaction to array
    transactions.push(transaction);


    // Save data
    saveTransactions();


    // Update screen
    displayTransactions();

    calculateSummary();


    // Clear form
    form.reset();

});


// Save transactions to LocalStorage
function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// Display Transactions
function displayTransactions() {

    transactionList.innerHTML = "";


    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <tr>
                <td colspan="6">
                    No transactions available
                </td>
            </tr>
        `;

        return;
    }


    transactions.forEach(function(transaction) {

        const row =
            document.createElement("tr");


        const typeClass =
            transaction.type === "income"
            ? "income-text"
            : "expense-text";


        row.innerHTML = `

            <td class="${typeClass}">
                ${transaction.type.toUpperCase()}
            </td>

            <td>
                ₹${transaction.amount.toFixed(2)}
            </td>

            <td>
                ${transaction.category}
            </td>

            <td>
                ${transaction.date}
            </td>

            <td>
                ${transaction.description || "-"}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">

                    Delete

                </button>

            </td>

        `;


        transactionList.appendChild(row);

    });

}


// Calculate Summary
function calculateSummary() {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            totalIncome += transaction.amount;

        }
        else {

            totalExpense += transaction.amount;

        }

    });


    const balance =
        totalIncome - totalExpense;


    // Display values
    incomeElement.textContent =
        totalIncome.toFixed(2);

    expenseElement.textContent =
        totalExpense.toFixed(2);

    balanceElement.textContent =
        balance.toFixed(2);

}


// Delete Transaction
function deleteTransaction(id) {

    transactions =
        transactions.filter(function(transaction) {

            return transaction.id !== id;

        });


    saveTransactions();

    displayTransactions();

    calculateSummary();

}


// Display saved data when page loads
displayTransactions();

calculateSummary();