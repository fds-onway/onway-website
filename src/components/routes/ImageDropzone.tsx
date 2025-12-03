import { useRef } from 'react';
import { uploadImage } from '@/services/routeService';
import { toast } from 'react-toastify';
import { ImagePlus } from 'lucide-react';

interface ImageDropzoneProps {
  images: { fileName: string; imageUrl: string }[];
  onChange: (images: { fileName: string; imageUrl: string }[]) => void;
}

export function ImageDropzone({ images, onChange }: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      try {
        const img = await uploadImage(file);
        onChange([...images, img]);
      } catch (err: any) {
        toast.error('Erro ao fazer upload da imagem: ' + (err.message || ''));
      }
    }
  }

  function handleRemove(index: number) {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => void handleFiles(e.target.files)}
        className="hidden"
      />
      <div className="flex gap-2 mt-2 flex-wrap">
        {images.map((img, idx) => (
          <div key={img.fileName + idx} className="relative">
            <img
              src={img.imageUrl}
              alt={img.fileName}
              className="w-20 h-20 object-cover rounded"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              onClick={() => handleRemove(idx)}
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-20 h-20 flex items-center justify-center border-2 border-dashed rounded bg-muted/30 text-muted-foreground hover:bg-muted/50 transition"
        >
          <ImagePlus size={32} />
        </button>
      </div>
    </div>
  );
}
