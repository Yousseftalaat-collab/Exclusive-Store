import { Outlet } from "react-router-dom";
import TopHeader from "./TopHeader";
import Header from "./Header/Header";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <TopHeader />
      <Header />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
