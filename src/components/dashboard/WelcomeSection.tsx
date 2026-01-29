import { useDateTime } from '@/hooks/useDateTime';

interface WelcomeSectionProps {
  userName?: string;
}

export const WelcomeSection = ({ userName = 'John' }: WelcomeSectionProps) => {
  const { greeting, date, time } = useDateTime();

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {greeting}, <span className="gradient-text">{userName}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your finances today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{time}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
