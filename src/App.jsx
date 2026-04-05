import { useState } from 'react';
import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import MemberPanel from './components/MemberPanel/MemberPanel';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import TaskModal from './components/TaskModal/TaskModal';
import MemberModal from './components/MemberModal/MemberModal';

function App() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingMember, setEditingMember] = useState(null);

  function handleEditTask(task) {
    setEditingTask(task);
    setTaskModalOpen(true);
  }

  function handleEditMember(member) {
    setEditingMember(member);
    setMemberModalOpen(true);
  }

  function handleCloseTaskModal() {
    setTaskModalOpen(false);
    setEditingTask(null);
  }

  function handleCloseMemberModal() {
    setMemberModalOpen(false);
    setEditingMember(null);
  }

  return (
    <div className="app">
      <Header
        onAddTask={() => setTaskModalOpen(true)}
        onAddMember={() => setMemberModalOpen(true)}
      />
      <ProgressBar />
      <MemberPanel onEdit={handleEditMember} />
      <KanbanBoard onEdit={handleEditTask} />
      {taskModalOpen && (
        <TaskModal onClose={handleCloseTaskModal} existingTask={editingTask} />
      )}
      {memberModalOpen && (
        <MemberModal onClose={handleCloseMemberModal} existingMember={editingMember} />
      )}
    </div>
  );
}

export default App;
