import "./Breadcrumbs.css";
import { Routes, Route, useLocation, Link } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Define breadcrumb paths for routes where they should appear
  const breadcrumbMap: any = {
    "/shop": [
      { label: "Home", path: "/" },
      { label: "Shop", path: "/shop" },
    ],
  };

  const breadcrumbs: any[] = breadcrumbMap[pathname];

  return (
    breadcrumbs && (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <>
              {index === breadcrumbs.length - 1 && <span>{">"}</span>}
              <li
                key={index}
                className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? "active" : ""}`}
                aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
              >
                {/* If on the last crumb use non href element otherwise use Link */}
                {index === breadcrumbs.length - 1 ? crumb.label : <Link to={crumb.path}>{crumb.label}</Link>}
              </li>
            </>
          ))}
        </ol>
      </nav>
    )
  );
}
export default Breadcrumbs;
