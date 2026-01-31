import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  Wallet,
  TrendingUp,
  Calculator,
  ArrowRightLeft,
  HelpCircle,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const navSections = [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', url: '/', icon: LayoutDashboard },
      { title: 'Reports', url: '/reports', icon: PieChart },
    ],
  },
  {
    label: 'Finance',
    items: [
      { title: 'Transactions', url: '/transactions', icon: Receipt },
      { title: 'Budget', url: '/budget', icon: Wallet },
      { title: 'Investments', url: '/investments', icon: TrendingUp },
    ],
  },
  {
    label: 'Tools',
    items: [
      { title: 'Calculator', url: '/calculator', icon: Calculator },
      { title: 'Converter', url: '/converter', icon: ArrowRightLeft },
    ],
  },
  {
    label: 'System',
    items: [
      { title: 'Settings', url: '/settings', icon: Settings },
      { title: 'Help', url: '/help', icon: HelpCircle },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      className="border-r border-sidebar-border"
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        <div className={cn(
          'flex items-center gap-3 transition-all duration-300',
          isCollapsed && 'justify-center'
        )}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col animate-fade-in">
              <span className="font-bold text-lg gradient-text">FinanceHub</span>
              <span className="text-xs text-muted-foreground">Premium</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* User Profile Card */}
        <div className={cn(
          'mx-2 mb-4 p-3 rounded-xl glass-subtle',
          isCollapsed && 'p-2'
        )}>
          <div className={cn(
            'flex items-center gap-3',
            isCollapsed && 'justify-center'
          )}>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-sm font-medium truncate">John Doe</p>
                <div className="flex items-center gap-1">
                  <Crown className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-muted-foreground">Premium</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={isCollapsed ? item.title : undefined}
                      >
                        <NavLink
                          to={item.url}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                            isActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                        >
                          <item.icon className={cn(
                            'h-5 w-5 transition-colors',
                            isActive && 'text-primary'
                          )} />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!isCollapsed && (
          <div className="glass-subtle rounded-xl p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="gradient-primary text-white border-0">Pro</Badge>
              <span className="text-sm font-medium">Upgrade Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Get unlimited access to all features
            </p>
            <button className="w-full py-2 px-4 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
