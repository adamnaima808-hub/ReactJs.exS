import UserList from './UserList';

const App = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default App;
