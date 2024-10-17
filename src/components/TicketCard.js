import React from "react";
import "./TicketCard.css";



const getPriorityColor = (priority) => {
  switch (priority) {
    case 4: return "#FF6B6B"; // Urgent
    case 3: return "#FFB74D"; // High
    case 2: return "#4FC3F7"; // Medium
    case 1: return "#81C784"; // Low
    case 0: return "#E0E0E0"; // No priority
    default: return "#E0E0E0";
  }
};



const TicketCard = ({ ticket, users }) => {
  const user = users && Array.isArray(users) ? users.find(u => u.id === ticket.userId) : null;

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3>{ticket.title}</h3>
        {user && (
          <img
            src={`https://i.pravatar.cc/40?u=${user.id}`}  /* Placeholder for user avatars */
            alt={user.name}
            className="user-avatar"
          />
        )}
      </div>
      

      <p style={{ color: getPriorityColor(ticket.priority) }} >Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
      <p>User: {user ? user.name : "Unassigned"}</p>
    </div>
  );
};

export default TicketCard;