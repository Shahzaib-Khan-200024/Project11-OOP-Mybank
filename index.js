#!/usr/bin/env node
import inquirer from "inquirer";
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Withdraw method / Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of ${amount} successful. Remaining balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
    }
    // Deposit method / Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charge if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of ${amount} successful. Remaining balance: ${this.balance}`);
    }
    // Check Balance method
    checkBalance() {
        console.log(`Current balance: ${this.balance}`);
    }
}
// Customer class
class Customer {
    FirstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(FirstName, lastName, gender, age, mobileNumber, account) {
        this.FirstName = FirstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
// Create customers
const customers = [
    new Customer("Hamza", "Khan", "Male", 35, 316222334, accounts[0]),
    new Customer("Bilal", "Khan", "Male", 28, 333222334, accounts[1]),
    new Customer("Shahrukh", "Khan", "Male", 39, 341222334, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number: "
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.FirstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "Select",
                    type: "list",
                    message: "Select an Operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.Select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount you want to deposit: "
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw: "
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our services!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
