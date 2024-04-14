import { useEffect, useState } from "react";
import "../sidebar/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
const adminMenusList = [
  {
    id: 1,
    menuText: "Supervised Students",
    path: "/professor/students",
  },
  {
    id: 2,
    menuText: "Task Assignment",
    path: "/professor/taskassignment",
  },
  {
    id: 6,
    menuText: "Submited Tasks",
    path: "/professor/submitedTasks",
  },
  {
    id: 3,
    menuText: "Reports Review",
    path: "/professor/reportsreview",
  },
  {
    id: 4,
    menuText: "Messages",
    path: "/professor/messages",
  },
  {
    id: 5,
    menuText: "Home",
    path: "/",
  },
];

const Sidebar = () => {
  const [activeMenuId, setActiveMenuId] = useState(
    () => parseInt(localStorage.getItem("activeMenuId")) || adminMenusList[0].id
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const naviagte = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    naviagte("/");
  };

  const handleNormalMenuItem = (id, path) => {
    setActiveMenuId(id);
    naviagte(path);
  };

  useEffect(() => {
    localStorage.setItem("activeMenuId", activeMenuId);
  }, [activeMenuId]);

  return (
    <div>
      <div className="bgContainer">
        <div>
          <ul className="ulCont">
            {adminMenusList.map((menu) => (
              <li key={menu.id} className="liText">
                <button
                  className={
                    menu.id === activeMenuId ? "activeMenuButton" : "menuButton"
                  }
                  onClick={() => handleNormalMenuItem(menu.id, menu.path)}
                >
                  {/* <img
                    src={menu.img}
                    alt="Avatar"
                    className={
                      menu.id === activeMenuId
                        ? "activeMenuIcon"
                        : "sideBarMenuIcon"
                    }
                  /> */}
                  {menu.menuText}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <hr />
          <button className="sideBarLogoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="mobileHeader">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ paddingLeft: "10px" }}>
            <Link to="/students" className="link">
              WDM
            </Link>
          </h1>

          {menuOpen ? (
            <img
              src="/icons8-cross-50.png"
              alt="menu"
              onClick={toggleMenu}
              className="icons"
            />
          ) : (
            <img
              src="/icons8-menu-60.png"
              alt="menu"
              onClick={toggleMenu}
              className="icons"
            />
          )}
        </div>

        <div>
          {menuOpen && (
            <div onClick={toggleMenu}>
              <ul className="ulCont">
                {adminMenusList.map((menu) => (
                  <li key={menu.id} className="liText">
                    <button
                      className={
                        menu.id === activeMenuId
                          ? "activeMenuButton"
                          : "menuButton"
                      }
                      onClick={() => handleNormalMenuItem(menu.id, menu.path)}
                    >
                      <img
                        src={menu.img}
                        alt="Avatar"
                        className={
                          menu.id === activeMenuId
                            ? "activeMenuIcon"
                            : "sideBarMenuIcon"
                        }
                      />
                      {menu.menuText}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="btnCont">
                <button className="sideBarLogoutBtn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
