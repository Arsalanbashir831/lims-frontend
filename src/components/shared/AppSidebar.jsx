"use client";

import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
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
} from "lucide-react";

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

// Function to map names to icons.
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
    "Add Jobs":PlusCircle
  };
  return icons[name] || Home; // Default to Home if no match.
};

// Menu items grouped.
const items = [
  {
    title: "Dashboard",
    children: [
      { title: "Dashboard", url: "/dashboard" },
      { title: "Lab Equipments", url: "/dashboard/lab-equipments" },
    ],
  },
  {
    title: "Testing",
    children: [
      { title: "Proficiency Testing", url: "/dashboard/proficiency-testing" },
      { title: "Calibration Testing", url: "/dashboard/calibration-testing" },
    ],
  },
  {
    title: "Lab",
    children: [
      { title: "Add Jobs", url: "/dashboard/add-jobs" },
      { title: "Tracebility", url: "/dashboard/tracebility" },
      { title: "Job Compliance", url: "/dashboard/job-compliance" },
      // { title: "Test Certificates", url: "/dashboard/test-certificates" },
    ],
  },
  {
    title: "Personal",
    children: [
      { title: "Attendance", url: "/dashboard/attendance" },
      { title: "Leave Application", url: "/dashboard/leave-application" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname(); // Get the current path

  return (
    <Sidebar>
      <SidebarHeader>
        <img className="px-3 py-3" src="/gripco_logo.svg" />
      </SidebarHeader>
      <SidebarContent>
        {items.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.children.map((item) => {
                  const Icon = getIcon(item.title); // Dynamically select icon
                  const isActive = pathname === item.url; // Check if the current path matches the item's URL

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className={isActive ? "bg-gray-200 text-black" : ""}
                    >
                      <SidebarMenuButton  asChild>
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
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
              
                <DropdownMenuItem>
                <div onClick={()=>{
                  window.location.href='/dashboard/user-settings'
                }} className="flex gap-2 items-center">
                <Settings size={20} />
                  <span>Settings</span>
                </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
    </Sidebar>
  );
}
