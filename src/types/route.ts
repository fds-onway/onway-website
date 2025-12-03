export interface RouteListItem {
  id: number;
  name: string;
  description: string;
  tags: string[];
  rating: number;
  ratingCount: number;
  image: string;
}

export interface ImageDTO {
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
  images: ImageDTO[];
}

export interface CreateRouteDTO {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  images: ImageDTO[];
  points: PointDTO[];
}
