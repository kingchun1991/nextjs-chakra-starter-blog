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

export function EnhancedTable({
  data,
  columns,
  striped = false,
  hoverable = true,
  compact = false,
}: EnhancedTableProps) {
  return (
    <Table.ScrollArea borderWidth="1px" maxW="l">
      <Table.Root
        _dark={{ bg: 'gray.800' }}
        bg="white"
        borderRadius="md"
        colorScheme="gray"
        shadow="sm"
        size={compact ? 'sm' : 'md'}
        variant="outline"
      >
        <Table.Header _dark={{ bg: 'gray.700' }} bg="gray.50">
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader
                _dark={{ color: 'gray.200' }}
                color="gray.700"
                fontSize="sm"
                fontWeight="semibold"
                key={column.key}
                px={4}
                py={3}
                textAlign={column.align || 'left'}
                width={column.width}
              >
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row
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
              bg={striped && index % 2 === 1 ? 'gray.50' : 'transparent'}
              key={index}
              transition="background-color 0.2s"
            >
              {columns.map((column) => (
                <Table.Cell
                  _dark={{ borderColor: 'gray.600' }}
                  borderColor="gray.200"
                  fontSize="sm"
                  key={column.key}
                  px={4}
                  py={3}
                  textAlign={column.align || 'left'}
                  verticalAlign="top"
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
}
