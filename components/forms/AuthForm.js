import { SyncOutlined } from "@ant-design/icons";

export const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
    {page !== "login" && (
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    )}
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    {page !== "login" && (
      <>
        <div className="form-group">
          <small>
            <label htmlFor="">Pick a question.</label>
          </small>

          <select name="" id="" className="form-control">
            <option>What is your favorite Color?</option>
            <option>What is your pet name?</option>
            <option>who is your best friend?</option>
          </select>
          <div className="form-text text-muted">
            You can use this to reset your password if forgotten.
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your answer here."
            name="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
      </>
    )}

    <div className="form-group pt-4">
      <button
        disabled={
          page === "login"
            ? !email || !password
            : !name || !email || !password || !secret
        }
        type="submit"
        className="btn col-12 btn-primary"
      >
        {loading ? <SyncOutlined span className="py-1" /> : "Submit"}
      </button>
    </div>
  </form>
);

export default AuthForm;
