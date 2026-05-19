function Dashboard({ user, onLogout }) {
  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#f5f5f5" }}>
        <h2>Dashboard</h2>
        <div>
          <span style={{ marginRight: "1rem" }}>{user.name}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>
      <main style={{ padding: "2rem" }}>
        <p>Welcome, {user.name}! This is your dashboard.</p>
      </main>
    </div>
  );
}

export default Dashboard;
