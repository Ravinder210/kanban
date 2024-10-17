import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import GroupingOptions from "./components/GroupingOptions";
import "./styles/App.css";  // Your CSS for global styling

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortOrder, setSortOrder] = useState("priority");


  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json();
        setTickets(data.tickets);  // Access the 'tickets' array
        setUsers(data.users);      // Access the 'users' array
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);


  // Handle grouping option change
  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping);
  };

  // Handle sorting option change
  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    localStorage.setItem("sortOrder", newSortOrder);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Kanban Board</h1>
        <GroupingOptions
          onGroupingChange={handleGroupingChange}
          onSortOrderChange={handleSortOrderChange}
          currentGrouping={grouping}
          currentSortOrder={sortOrder}
        />
      </header>
      <main>
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} sortOrder={sortOrder} />
      </main>
    </div>
  );
};

export default App;