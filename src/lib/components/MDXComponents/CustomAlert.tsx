/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { Alert, AlertIcon } from '@chakra-ui/react';

type AlertProps = {
  status: 'error' | 'success' | 'warning' | 'info';
  children: any;
};

export const CustomAlert: React.FC<AlertProps> = ({ status, children }) => {
  return (
    <Alert status={status} borderRadius="md">
      <AlertIcon />
      {children}
    </Alert>
  );
};
