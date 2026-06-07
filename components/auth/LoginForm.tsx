'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function LoginForm() {
  return (
    <form className="space-y-4 w-full max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Email address"
        label="Email"
        required
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        required
      />
      <div className="flex gap-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="role"
            value="trekker"
            defaultChecked
          />
          <span>Trekker</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="role" value="agency" />
          <span>Agency</span>
        </label>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
