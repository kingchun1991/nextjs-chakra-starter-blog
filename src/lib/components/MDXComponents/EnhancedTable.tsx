import { Table, Text } from '@chakra-ui/react';

interface EnhancedTableProps {
  data: Array<Record<string, string | number | React.ReactNode>>;
  columns: Array<{
    key: string;
    header: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
  }>;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}

const EnhancedTable = ({
  data,
  columns,
  striped = false,
  hoverable = true,
  compact = false,
}: EnhancedTableProps) => {
  return (
    <Table.ScrollArea borderWidth="1px" maxW="l">
      <Table.Root
        variant="outline"
        size={compact ? 'sm' : 'md'}
        colorScheme="gray"
        bg="white"
        _dark={{ bg: 'gray.800' }}
        borderRadius="md"
        shadow="sm"
      >
        <Table.Header bg="gray.50" _dark={{ bg: 'gray.700' }}>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader
                key={column.key}
                textAlign={column.align || 'left'}
                width={column.width}
                px={4}
                py={3}
                fontWeight="semibold"
                fontSize="sm"
                color="gray.700"
                _dark={{ color: 'gray.200' }}
              >
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row
              key={index}
              bg={striped && index % 2 === 1 ? 'gray.50' : 'transparent'}
              _dark={{
                bg: striped && index % 2 === 1 ? 'gray.700' : 'transparent',
              }}
              _hover={
                hoverable
                  ? {
                      bg: 'gray.50',
                      _dark: { bg: 'gray.700' },
                    }
                  : {}
              }
              transition="background-color 0.2s"
            >
              {columns.map((column) => (
                <Table.Cell
                  key={column.key}
                  px={4}
                  py={3}
                  textAlign={column.align || 'left'}
                  fontSize="sm"
                  verticalAlign="top"
                  borderColor="gray.200"
                  _dark={{ borderColor: 'gray.600' }}
                >
                  {typeof row[column.key] === 'string' ? (
                    <Text>{row[column.key]}</Text>
                  ) : (
                    row[column.key]
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default EnhancedTable;
