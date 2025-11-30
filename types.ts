export interface ServiceData {
  id: string;
  date: string;
  location: string;
  time: string;
}

export interface Provider {
  name: string;
  email: string;
  whatsapp: string;
  roles: string[];
  avatarUrl: string;
}

export interface Client {
  name: string;
  whatsapp: string;
}

export interface DeviceInfo {
  brand: string;
  model: string;
  storage: string;
  firmware: string;
  mode: string;
  drive: string;
  cables: string;
  adapter: string;
}

export interface ComponentStatus {
  name: string;
  status: 'clean' | 'good' | 'warning' | 'critical';
  details?: string;
}

export interface ThermalSpecs {
  name: string;
  conductivity: number; // W/mK
  resistance: number; // K/W
  tempRange: string;
}
