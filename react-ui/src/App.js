import "./App.css";
import SubscriptionsTable from "./components/subscriptionPlan/SubscriptionsTable";
import UserTable from "./components/user/UserTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
      </header>
      <main>
        <UserTable />
        <SubscriptionsTable />
      </main>
    </div>
  );
}

export default App;
