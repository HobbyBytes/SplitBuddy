--Get expenses created by a specific user across all groups:
FROM Expense e
JOIN "Group" g ON e.GroupID = g.GroupID
WHERE e.CreatedByUserID = 1
ORDER BY e.Date DESC;

--Get all members of a specific group:
SELECT u.UserID, u.Name, u.Email
FROM "User" u
JOIN UserGroup ug ON u.UserID = ug.UserID
WHERE ug.GroupID = 1;

-- Get a summary of settlements for each user in a specific group:
SELECT 
    u.UserID, 
    u.Name,
    SUM(CASE WHEN s.PayerID = u.UserID THEN s.Amount ELSE 0 END) AS TotalPaid,
    SUM(CASE WHEN s.ReceiverID = u.UserID THEN s.Amount ELSE 0 END) AS TotalReceived
FROM "User" u
JOIN UserGroup ug ON u.UserID = ug.UserID
LEFT JOIN Settlement s ON (u.UserID = s.PayerID OR u.UserID = s.ReceiverID) AND s.GroupID = ug.GroupID
WHERE ug.GroupID = 1
GROUP BY u.UserID, u.Name
ORDER BY u.Name;

--Get the total expenses for each month in a specific group:
SELECT 
    DATE_TRUNC('month', e.Date) AS Month,
    SUM(e.Amount) AS TotalExpenses
FROM Expense e
WHERE e.GroupID = 1
GROUP BY DATE_TRUNC('month', e.Date)
ORDER BY Month;

--Find out who owes whom in a group:
WITH UserExpenses AS (
    SELECT e.GroupID, es.UserID, SUM(es.SplitAmount) AS TotalSpent
    FROM ExpenseSplit es
    JOIN Expense e ON es.ExpenseID = e.ExpenseID
    WHERE e.GroupID = 1
    GROUP BY e.GroupID, es.UserID
),
GroupTotal AS (
    SELECT GroupID, SUM(TotalSpent) AS GroupTotal, COUNT(UserID) AS MemberCount
    FROM UserExpenses
    GROUP BY GroupID
)
SELECT 
    u1.Name AS Debtor,
    u2.Name AS Creditor,
    ROUND(CAST(ue1.TotalSpent - (gt.GroupTotal / gt.MemberCount) AS numeric), 2) AS AmountOwed
FROM UserExpenses ue1
CROSS JOIN UserExpenses ue2
JOIN GroupTotal gt ON ue1.GroupID = gt.GroupID
JOIN "User" u1 ON ue1.UserID = u1.UserID
JOIN "User" u2 ON ue2.UserID = u2.UserID
WHERE ue1.GroupID = ue2.GroupID
  AND ue1.UserID < ue2.UserID
  AND ue1.TotalSpent < ue2.TotalSpent;

-- Calculate total amount paid and owed by each user in all groups
WITH user_expenses AS (
    SELECT es.UserID, SUM(es.SplitAmount) AS TotalOwed
    FROM ExpenseSplit es
    JOIN Expense e ON es.ExpenseID = e.ExpenseID
    GROUP BY es.UserID
),
user_payments AS (
    SELECT e.CreatedByUserID AS UserID, SUM(e.Amount) AS TotalPaid
    FROM Expense e
    GROUP BY e.CreatedByUserID
),
user_settlements AS (
    SELECT s.PayerID AS UserID, SUM(s.Amount) AS PaidAmount
    FROM Settlement s
    GROUP BY s.PayerID
    UNION ALL
    SELECT s.ReceiverID AS UserID, -SUM(s.Amount) AS PaidAmount
    FROM Settlement s
    GROUP BY s.ReceiverID
)
SELECT u.Name,
       COALESCE(up.TotalPaid, 0) AS TotalPaid,
       COALESCE(ue.TotalOwed, 0) AS TotalOwed,
       COALESCE(us.PaidAmount, 0) AS SettlementNet
FROM "User" u
LEFT JOIN user_expenses ue ON u.UserID = ue.UserID
LEFT JOIN user_payments up ON u.UserID = up.UserID
LEFT JOIN user_settlements us ON u.UserID = us.UserID;

-- Get all users and their balances in a specific group
WITH user_expenses AS (
    SELECT e.GroupID, es.UserID, SUM(es.SplitAmount) AS OwedAmount
    FROM ExpenseSplit es
    JOIN Expense e ON es.ExpenseID = e.ExpenseID
    WHERE e.GroupID = 2
    GROUP BY e.GroupID, es.UserID
),
user_payments AS (
    SELECT e.GroupID, e.CreatedByUserID AS UserID, SUM(e.Amount) AS PaidAmount
    FROM Expense e
    WHERE e.GroupID = 2
    GROUP BY e.GroupID, e.CreatedByUserID
),
user_settlements AS (
    SELECT s.GroupID, s.PayerID AS UserID, SUM(s.Amount) AS PaidAmount
    FROM Settlement s
    WHERE s.GroupID = 2
    GROUP BY s.GroupID, s.PayerID
    UNION ALL
    SELECT s.GroupID, s.ReceiverID AS UserID, -SUM(s.Amount) AS PaidAmount
    FROM Settlement s
    WHERE s.GroupID = 2
    GROUP BY s.GroupID, s.ReceiverID
)
SELECT u.Name,
       COALESCE(up.PaidAmount, 0) - COALESCE(ue.OwedAmount, 0) + COALESCE(us.PaidAmount, 0) AS Balance
FROM "User" u
JOIN UserGroup ug ON u.UserID = ug.UserID
LEFT JOIN user_expenses ue ON u.UserID = ue.UserID
LEFT JOIN user_payments up ON u.UserID = up.UserID
LEFT JOIN user_settlements us ON u.UserID = us.UserID
WHERE ug.GroupID = 2;

--Find the users who haven't participated any expenses in a group
SELECT u.UserID, u.Name
FROM "User" u
JOIN UserGroup ug ON u.UserID = ug.UserID
LEFT JOIN ExpenseSplit es ON u.UserID = es.UserID
LEFT JOIN Expense e ON es.ExpenseID = e.ExpenseID AND e.GroupID = ug.GroupID
WHERE ug.GroupID = 1
  AND e.ExpenseID IS NULL;

