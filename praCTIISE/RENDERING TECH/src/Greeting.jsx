const Greeting = ({ isLoggedIn }) => (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
  </div>
);

export default Greeting;
