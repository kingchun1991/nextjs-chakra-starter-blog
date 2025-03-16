import { Text, Timeline as ChakraTimeline, Avatar } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import { ReactNode } from 'react';

export const Timeline = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <ChakraTimeline.Root size="xl" {...props}>
      {children}
    </ChakraTimeline.Root>
  );
};

export const TimelineItem = ({
  title,
  subtitle,
  children,
  avatar,
  ...props
}: {
  title: string;
  subtitle: string;
  children?: ReactNode;
  icon?: ReactNode;
  avatar?: string | ReactNode;
}) => {
  return (
    <ChakraTimeline.Item {...props}>
      <ChakraTimeline.Connector>
        <ChakraTimeline.Separator />
        <ChakraTimeline.Indicator>
          {avatar ? (
            typeof avatar === 'string' ? (
              <Avatar.Root size="full">
                <Avatar.Image src={avatar} />
                <Avatar.Fallback name="avatar" />
              </Avatar.Root>
            ) : (
              avatar
            )
          ) : (
            <LuCheck />
          )}
        </ChakraTimeline.Indicator>
      </ChakraTimeline.Connector>
      <ChakraTimeline.Content>
        <ChakraTimeline.Title>{title}</ChakraTimeline.Title>
        <ChakraTimeline.Description>{subtitle}</ChakraTimeline.Description>
        {children && <Text textStyle="sm">{children}</Text>}
      </ChakraTimeline.Content>
    </ChakraTimeline.Item>
  );
};
