import AuthActions from "@/app/ui/auth/auth-action";
import CardLayout from "@/app/ui/layout/card-layout";
import { AUTH_ERROR_MESSAGES } from "@/constants/error-messages";

interface AccessDeniedPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

async function AccessDeniedPage({ searchParams }: AccessDeniedPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <CardLayout
      title="접근 권한이 없습니다."
      body={<p>{AUTH_ERROR_MESSAGES.UNAUTHORIZED}</p>}
      actions={
        <AuthActions callbackUrl={callbackUrl ?? "/"} showSecondary={true} />
      }
      cardSrc="/error-cat.svg"
    />
  );
}

export default AccessDeniedPage;
