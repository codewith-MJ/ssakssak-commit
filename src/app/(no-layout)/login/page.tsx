import CardLayout from "@/app/ui/layout/card-layout";
import AuthActions from "@/app/ui/auth/auth-action";
import AuthSwitch from "@/app/ui/auth/auth-switch";

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  return (
    <CardLayout
      hideTitle
      body={<AuthSwitch />}
      actions={
        <AuthActions callbackUrl={callbackUrl ?? "/"} showSecondary={false} />
      }
      cardSrc="/login.svg"
    />
  );
}

export default LoginPage;
