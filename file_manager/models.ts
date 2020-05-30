export interface File {
  short_name: string;
  name: string;
  fileType: string;
  origin_location: string;
  destination_dir: string;
  createdAt: number;
  updatedAt: number;
}

export interface FileResponseObject {
  success: boolean;
  msg?: string;
  body?: any;
}
