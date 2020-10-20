CREATE DATABASE IF NOT EXISTS uFinance_Prod;

USE uFinance_Prod;

CREATE TABLE Users (
	email varchar(30) NOT NULL PRIMARY KEY,
    password varchar(30) NOT NULL,
    user_id varchar(30) NOT NULL,
    first_name varchar(30),
    last_name varchar(30),
    date_joined datetime
);

CREATE TABLE Expense_Groups (
	group_id varchar(30) NOT NULL PRIMARY KEY,
    owner_id varchar(30),
    group_name varchar(30)
);

CREATE TABLE Expense_Group_Members (
	group_id varchar(30) NOT NULL,
    member_id varchar(30) NOT NULL,
    PRIMARY KEY (group_id, member_id)
);

CREATE TABLE Group_Expenses (
	group_expense_id INT AUTO_INCREMENT,
	group_id varchar(30) NOT NULL,
    member_id varchar(30) NOT NULL,
    date_entered DATETIME,
    expense_name VARCHAR(30),
    expense_amount DECIMAL(8,2)
)