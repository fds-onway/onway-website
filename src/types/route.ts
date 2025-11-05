export interface ImageRouteDTO {
  fileName: string;
  imageUrl: string;
}

export interface PointDTO {
  name: string;
  type:
    | 'restaurante'
    | 'parque'
    | 'natureza'
    | 'servico'
    | 'hotel'
    | 'entretenimento'
    | 'miscelania';
  description: string;
  latitude: string;
  longitude: string;
  images: ImagePointDTO[];
}

export interface ImagePointDTO {
  fileName: string;
  imageUrl: string;
}

export interface CreateRouteDTO {
  name: string;
  description: string;
  tags: string[];
  images: ImageRouteDTO[];
  points: PointDTO[];
}
