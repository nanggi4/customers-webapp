import { Heading, useTheme } from "@aws-amplify/ui-react";

export function SignInHeader() {
  const { tokens } = useTheme();
  return (
    <Heading level={5} padding={`${tokens.space.xl} ${tokens.space.xl} 0`}>
      로그인 해주세요.
    </Heading>
  );
}