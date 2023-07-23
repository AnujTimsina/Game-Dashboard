// import * as React from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
// import {
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   ColumnDef,
//   SortingState,
//   getSortedRowModel,
// } from '@tanstack/react-table';

// export type DataTableProps<Data extends object> = {
//   data: Data[];
//   columns: ColumnDef<Data, any>[];
// };

// export function MobileDataTable<Data extends object>({
//   data,
//   columns,
// }: DataTableProps<Data>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const table = useReactTable({
//     columns,
//     data,
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       sorting,
//     },
//   });

//   const headings = table.getHeaderGroups()[0].headers.map((header) => {
//     const meta: any = header.column.columnDef.meta;
//     return meta?.header || '';
//   });

//   const values = table
//     .getRowModel()
//     .rows[0].getVisibleCells()
//     .map((cell) => {
//       return flexRender(cell.column.columnDef.cell, cell.getContext());
//     });

//   return (
//     <Table variant={'unstyled'}>
//       <Thead>
//         <Tr>
//           <Th>Column 1</Th>
//           <Th>Column 2</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {headings.map((heading, index) => (
//           <Tr key={index}>
//             <Td>{heading}</Td>
//             <Td>{values[index]}</Td>
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//   );
// }

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const VerticalTable = ({
  data,
}: {
  data: {
    Name: string;
    Age: number;
    Email: string;
    Occupation: string;
    Country: string;
  };
}) => {
  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Attribute</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.entries(data).map(([key, value]) => (
          <Tr key={key}>
            <Td>{key}</Td>
            <Td>{value}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default VerticalTable;
