export interface File {
  name: string;
  type: string;
  originLocation: string;
  destination_dir: string;
}

export interface FileResponseObject {
  success: boolean;
  msg?: string;
  body?: any;
}
