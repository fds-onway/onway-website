import React from 'react';
import type { PointDTO } from '../../types/route';
import { GripVertical, Trash2 } from 'lucide-react';

interface PointsListProps {
  points: PointDTO[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onReorder: (from: number, to: number) => void;
}

export function PointsList({
  points,
  onEdit,
  onRemove,
  onReorder,
}: PointsListProps) {
  const [dragged, setDragged] = React.useState<number | null>(null);

  function handleDragStart(idx: number) {
    setDragged(idx);
  }
  function handleDrop(idx: number) {
    if (dragged !== null && dragged !== idx) {
      onReorder(dragged, idx);
    }
    setDragged(null);
  }

  return (
    <div className="mt-4">
      <label className="font-semibold mb-2 block">Pontos da rota</label>
      <ul className="space-y-2">
        {points.map((point, idx) => (
          <li
            key={idx}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(idx)}
            className="bg-white border border-gray-200 rounded flex items-center gap-2 px-3 py-2 cursor-pointer hover:shadow-sm transition group"
            onClick={() => onEdit(idx)}
          >
            <span className="mr-2 text-gray-400 group-hover:text-gray-600 cursor-grab">
              <GripVertical size={20} />
            </span>
            <div className="flex-1">
              <div className="font-medium text-base">
                {point.name || 'Sem nome'}
              </div>
              <div className="text-xs text-muted-foreground">{point.type}</div>
            </div>
            <button
              type="button"
              className="text-red-600 ml-2 p-1 hover:bg-red-50 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(idx);
              }}
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
