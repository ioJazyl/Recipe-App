import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }

  function isActive(path) {
    return location.pathname === path;
  }
  return (
    <div className="mb-3 flex justify-center gap-12 bg-black py-4 text-xl text-white">
      <Link
        to={"/"}
        className={isActive("/") ? "text-orange-400" : "text-slate-100"}
      >
        Home
      </Link>

      <Link
        to={"/create-recipe"}
        className={
          isActive("/create-recipe") ? "text-orange-400" : "text-slate-100"
        }
      >
        Create
      </Link>

      {!cookies.access_token ? (
        <Link
          to={"/auth"}
          className={isActive("/auth") ? "text-orange-400" : "text-slate-100"}
        >
          Login
        </Link>
      ) : (
        <>
          <Link
            to={"/saved-recipes"}
            className={
              isActive("/saved-recipes") ? "text-orange-400" : "text-slate-100"
            }
          >
            Saved Recipes
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Navbar;
