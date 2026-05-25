"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  ColumnDef, ColumnFiltersState, SortingState, VisibilityState,
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { AddCandidature } from "@/components/add-candidature"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  showToolbar?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showToolbar = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize: 15 } },
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <div>
      {showToolbar && (
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Rechercher"
            value={(table.getColumn("poste")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("poste")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">Colonnes</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddCandidature />
        </div>
      )}

      <div className="overflow-hidden rounded-md border overflow-x-auto">
        <Table className="table-fixed min-w-[800px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showToolbar && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} sur{" "}
            {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
          </div>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  aria-disabled={!table.getCanPreviousPage()}
                  className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {(() => {
                const current = table.getState().pagination.pageIndex
                const total = table.getPageCount()
                const pages: (number | "...")[] = []

                if (total <= 7) {
                  for (let i = 0; i < total; i++) pages.push(i)
                } else {
                  pages.push(0)
                  if (current > 3) pages.push("...")
                  for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++) pages.push(i)
                  if (current < total - 4) pages.push("...")
                  pages.push(total - 1)
                }

                return pages.map((page, i) =>
                  page === "..." ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => table.setPageIndex(page)}
                        isActive={current === page}
                        className="cursor-pointer"
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )
              })()}

              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  aria-disabled={!table.getCanNextPage()}
                  className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}