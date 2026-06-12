// Types for the Carplus Pneus virtual store

export interface Tire {
  id: string;
  brand: string;
  name: string;
  price: number;
  promoPrice?: number;
  image: string;
  width: number;
  aspectRatio: number;
  rim: number;
  model: string;
  isOffer?: boolean;
}

export interface CartItem {
  tire: Tire;
  quantity: number;
}

export interface CarModel {
  id: string;
  brand: 'Fiat' | 'Volkswagen' | 'Chevrolet' | 'Hyundai' | 'Toyota' | 'Honda' | 'Renault' | 'Ford' | 'Jeep';
  name: string;
  yearRange: string;
  recommendedTireRatio: string; // e.g. "175/65/14" or "195/55/15"
}

export interface ServiceRecord {
  id: string;
  plate: string;
  vehicle: string;
  ownerName: string;
  date: string;
  services: string[];
  total: number;
  status: 'Concluído' | 'Agendado' | 'Em Andamento';
  km: number;
}
