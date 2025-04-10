
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Package, UserCheck, Map, ClipboardList, 
  AlertTriangle, LogOut, Bell, Search, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ 
  children, 
  title 
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Incoming Orders", icon: Package, href: "/admin/orders" },
    { name: "Rider Assignment", icon: UserCheck, href: "/admin/riders" },
    { name: "Fleet Tracking", icon: Map, href: "/admin/tracking" },
    { name: "Delivery Logs", icon: ClipboardList, href: "/admin/logs" },
    { name: "Escalations", icon: AlertTriangle, href: "/admin/escalations" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast.success("Successfully logged out");
    navigate("/admin/login");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col z-20`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <img src="/og-tab.png" alt="Cydex Logo" className="h-8 w-8" />
              <span className="font-bold text-xl">Cydex Admin</span>
            </div>
          ) : (
            <img src="/og-tab.png" alt="Cydex Logo" className="h-8 w-8 mx-auto" />
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={`w-full justify-${sidebarOpen ? "start" : "center"} py-2 px-3`}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className="h-5 w-5 text-green-600" />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={`w-full justify-${sidebarOpen ? "start" : "center"} text-red-600 hover:bg-red-50 hover:text-red-700`}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="h-16 flex items-center justify-between px-4 sm:px-6">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
              <div className="relative max-w-xs">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </span>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 py-2 border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <Button variant="ghost" className="relative p-2">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </div>
              <Avatar>
                <AvatarFallback className="bg-green-600 text-white">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
