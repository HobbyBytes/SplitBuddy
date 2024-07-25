-- User table
CREATE TABLE "User" (
    UserID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Phone VARCHAR(20)
);

-- Group table
CREATE TABLE "Group" (
    GroupID INT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    CreationDate DATE,
    CreatedByUserID INT,
    FOREIGN KEY (CreatedByUserID) REFERENCES "User"(UserID)
);

-- Expense table
CREATE TABLE Expense (
    ExpenseID INT PRIMARY KEY,
    Description TEXT,
    Amount FLOAT,
    Date DATE,
    Currency VARCHAR(10),
    GroupID INT,
    CreatedByUserID INT,
    FOREIGN KEY (GroupID) REFERENCES "Group"(GroupID),
    FOREIGN KEY (CreatedByUserID) REFERENCES "User"(UserID)
);

-- Settlement table
CREATE TABLE Settlement (
    SettlementID INT PRIMARY KEY,
    Description TEXT,
    Amount FLOAT,
    Date DATE,
    Currency VARCHAR(10),
    GroupID INT,
    PayerID INT,
    ReceiverID INT,
    FOREIGN KEY (GroupID) REFERENCES "Group"(GroupID),
    FOREIGN KEY (PayerID) REFERENCES "User"(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES "User"(UserID)
);

-- ExpenseSplit table
CREATE TABLE ExpenseSplit (
    ExpenseSplitID INT PRIMARY KEY,
    ExpenseID INT,
    UserID INT,
    SplitAmount FLOAT,
    FOREIGN KEY (ExpenseID) REFERENCES Expense(ExpenseID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- ExpenseShare table
CREATE TABLE ExpenseShare (
    ExpenseShareID INT PRIMARY KEY,
    ExpenseID INT,
    UserID INT,
    ShareAmount FLOAT,
    ShareStatus VARCHAR(20),
    FOREIGN KEY (ExpenseID) REFERENCES Expense(ExpenseID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- UserGroup table for User-Group relationship
CREATE TABLE UserGroup (
    UserID INT,
    GroupID INT,
    PRIMARY KEY (UserID, GroupID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID),
    FOREIGN KEY (GroupID) REFERENCES "Group"(GroupID)
);
