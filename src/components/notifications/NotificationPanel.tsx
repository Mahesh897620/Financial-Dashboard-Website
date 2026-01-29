import { useState } from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { notifications, type Notification } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case 'alert':
      return <AlertCircle className="h-4 w-4 text-rose-500" />;
    default:
      return <Info className="h-4 w-4 text-cyan-500" />;
  }
};

export const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const [items, setItems] = useState(notifications);

  const markAllAsRead = () => {
    setItems(items.map(item => ({ ...item, isRead: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  const unreadCount = items.filter(n => !n.isRead).length;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 glass-strong rounded-xl shadow-2xl border border-border/50 animate-scale-in origin-top-right">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
              {unreadCount} new
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Actions */}
      {items.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-destructive"
            onClick={clearAll}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}

      {/* Notification List */}
      <ScrollArea className="max-h-96">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No notifications</p>
            <p className="text-xs text-muted-foreground/70">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {items.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'flex gap-3 p-4 transition-colors hover:bg-muted/50 cursor-pointer',
                  !notification.isRead && 'bg-primary/5'
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      'text-sm truncate',
                      !notification.isRead && 'font-medium'
                    )}>
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {items.length > 0 && (
        <div className="p-3 border-t border-border/50">
          <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary">
            View all notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
