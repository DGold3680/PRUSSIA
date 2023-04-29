import "./login-form.css";
export default function LoginForm({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername,
  error
}) {
  return (
    <form className="login-form">
      <h2 className="form-title">Login to Store</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          className="login-field"
          type="text"
          placeholder="Enter your username here"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password </label>
        <input
          className="login-field"
          type="password"
          placeholder="Enter your password here"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="login-btn btn" onClick={handleLogin}>
        Login
      </button>
      {error.value && (<div className="error">
       {error.msg}
      </div>)}
    </form>
  );
}
