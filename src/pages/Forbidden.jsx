import { Link } from "react-router";
const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-500">
        Forbidden Access
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        You are unauthorized to access this page.
      </p>
      <div className="my-3 space-x-3">
        <Link to="/" className="btn btn-neutral">
          {" "}
          Home
        </Link>
        <Link className="btn btn-neutral" to="/dashboard">
          {" "}
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;