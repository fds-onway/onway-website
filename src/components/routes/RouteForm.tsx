import { PointForm } from './PointForm';
import { PointsList } from './PointsList';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { CreateRouteDTO, ImageDTO, PointDTO } from '../../types/route';
import { TagsSelect } from './TagsSelect';
import { ImageDropzone } from './ImageDropzone';
import { RouteMap } from './RouteMap';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldGroup,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

// TODO: importar componentes de tags, dropzone, mapa, lista de pontos

const initialRoute: CreateRouteDTO = {
  name: '',
  description: '',
  tags: [],
  images: [],
  points: [],
};

export function RouteForm({
  onSubmit,
}: {
  onSubmit: (data: CreateRouteDTO) => Promise<void> | void;
}) {
  const [editingPointIdx, setEditingPointIdx] = useState<number | null>(null);

  function handlePointFormChange(updated: PointDTO) {
    if (editingPointIdx !== null) {
      setRoute({
        ...route,
        points: route.points.map((p, i) =>
          i === editingPointIdx ? updated : p,
        ),
      });
    }
  }

  function handleClosePointForm() {
    setEditingPointIdx(null);
  }

  function handleRemovePoint(index: number) {
    setRoute({
      ...route,
      points: route.points.filter((_, i) => i !== index),
    });
  }

  function handleReorderPoint(from: number, to: number) {
    const updated = [...route.points];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setRoute({ ...route, points: updated });
  }
  const [route, setRoute] = useState<CreateRouteDTO>(initialRoute);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setRoute({ ...route, [e.target.name]: e.target.value });
  }

  function handleTagsChange(tags: string[]) {
    setRoute({ ...route, tags });
  }

  function handleImagesChange(images: ImageDTO[]) {
    setRoute({ ...route, images });
  }

  function handleAddPoint(lat: string, lng: string) {
    setRoute({
      ...route,
      points: [
        ...route.points,
        {
          name: '',
          type: 'natureza',
          description: '',
          latitude: lat,
          longitude: lng,
          images: [],
        },
      ],
    });
  }

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(route);
      toast.success('Rota cadastrada com sucesso!');
      navigate('/routes');
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao cadastrar rota');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-12">
        {/* Box principal da rota */}
        <Card className="col-span-12 shadow-sm border rounded-lg bg-white p-6">
          <FieldGroup className="gap-6">
            <Field>
              <FieldLabel>Nome da rota</FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  name="name"
                  value={route.name}
                  onChange={handleChange}
                  required
                  className="col-span-9"
                  placeholder="Nome da rota"
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Descrição</FieldLabel>
              <FieldContent>
                <Textarea
                  id="description"
                  name="description"
                  value={route.description}
                  onChange={handleChange}
                  required
                  placeholder="Descreva a rota com detalhes, dicas, etc."
                  className="min-h-[100px]"
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldContent>
                <TagsSelect
                  value={route.tags}
                  onChange={handleTagsChange}
                  availableTags={[
                    'Fé',
                    'Tradição',
                    'Cultura',
                    'Natureza',
                    'Comunidade',
                  ]}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Imagens da rota</FieldLabel>
              <FieldContent>
                <ImageDropzone
                  images={route.images}
                  onChange={handleImagesChange}
                />
              </FieldContent>
            </Field>
          </FieldGroup>
        </Card>
        {/* Box de pontos e mapa */}
        <Card className="col-span-12 shadow-sm border rounded-lg bg-white p-6 mt-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <PointsList
                points={route.points}
                onEdit={(idx) => setEditingPointIdx(idx)}
                onRemove={handleRemovePoint}
                onReorder={handleReorderPoint}
              />
            </div>
            <div className="col-span-6">
              <RouteMap points={route.points} onAddPoint={handleAddPoint} />
            </div>
          </div>
        </Card>
      </div>
      <Dialog
        open={editingPointIdx !== null}
        onOpenChange={(open) => {
          if (!open) handleClosePointForm();
        }}
      >
        <DialogContent className="bg-white border border-gray-200 rounded-lg shadow-lg max-w-md w-full p-6 z-[9999]">
          {editingPointIdx !== null && (
            <PointForm
              value={route.points[editingPointIdx]}
              onChange={handlePointFormChange}
            />
          )}
        </DialogContent>
      </Dialog>
      <button
        type="submit"
        onClick={(e) => void handleSubmit(e)}
        className="cursor-point bg-blue-600 text-white px-4 py-2 rounded mt-6"
        disabled={submitting}
      >
        {submitting ? 'Salvando...' : 'Salvar rota'}
      </button>
    </>
  );
}
