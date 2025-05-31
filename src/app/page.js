import ClientWrapper from '@/components/ClientWrapper';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <ClientWrapper />
    </AuthProvider>
  );
}