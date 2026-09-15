import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import { NavbarHero } from "./navbar-hero";
import { Footer } from "./Footer";
import { SaveStorageAlert } from "@/components/common/save-storage-alert";
import { useLocation } from "react-router-dom";

const Layout = (): React.JSX.Element => {
  const location = useLocation();

  const showNavbarHeroPaths: string[] = [
    "/",
    "/home",
    "/search/about",
  ];

  const showNavbarHero = showNavbarHeroPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <main className="bg-bg-main dark:bg-dark-bg-main flex flex-col min-h-screen transition-colors duration-300">
      {showNavbarHero ? <NavbarHero /> : <Menu />}

      {/* Only the Menu navbar is fixed (h-16); the hero navbar sits in the flow */}
      <div
        className={`flex-1 min-h-screen ${
          showNavbarHero ? "lg:px-8 lg:pb-8" : "lg:mt-16 lg:p-8"
        }`}>
        <Outlet />
      </div>
      <Footer />
      <SaveStorageAlert />
    </main>
  );
};

export { Layout };
