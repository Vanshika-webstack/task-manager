import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!authChecked) return <p>Checking authentication...</p>;

  return (
  <div style={{ position: 'relative' }}>
    {/* 🔹 Background */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      <img
        src="/image.png"
        alt="Background"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(8px)',
          transform: 'scale(1.05)' 
        }}
      />
    </div>

    {/* 🔹 Foreground Content */}
    <div style={{
      position: 'relative',
      zIndex: 2,
      padding: '120px 1rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      {/* Title */}
      <h1
        style={{
          marginBottom: '1rem',
          fontSize: '3rem',
          color: '#333',
          textAlign: 'center'
        }}
      >
        📝 Personal Task Manager
      </h1>

      {/* Login */}
      {!user && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#333' }}>
            Please log in to use the task manager.
          </p>
          <button
            onClick={handleLogin}
            style={{
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🔐 Sign in with Google
          </button>
        </div>
      )}

      {/* White card after login */}
      {user && (
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            background: '#f5f5dc',
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              🔓 Logout
            </button>
          </div>
          <TaskList user={user} />
        </div>
      )}
    </div>
  </div>
);
}

export default App;
