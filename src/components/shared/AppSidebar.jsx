"use client";

import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  Table,
  RefreshCcw,
  Badge,
  FlaskConical,
  BackpackIcon,
  User2Icon,
  User2,
  ChevronUp,
  LogOut,
  PlusCircle,
  Menu,
  Settings,
  X,
} from "lucide-react";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Function to map names to icons
const getIcon = (name) => {
  const icons = {
    Dashboard: Home,
    "Lab Equipments": BackpackIcon,
    "Tracebility": Table,
    "Job Compliance": RefreshCcw,
    "Test Certificates": Badge,
    Attendance: Calendar,
    "Proficiency Testing": FlaskConical,
    "Calibration Testing": FlaskConical,
    "Leave Application": Calendar,
    Settings: Settings,
    "User Profile": User2Icon,
    "Add Jobs": PlusCircle,
  };
  return icons[name] || Home;
};

// Menu items grouped
const items = [
  {
    title: "Dashboard",
    children: [
      { title: "Dashboard", url: "/" },
      { title: "Lab Equipments", url: "/lab-equipments" },
    ],
  },
  {
    title: "Testing",
    children: [
      { title: "Proficiency Testing", url: "/proficiency-testing" },
      { title: "Calibration Testing", url: "/calibration-testing" },
    ],
  },
  {
    title: "Lab",
    children: [
      { title: "Add Jobs", url: "/add-jobs" },
      { title: "Tracebility", url: "/tracebility" },
      { title: "Job Compliance", url: "/job-compliance" },
    ],
  },
  {
    title: "Personal",
    children: [
      { title: "Attendance", url: "/attendance" },
      { title: "Leave Application", url: "/leave-application" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuItemClick = () => {
    if (isMobile) {
      setIsOpen(false); // Close sidebar on mobile when a menu item is clicked
    }
  };

  return (
    <>
      {/* Mobile Sidebar (Custom Drawer) */}
      {isMobile && (
        <>
          {/* Hamburger Button */}
          <div className="fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md shadow-lg">
            <button
              onClick={() => setIsOpen(true)}
              className="text-white focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Overlay (Backdrop) */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Sidebar Drawer */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 bg-white text-white">
              <img className="h-10" src="/gripco_logo.svg" alt="Logo" />
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Sidebar Content */}
            <SidebarContent>
              {items.map((group) => (
                <SidebarGroup key={group.title}>
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.children.map((item) => {
                        const Icon = getIcon(item.title);
                        const isActive = pathname === item.url;

                        return (
                          <SidebarMenuItem
                            key={item.title}
                            className={isActive ? "bg-gray-200 text-black" : ""}
                            onClick={handleMenuItemClick} // Close drawer on click
                          >
                            <SidebarMenuButton asChild>
                              <a href={item.url}>
                                <Icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <User2 /> Arsalan Bashir
                        <ChevronUp className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top">
                      <DropdownMenuItem onClick={logout}>
                        <div className="flex gap-2 items-center">
                          <LogOut size={20} />
                          <span>Sign Out</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar>
          <SidebarHeader>
            <img className="px-3 py-3" src="/gripco_logo.svg" alt="Logo" />
          </SidebarHeader>
          <SidebarContent>
            {items.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.children.map((item) => {
                      const Icon = getIcon(item.title);
                      const isActive = pathname === item.url;

                      return (
                        <SidebarMenuItem
                          key={item.title}
                          className={isActive ? "bg-gray-200 text-black" : ""}
                        >
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              <Icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
