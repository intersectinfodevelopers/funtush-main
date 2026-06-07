import { Input } from '@/components/ui/Input';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newValue = value.split('');
    newValue[index] = val;
    const result = newValue.join('').slice(0, length);
    onChange(result);
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
}
