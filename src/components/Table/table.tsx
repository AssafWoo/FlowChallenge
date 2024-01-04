import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Search from "./search";

type Data = Record<string, unknown>;

interface TableProps<T extends Data> {
  columns: ColumnDef<T>[];
  data: T[];
}

const Table = <T extends Data>({ columns, data }: TableProps<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15, // Future - make this dynamic so each table can have its own page size
  });
  const [searchTerm, setSearchTerm] = useState("");
  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return searchTerm === "" || matchesSearchTerm;
    });
  }, [data, searchTerm]);

  const pageCount = Math.ceil(filteredData.length / pagination.pageSize);
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const tableInstance = useReactTable<T>({
    data: currentPageData,
    columns,
    state: {
      pagination: pagination,
    },
    manualPagination: true, // Future - use the library pagination features. This will require a refactor of the pagination controls
    pageCount: pageCount,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box
        overflowX="auto"
        border="1px solid #eee"
        borderRadius={"15px"}
        marginBottom={"1rem"}
      >
        <ChakraTable width="100%" size="sm">
          <Thead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    width="12rem"
                    key={header.id}
                    backgroundColor="#5CAFFF"
                    color="white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {tableInstance.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    maxWidth="12rem"
                    key={cell.id}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </Box>
    </>
  );
};

export default Table;
