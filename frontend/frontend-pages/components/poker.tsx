'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PlanningPoker = () => {
    
  // Team members for dropdown options
  const teamMembers = ["Elena", "Daniel", "Maya", "John", "Adrian", "Marcus", "Sophia", "Isabel"];
  
  // Initial list of tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Create login page", description: "Design and implement user authentication" },
    { id: 2, title: "Setup database models", description: "Create schema for users and tasks" },
    { id: 3, title: "Implement API endpoints", description: "Create REST APIs for task management" },
    { id: 4, title: "Add form validation", description: "Client-side validation for all forms" },
    { id: 5, title: "Create dashboard UI", description: "Design main dashboard layout and widgets" }
    
  ]);

  // Currently selected task
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Completed tasks with scores and assignments
  const [completedTasks, setCompletedTasks] = useState([]);
  
  // Current voting state
  const [votes, setVotes] = useState({});
  
  // Selection state for task assignments
  const [assignments, setAssignments] = useState({});
  
  // Function to select a task
  const selectTask = (task) => {
    setSelectedTask(task);
  };
  
  // Function to cast a vote
  const castVote = (value) => {
    if (!selectedTask) return;
    
    // Simulate votes from team members
    const teamVotes = {};
    teamMembers.forEach(member => {
      // Random votes between 0-5 for team members
      teamVotes[member] = Math.floor(Math.random() * 6);
    });
    
    // Add user's vote
    teamVotes["You"] = value;
    
    // Calculate average
    const voteValues = Object.values(teamVotes);
    const sum = voteValues.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / voteValues.length);
    
    // Update votes state
    setVotes({
      taskId: selectedTask.id,
      votes: teamVotes,
      average: average
    });
    
    // Add to completed tasks
    const completedTask = {
      ...selectedTask,
      score: average,
      assignee: null,
      reviewer: null
    };
    
    setCompletedTasks([...completedTasks, completedTask]);
    
    // Initialize assignments for this task
    setAssignments(prev => ({
      ...prev,
      [completedTask.id]: { assignee: null, reviewer: null }
    }));
    
    // Remove the task from the list
    setTasks(tasks.filter(t => t.id !== selectedTask.id));
    setSelectedTask(null);
  };
  
  // Handle assignment changes
  const handleAssignmentChange = (taskId, role, value) => {
    setAssignments(prev => ({
      ...prev,
      [taskId]: { 
        ...prev[taskId],
        [role]: value 
      }
    }));
  };
  
  const router = useRouter();
  
  // Handle submit button
  const handleSubmit = () => {
    // Check if all tasks have assignees and reviewers
    const allAssigned = completedTasks.every(task => 
      assignments[task.id]?.assignee && assignments[task.id]?.reviewer
    );
    
    if (!allAssigned) {
      alert("Please assign team members to all tasks before proceeding.");
      return;
    }
    
    // Here you would implement logic to move to the next phase
    alert("Planning complete! Moving to next phase...");
    
    // Additional logic to move to next phase would go here
    router.push('./homepage'); // Navigate to homepage
  };
  
  // Voting options
  const voteOptions = [0, 1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main content area */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Task Bar - Left Side */}
        <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300 h-full">
          <h2 className="text-xl font-bold mb-4">Task Backlog</h2>
          {tasks.length > 0 ? (
            <div className="space-y-2">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`p-3 rounded cursor-pointer hover:bg-gray-200 ${selectedTask?.id === task.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-white'}`}
                  onClick={() => selectTask(task)}
                >
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded">
              <p>All tasks have been estimated!</p>
            </div>
          )}
        </div>
        
        {/* Voting Area - Right Side */}
        <div className="w-2/3 p-4 flex flex-col overflow-y-auto">
          {selectedTask ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold">Estimate Task</h2>
                <div className="bg-blue-50 p-4 rounded mt-2">
                  <h3 className="font-medium text-lg">{selectedTask.title}</h3>
                  <p>{selectedTask.description}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Select your estimate (0-5):</h3>
                <div className="flex space-x-4 mt-2">
                  {voteOptions.map(value => (
                    <button
                      key={value}
                      onClick={() => castVote(value)}
                      className="w-16 h-20 bg-white border-2 border-blue-500 rounded-lg shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    >
                      <span className="text-2xl font-bold">{value}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : votes.taskId ? (
            <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
              <div className="bg-green-50 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-center mb-4">Voting Results</h2>
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-green-600">{votes.average}</span>
                  <p className="text-sm text-gray-600 mt-2">Team Average Estimate</p>
                </div>
                <div className="bg-white p-4 rounded">
                  <h3 className="font-medium mb-2">Individual Votes:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(votes.votes).map(([member, vote]) => (
                      <div key={member} className="flex justify-between">
                        <span>{member}</span>
                        <span className="font-medium">{vote}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-xl">Select a task from the backlog to start estimation</p>
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div className="border-t border-gray-300 p-4 overflow-y-auto max-h-[40vh]">
          <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Task</th>
                  <th className="py-2 px-4 text-center">Score</th>
                  <th className="py-2 px-4 text-left">Assignee</th>
                  <th className="py-2 px-4 text-left">Reviewer</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map(task => (
                  <tr key={task.id} className="border-t border-gray-200">
                    <td className="py-3 px-4">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 font-medium rounded-full px-3 py-1">{task.score}</span>
                    </td>
                    <td className="py-3 px-4">
                      <select 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={assignments[task.id]?.assignee || ""}
                        onChange={(e) => handleAssignmentChange(task.id, 'assignee', e.target.value)}
                      >
                        <option value="">Select Assignee</option>
                        {teamMembers.map(member => (
                          <option key={`assignee-${member}`} value={member}>{member}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={assignments[task.id]?.reviewer || ""}
                        onChange={(e) => handleAssignmentChange(task.id, 'reviewer', e.target.value)}
                      >
                        <option value="">Select Reviewer</option>
                        {teamMembers.map(member => (
                          <option key={`reviewer-${member}`} value={member}>{member}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Submit & Move to Next Phase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanningPoker;