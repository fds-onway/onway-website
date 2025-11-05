import React, { useState } from 'react';
import type { PointDTO } from '../../types/route';
import { ImageDropzone } from './ImageDropzone';

const allowedTypes: PointDTO['type'][] = [
  'restaurante',
  'parque',
  'natureza',
  'servico',
  'hotel',
  'entretenimento',
  'miscelania',
];

interface PointFormProps {
  value: PointDTO;
  onChange: (point: PointDTO) => void;
}

export function PointForm({ value, onChange }: PointFormProps) {
  const [point, setPoint] = useState<PointDTO>(value);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setPoint({ ...point, [e.target.name]: e.target.value });
  }

  function handleImagesChange(images: PointDTO['images']) {
    setPoint({ ...point, images });
  }

  React.useEffect(() => {
    onChange(point);
    // eslint-disable-next-line
  }, [point]);

  return (
    <div className="space-y-2 p-2 border rounded bg-white">
      <div>
        <label htmlFor="name">Nome do ponto</label>
        <input
          id="name"
          name="name"
          value={point.name}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="type">Tipo</label>
        <select
          id="type"
          name="type"
          value={point.type}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        >
          {allowedTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={point.description}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label>Latitude</label>
        <input
          name="latitude"
          value={point.latitude}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label>Longitude</label>
        <input
          name="longitude"
          value={point.longitude}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <ImageDropzone images={point.images} onChange={handleImagesChange} />
    </div>
  );
}
