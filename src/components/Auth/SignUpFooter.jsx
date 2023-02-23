import { Flex, Text, useTheme } from "@aws-amplify/ui-react";

export function SignUpFooter() {
  const { tokens } = useTheme();
  return (
    <Flex justifyContent="center" padding={tokens.space.medium}>
      <Text></Text>
    </Flex>
  );
}