import './Header.css';

function Header({ onAddTask, onAddMember }) {
  return (
    <header className="header">
      <h1 className="header__title">TaskFlow</h1>
      <div className="header__actions">
        <button className="header__btn header__btn--member" onClick={onAddMember}>
          + Add Member
        </button>
        <button className="header__btn header__btn--task" onClick={onAddTask}>
          + Add Task
        </button>
      </div>
    </header>
  );
}

export default Header;
