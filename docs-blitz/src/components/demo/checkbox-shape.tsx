import { Checkbox } from '@blitz-ui/react/checkbox';
import { Label } from '@blitz-ui/react/label';

export default function CheckboxShape() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="terms1" defaultChecked className="rounded-none size-5" />
          <Label htmlFor="terms1">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="terms2" defaultChecked className="size-5" />
          <Label htmlFor="terms2">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="terms3" defaultChecked className="rounded-full size-5" />
          <Label htmlFor="terms3">Accept terms and conditions</Label>
        </div>
      </div>
    </div>
  );
}
