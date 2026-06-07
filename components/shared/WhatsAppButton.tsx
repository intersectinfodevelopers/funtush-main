import { Button } from '@/components/ui/Button';

export function WhatsAppButton({ phoneNumber }: { phoneNumber: string }) {
  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent('Hi, I am interested in your trek packages');
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      '_blank'
    );
  };

  return (
    <Button onClick={handleWhatsApp} className="w-full">
      💬 WhatsApp
    </Button>
  );
}
