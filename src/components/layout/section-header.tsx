import { Flex, Text } from '@radix-ui/themes';

interface Props {
  subTitle: string;
  title: string;
}

export const SectionHeader = ({ title, subTitle }: Props) => {
  return (
    <Flex direction="column" gap="3">
      <Text weight="bold" size="7">
        {title}
      </Text>

      <Text className="opacity-70">{subTitle}</Text>
    </Flex>
  );
};
