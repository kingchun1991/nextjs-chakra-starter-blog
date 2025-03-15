import { Text, Timeline as ChakraTimeline, Avatar } from '@chakra-ui/react';
import { LuShip } from 'react-icons/lu';

export const Timeline = ({ children, ...props }) => {
  return (
    <ChakraTimeline.Root size="lg" {...props}>
      {children}
    </ChakraTimeline.Root>
  );
};

import { ReactNode } from 'react';

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
              <Avatar.Root size="sm">
                <Avatar.Image src={avatar} />
                <Avatar.Fallback name="Sage" />
              </Avatar.Root>
            ) : (
              avatar
            )
          ) : (
            <LuShip />
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
