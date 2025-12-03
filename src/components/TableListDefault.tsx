import React from 'react';
import type { ReactNode } from 'react';

export interface TableColumn<T extends object> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  color?: string;
}

interface TableListDefaultProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
}
interface TableListDefaultProps<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
}

export function TableListDefault<T extends object>({
  columns,
  data,
  actions,
}: TableListDefaultProps<T>) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 text-left border-b font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="px-4 py-2 border-b">Ações</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-4 py-6 text-center text-gray-400"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-2 border-b min-h-[64px] align-middle"
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : (row[col.key] as ReactNode)}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="px-4 py-2 border-b flex gap-2 items-center min-h-[64px]">
                    {actions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        className={`px-2 py-1 rounded text-sm font-medium ${action.color || 'bg-blue-600 text-white'}`}
                        onClick={() => action.onClick(row)}
                        title={action.label}
                      >
                        {action.icon || action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
