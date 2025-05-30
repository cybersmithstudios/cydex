
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, User as UserIcon, Settings, BarChart } from "lucide-react";
import { User } from "@/types/auth.types";

interface UserDropdownProps {
  user: User;
  onLogoutClick: () => void;
}

const UserDropdown = ({ user, onLogoutClick }: UserDropdownProps) => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    if (user) {
      navigate(`/${user.role.toLowerCase()}`);
    }
  };

  const goToProfile = () => {
    if (user) {
      navigate(`/${user.role.toLowerCase()}/profile`);
    }
  };

  const goToSettings = () => {
    if (user) {
      // Only vendors have settings page, for others redirect to profile
      if (user.role.toLowerCase() === 'vendor') {
        navigate(`/${user.role.toLowerCase()}/settings`);
      } else {
        navigate(`/${user.role.toLowerCase()}/profile`);
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={goToDashboard}>
          <BarChart className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToProfile}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{user.role.toLowerCase() === 'vendor' ? 'Settings' : 'Profile'}</span>
        </DropdownMenuItem>
        {user.role === "ADMIN" && (
          <DropdownMenuItem onClick={() => navigate("/admin")}>
            <Shield className="mr-2 h-4 w-4" />
            <span>Admin Panel</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
