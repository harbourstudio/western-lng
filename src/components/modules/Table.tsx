import type { TableFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

export default function Table({ section }: { section: TableFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const headerBgColor = cleanString(section?.headerBackgroundColor) || '';

  const columns = section?.columns || [];
  const rows = section?.rows || [];
  const caption = section?.caption;

  if (columns.length === 0) return null;

  return (
    <div className={`${spacingTop} ${spacingBottom}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-base overflow-hidden">
          {/* Table Header */}
          <thead>
            <tr className={`${headerBgColor} ${headerBgColor == 'bg-primary' ? 'text-dark' : 'text-white'}`}>
              {columns.map((column) => (
                <th
                  key={column._key}
                  className="px-6 py-4 text-center font-semibold"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row._key}
                className="odd:bg-white even:bg-gray-100"
              >
                {row.cells?.map((cell, cellIndex) => (
                  <td
                    key={cell._key || `cell-${rowIndex}-${cellIndex}`}
                    className="p-3 border-1 border-gray-400"
                  >
                    {cell.value}
                  </td>
                ))}
                {/* Fill empty cells if row has fewer cells than columns */}
                {row.cells && row.cells.length < columns.length &&
                  Array.from({ length: columns.length - row.cells.length }).map((_, i) => (
                    <td
                        key={`empty-${rowIndex}-${i}`}
                        className="p-3 border-1 border-gray-400"
                    >
                      &nbsp;
                    </td>
                  ))
                }
              </tr>
            ))}
          </tbody>
        </table>

        {/* Caption */}
        {caption && (
            <div className='py-2'>
                <p className="text-center text-gray-600 text-xs">
                    {caption}
                </p>
            </div>
        )}
      </div>
    </div>
  );
}