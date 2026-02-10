import { Checkbox } from '@blitz-ui/react/checkbox';
import { Label } from '@blitz-ui/react/label';

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
}
