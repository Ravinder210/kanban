import React, { useState, useEffect, useRef } from "react";
import './GroupingOptions.css';

const GroupingOptions = ({ onGroupingChange, onSortOrderChange, currentGrouping, currentSortOrder, onAddTaskClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);  // Ref to track the dropdown element

  // Toggle the dropdown menu on button click
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);  // Close dropdown if clicking outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="grouping-options">
      {/* Display dropdown */}
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-button" onClick={toggleDropdown}>
          Display
        </button>

        {/* Conditionally render the dropdown content based on the isDropdownOpen state */}
        {isDropdownOpen && (
          <div className="dropdown-content">
            <label htmlFor="grouping">Grouping</label>
            <select 
              id="grouping" 
              value={currentGrouping} 
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>

            <label htmlFor="sortOrder">Ordering</label>
            <select 
              id="sortOrder" 
              value={currentSortOrder} 
              onChange={(e) => onSortOrderChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        )}
      </div>

      {/* Add New Task button */}
    
    </div>
  );
};

export default GroupingOptions;