import Card from '../../components/Card.jsx';
import Chip from '../../components/Chip.jsx';
import Button from '../../components/Button.jsx';
import LockIcon from '../../components/LockIcon.jsx';

// What a non-member sees when they try to open a private room.
export default function AccessDenied() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Card className="flex w-[540px] flex-col items-center gap-[18px] rounded-[28px] p-[52px] text-center">
        <LockIcon size={84} round bg="var(--color-oat)" fg="var(--color-cocoa)" />
        <Chip tone="clay">Access denied</Chip>
        <h1 className="text-[40px] leading-[48px]">This room is <em>private</em>.</h1>
        <p className="max-w-[420px] leading-[25px] text-muted">
          Only people the owner has let in can read or send messages here. If you think you should have access, ask the room owner.
        </p>
        <div className="flex gap-3">
          <Button size="sm" to="/dashboard">Back to dashboard</Button>
          <Button variant="secondary" size="sm" to="/dashboard">Browse public rooms</Button>
        </div>
      </Card>
    </div>
  );
}
