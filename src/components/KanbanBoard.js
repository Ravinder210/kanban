import React from "react";
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";

// Import SVGs for statuses
import todoIcon from '../assets/icons/To-do.svg';
import inProgressIcon from '../assets/icons/in-progress.svg';
import doneIcon from '../assets/icons/Done.svg';          // Done status icon
import backlogIcon from '../assets/icons/Backlog.svg';
import canceledIcon from '../assets/icons/Cancelled.svg';  // Canceled status icon

// Import SVGs for priorities
import lowPriorityIcon from '../assets/icons/Img - Low Priority.svg';
import mediumPriorityIcon from '../assets/icons/Img - Medium Priority.svg';
import highPriorityIcon from '../assets/icons/Img - High Priority.svg';
import urgentPriorityIcon from '../assets/icons/SVG - Urgent Priority colour.svg';
import noPriorityIcon from '../assets/icons/No-priority.svg';

// Import SVGs for buttons (Add Task, Three Dots)
import addTaskIcon from '../assets/icons/add.svg';
import threeDotsIcon from '../assets/icons/3 dot menu.svg';

// Helper function to group tickets by the selected key (status, priority, user, etc.)
const groupBy = (tickets = [], key, users) => {
  if (!Array.isArray(tickets)) {
    console.error("Expected an array but got:", tickets);
    return {};
  }

  // Group by priority, mapping numerical priorities to readable labels
  if (key === "priority") {
    const priorityLabels = {
      0: "No priority",
      1: "Low",
      2: "Medium",
      3: "High",
      4: "Urgent"
    };

    return tickets.reduce((result, ticket) => {
      const groupKey = priorityLabels[ticket.priority] || "No priority";
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(ticket);
      return result;
    }, {});
  }

  // Group by user, mapping userId to user's name
  if (key === "user") {
    return tickets.reduce((result, ticket) => {
      const user = users.find((u) => u.id === ticket.userId);
      const groupKey = user ? user.name : "Unassigned"; // Default to "Unassigned" if no user
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(ticket);
      return result;
    }, {});
  }

  // For other groupings (status, etc.)
  return tickets.reduce((result, ticket) => {
    const groupKey = ticket[key] || "Unassigned"; // Fallback for missing group
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(ticket);
    return result;
  }, {});
};

// Function to sort tickets based on the selected sort order
const sortTickets = (tickets, sortOrder) => {
  if (sortOrder === "priority") {
    // Sort by priority (higher priority first)
    return [...tickets].sort((a, b) => b.priority - a.priority);
  } else if (sortOrder === "title") {
    // Sort by title alphabetically
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets; // Default: no sorting
};


const KanbanBoard = ({ tickets, users, grouping, sortOrder }) => {
  const groupedTickets = groupBy(tickets, grouping, users);

  // Status icons mapped by status
  const statusIcons = {
    "Todo": todoIcon,
    "In progress": inProgressIcon,
    "Done": doneIcon,                // Done status icon
    "Backlog": backlogIcon,
    "Canceled": canceledIcon         // Canceled status icon
  };

  // Priority icons mapped by priority levels
  const priorityIcons = {
    "No priority": noPriorityIcon,
    "Low": lowPriorityIcon,
    "Medium": mediumPriorityIcon,
    "High": highPriorityIcon,
    "Urgent": urgentPriorityIcon
  };

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          {/* Column header with SVG icons */}
          <div className="kanban-header">
            {/* Conditional rendering of status or priority icons */}
            {grouping === "status" && (
              <img className="status-icon" src={statusIcons[group]} alt={`${group} icon`} />
            )}
            {grouping === "priority" && (
              <img className="priority-icon" src={priorityIcons[group]} alt={`${group} icon`} />
            )}
            {group} <span className="task-count">({groupedTickets[group].length})</span>

            {/* Add Task and Options (three-dots) icons */}
            <img className="add-task-icon" src={addTaskIcon} alt="Add Task" />
            <img className="three-dots-icon" src={threeDotsIcon} alt="Options" />
          </div>

          {/* Render each ticket in the group */}
          {sortTickets(groupedTickets[group], sortOrder).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} users={users} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;