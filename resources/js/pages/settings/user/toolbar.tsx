import { Input } from '@/components/ui/input';

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search User..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  );
}
