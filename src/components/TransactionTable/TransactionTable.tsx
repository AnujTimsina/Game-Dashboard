import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  Grid,
  GridItem,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { DropdownBlackIcon, DropdownCloseIcon } from 'src/assets/images';
import { IMobileTransaction, Transaction } from 'src/interfaces/transaction';

export type TransactionTableProps<Transaction extends object> = {
  // data: Transaction[];
  columns: ColumnDef<Transaction, any>[];
  transactions: Transaction[];
  mobileData: IMobileTransaction[];
};

export function TransactionTable<Data extends object>({
  // data,
  columns,
  transactions: data,
  mobileData,
}: TransactionTableProps<Transaction>) {
  const [showDetails, setShowDetails] = React.useState(data.map(() => false));

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      <Box p={'35px'} display={{ base: 'none', lg: 'block' }} overflow={'auto'}>
        <Table variant={'unstyled'}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta: any = header.column.columnDef.meta;
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      border={'1px solid rgba(255, 255, 255, 0.25)'}
                      fontWeight={'600'}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // console.log('row', cell.column.columnDef.header);
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      border={'1px solid rgba(255, 255, 255, 0.25)'}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {/* <p style={{ color: 'red' }}>
                        {cell.column.columnDef.header ?? ''}
                      </p> */}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <VStack display={{ base: 'flex', lg: 'none' }} gap={'1rem'}>
        {mobileData.map((item, id) => (
          <Grid
            key={id}
            templateColumns="repeat(3, 1fr)"
            gap={4}
            w={'100%'}
            borderRadius="10px"
            background="searchBg"
            p={{ base: '1rem 0.5rem', lg: '1rem 1.5rem' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.35), 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 4px 0px 0px rgba(0, 0, 0, 0.35)"
          >
            <GridItem
              colSpan={2}
              display="flex"
              justifyContent={'space-between'}
            >
              <Text variant={'dateContent'}>{item.id.header}</Text>
              <Text variant={'dateContentValue'} textAlign="center">
                {item.id.value}
              </Text>
            </GridItem>
            <GridItem colSpan={1} justifyContent={'flex-end'} display="flex">
              <Flex
                bg={'yellowBg'}
                borderRadius={'full'}
                w={'21px'}
                h={'21px'}
                alignItems={'center'}
                justifyContent={'center'}
                transition={'opacity 0.5s ease-in-out'}
                onClick={() => {
                  const newShowDetails = [...showDetails];
                  newShowDetails[id] = !newShowDetails[id];
                  setShowDetails(newShowDetails);
                }}
              >
                {showDetails[id] ? (
                  <DropdownCloseIcon />
                ) : (
                  <DropdownBlackIcon />
                )}
              </Flex>
            </GridItem>
            <GridItem
              colSpan={2}
              style={{
                transition: 'opacity 1s ease-in',
                opacity: showDetails ? 1 : 0,
              }}
            >
              {showDetails[id] &&
                Object.values(item)
                  .slice(2)
                  .map((el) => {
                    // console.log(el.value);
                    return (
                      <HStack w={'100%'} justify={'space-between'}>
                        <Text variant={'dateContent'}>{el.header}</Text>
                        {typeof el.value === 'string' ||
                        typeof el.value === 'number' ? (
                          <Text variant={'dateContentValue'}>{el.value}</Text>
                        ) : (
                          el.value
                        )}
                      </HStack>
                    );
                  })}
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </>
  );
}
