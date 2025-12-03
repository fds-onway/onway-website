import { useState } from 'react';
import {
  TableListDefault,
  type TableColumn,
  type TableAction,
} from './TableListDefault';
import { ConfirmModal } from './ConfirmModal';
import type { RouteListItem } from '../types/route';

interface RouteListProps {
  routes: RouteListItem[];
  onEdit: (route: RouteListItem) => void;
  onDelete: (route: RouteListItem) => void;
}

export function RouteList({ routes, onEdit, onDelete }: RouteListProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<RouteListItem | null>(
    null,
  );

  const columns: TableColumn<RouteListItem>[] = [
    {
      key: 'image',
      label: 'Imagem',
      render: (image: any) => {
        return image ? (
          <img
            src={image}
            alt="Imagem da rota"
            className="w-11 h-11 object-cover rounded"
          />
        ) : (
          <span className="text-gray-400">Sem imagem</span>
        );
      },
    },
    { key: 'name', label: 'Nome' },
    {
      key: 'description',
      label: 'Descrição',
      render: (description) => {
        return (
          <div className="flex gap-1 text-wrap">
            {description.toString().substring(0, 40)}
          </div>
        );
      },
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (tags) => {
        let tagArray: string[] = [];
        if (Array.isArray(tags)) {
          tagArray = tags;
        } else if (typeof tags === 'string') {
          tagArray = [tags];
        }
        return (
          <div className="flex gap-1 flex-wrap">
            {tagArray.length === 0 ? (
              <span className="text-gray-400">Sem tags</span>
            ) : (
              tagArray.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))
            )}
          </div>
        );
      },
    },
  ];

  const actions: TableAction<RouteListItem>[] = [
    {
      label: 'Editar',
      color: 'bg-yellow-500 text-white',
      onClick: onEdit,
    },
    {
      label: 'Excluir',
      color: 'bg-red-600 text-white',
      onClick: (route) => {
        setRouteToDelete(route);
        setModalOpen(true);
      },
    },
  ];

  function handleConfirmDelete() {
    if (routeToDelete) {
      onDelete(routeToDelete);
      setRouteToDelete(null);
      setModalOpen(false);
    }
  }

  function handleCancelDelete() {
    setRouteToDelete(null);
    setModalOpen(false);
  }

  return (
    <>
      <TableListDefault columns={columns} data={routes} actions={actions} />
      <ConfirmModal
        open={modalOpen}
        title="Confirmar exclusão"
        message={`Deseja realmente excluir a rota "${routeToDelete?.name}"? Essa ação não poderá ser desfeita.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
