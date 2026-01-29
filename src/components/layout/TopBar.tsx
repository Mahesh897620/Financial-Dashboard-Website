import { useState, useEffect } from 'react';
import { Bell, Search, Plus, Menu, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { notifications } from '@/data/mockData';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { cn } from '@/lib/utils';

export const TopBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Keyboard shortcut for search
  useKeyboardShortcut('k', () => setShowSearch(true), { meta: true });

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            
            {/* Search trigger */}
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 w-64 justify-start text-muted-foreground glass-subtle hover:glass"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-4 w-4" />
              <span>Search...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <Command className="h-3 w-3" />K
              </kbd>
            </Button>

            {/* Mobile search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Quick Action */}
            <Button
              className="hidden sm:flex items-center gap-2 gradient-primary text-white border-0 hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              <span>Add Transaction</span>
            </Button>

            {/* Mobile Quick Action */}
            <Button
              size="icon"
              className="sm:hidden gradient-primary text-white border-0"
            >
              <Plus className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                    <Badge
                      variant="destructive"
                      className="relative h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center"
                    >
                      {unreadCount}
                    </Badge>
                  </span>
                )}
              </Button>

              {showNotifications && (
                <NotificationPanel onClose={() => setShowNotifications(false)} />
              )}
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch open={showSearch} onOpenChange={setShowSearch} />
    </>
  );
};

export default TopBar;
