import { createContext, useContext, useReducer, useEffect } from 'react';

// ── localStorage helpers ───────────────────────────────────────────────────

function loadState() {
  try {
    const raw = localStorage.getItem('taskflow');
    if (!raw) return { tasks: [], members: [] };
    return JSON.parse(raw);
  } catch {
    return { tasks: [], members: [] };
  }
}

function saveState(state) {
  localStorage.setItem('taskflow', JSON.stringify(state));
}

// ── Reducer ────────────────────────────────────────────────────────────────

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };

    case 'UPDATE_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, status: action.payload.status } : t
        ),
      };

    case 'ASSIGN_TASK': {
      const member = state.members.find((m) => m.id === action.payload.memberId);
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, assignee: member ? member.name : t.assignee }
            : t
        ),
      };
    }

    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };

    case 'EDIT_MEMBER':
      return {
        ...state,
        members: state.members.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };

    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.payload.id),
      };

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
