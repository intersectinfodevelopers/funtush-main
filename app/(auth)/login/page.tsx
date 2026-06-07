import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Login to Funtush</h1>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
