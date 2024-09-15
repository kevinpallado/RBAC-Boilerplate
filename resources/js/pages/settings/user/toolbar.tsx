import { Input } from '@/components/ui/input';

interface ToolbarProps {
  searchValue: string | null;
  searchOnChange: (e: any) => void;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search User..."
          className="h-8 w-[150px] lg:w-[250px]"
          value={props.searchValue ?? ''}
          onChange={props.searchOnChange}
        />
      </div>
    </div>
  );
}
