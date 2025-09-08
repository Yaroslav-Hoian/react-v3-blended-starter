import type { ReactNode } from "react";

export interface Photo {
  id: number;
  alt: string;
  avg_color: string;
  src: {
    large: string;
    original: string;
  };
}

export interface PhotoHTTPResponse {
  page: number;
  per_page: number;
  photos: Photo[];
}

export interface ContainerProps {
  children: ReactNode;
}
