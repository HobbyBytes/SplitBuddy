-- Insert Users
INSERT INTO "User" (UserID, Name, Email, Phone) VALUES
(1, 'Alice Smith', 'alice@email.com', '123-456-7890'),
(2, 'Bob Johnson', 'bob@email.com', '234-567-8901'),
(3, 'Charlie Brown', 'charlie@email.com', '345-678-9012'),
(4, 'David Wright', 'david@email.com', '456-789-0123'),
(5, 'Eva Green', 'eva@email.com', '567-890-1234');

-- Create Groups
INSERT INTO "Group" (GroupID, Name, Description, CreationDate, CreatedByUserID) VALUES
(1, 'Vacation Squad', 'Group for our summer vacation', '2024-07-23', 1),
(2, 'Office Team', 'Expenses for office team outings', '2024-07-20', 2);

-- Add Users to Groups
INSERT INTO UserGroup (UserID, GroupID) VALUES
(1, 1), (2, 1), (3, 1), -- Vacation Squad
(1, 2), (2, 2), (3, 2), (4, 2), (5, 2); -- Office Team

-- Create Expenses
INSERT INTO Expense (ExpenseID, Description, Amount, Date, Currency, GroupID, CreatedByUserID) VALUES
(1, 'Hotel Booking', 600.00, '2024-08-01', 'USD', 1, 1),
(2, 'Dinner', 150.00, '2024-08-02', 'USD', 1, 2),
(3, 'Taxi Fare', 50.00, '2024-08-03', 'USD', 1, 3),
(4, 'Lunch', 75.00, '2024-08-02', 'USD', 2, 2),
(5, 'Office Supplies', 200.00, '2024-08-05', 'USD', 2, 4);

-- Split Expenses
INSERT INTO ExpenseSplit (ExpenseSplitID, ExpenseID, UserID, SplitAmount) VALUES
(1, 1, 1, 200.00), (2, 1, 2, 200.00), (3, 1, 3, 200.00), -- Hotel Booking
(4, 2, 1, 50.00), (5, 2, 2, 50.00), (6, 2, 3, 50.00), -- Dinner
(7, 3, 1, 25.00), (8, 3, 3, 25.00), -- Taxi Fare
(9, 4, 1, 25.00), (10, 4, 2, 25.00), (11, 4, 3, 25.00), (12, 4, 5, 25.00), -- Lunch
(13, 5, 2, 100.00), (14, 5, 4, 100.00); -- Office Supplies

-- Create Settlements
INSERT INTO Settlement (SettlementID, Description, Amount, Date, Currency, GroupID, PayerID, ReceiverID) VALUES
(1, 'Bob pays Alice', 200.00, '2024-08-05', 'USD', 1, 2, 1),
(2, 'David pays Bob', 50.00, '2024-08-06', 'USD', 2, 4, 2),
(3, 'Eva pays Charlie', 25.00, '2024-08-07', 'USD', 2, 5, 3);
