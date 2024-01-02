"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database, Pix } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { MoreHorizontal } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const pixColumns: ColumnDef<Pix>[] = [
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "created_at",
    header: "Criado às",
    cell(props) {
      return new Date(props.row.original.created_at).toLocaleString();
    },
  },
  {
    accessorKey: "buyer_name",
    header: "Nome",
  },
  {
    accessorKey: "buyer_doc",
    header: "CPF",
  },
  {
    accessorKey: "buyer_email",
    header: "Email",
  },
  {
    accessorKey: "buyer_phone",
    header: "Telefone",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const supabaseBrowserClient = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      async function deleteInfo(id: number) {
        console.log({ id });
        const { data, error } = await supabaseBrowserClient
          .from("pix")
          .delete()
          .eq("id", id);
        console.log({ data, error });
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="bg-white opacity-50 cursor-pointer hover:bg-white hover:opacity-70"
          >
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => await deleteInfo(row.original.id)}
            >
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function PixDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table className="text-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
