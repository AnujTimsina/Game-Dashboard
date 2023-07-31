import * as React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Hide,
  Show,
  Grid,
  GridItem,
  Text,
  Flex,
  HStack,
  Box,
  VStack,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { DropdownBlackIcon, DropdownCloseIcon } from 'src/assets/images';
import { GameData } from './GameUser';

export type DataTableProps<GameData extends object> = {
  data: GameData[];
  columns: ColumnDef<GameData, any>[];
};

export function DataTable<Data extends object>({
  data,
  columns,
}: DataTableProps<GameData>) {
  const [showDetails, setshowDetails] = React.useState(false);

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

  const reportDetails = [
    { title: 'Total Recharge', value: '0.0' },
    { title: 'Total Withdrawal', value: '0.0' },
    { title: 'Income', value: '0.0' },
    { title: 'Profit Percentage', value: '0.0' },
  ];

  interface mobileData {
    id: { header: 'ID'; value: JSX.Element };
    status: { header: 'Status'; value: JSX.Element };
    username: { header: 'Username'; value: string };
    nickname: { header: 'Nickname'; value: string };
    balance: { header: 'Balance'; value: number };
    create_time: { header: 'Create Time'; value: string };
    login_times: { header: 'Login Times'; value: number };
    last_login_times: { header: 'Last Login Times'; value: string };
    last_login_ip: { header: 'Last Login IP'; value: string };
    operation: { header: 'Operation'; value: JSX.Element };
  }

  const formattedData: mobileData[] = data.map((item) => {
    return {
      id: {
        header: 'ID',
        value: item.id,
      },
      status: {
        header: 'Status',
        value: item.status,
      },
      username: {
        header: 'Username',
        value: item.username,
      },
      nickname: {
        header: 'Nickname',
        value: item.nickname,
      },
      balance: {
        header: 'Balance',
        value: item.balance,
      },
      create_time: {
        header: 'Create Time',
        value: item.create_time,
      },
      login_times: {
        header: 'Login Times',
        value: item.login_times,
      },
      last_login_times: {
        header: 'Last Login Times',
        value: item.last_login_times,
      },
      last_login_ip: {
        header: 'Last Login IP',
        value: item.last_login_ip,
      },
      operation: { header: 'Operation', value: item.operation },
    };
  });

  return (
    <>
      <Box p={'35px'} display={{ base: 'none', lg: 'block' }}>
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
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <VStack display={{ base: 'flex', lg: 'none' }} gap={'1rem'}>
        {formattedData.map((item, id) => (
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
              <HStack gap={'16px'}>
                <Text variant={'dateContentValue'} textAlign="center">
                  {item.id.value}
                </Text>
                {item.status.value}
              </HStack>
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
                onClick={() => setshowDetails((prev) => !prev)}
              >
                {showDetails ? <DropdownCloseIcon /> : <DropdownBlackIcon />}
              </Flex>
            </GridItem>
            <GridItem
              colSpan={2}
              style={{
                transition: 'opacity 1s ease-in',
                opacity: showDetails ? 1 : 0,
              }}
            >
              {showDetails &&
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
