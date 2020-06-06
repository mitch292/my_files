export interface MyFile {
  name: string;
  type: string;
  originLocation: string;
  destination_dir: string;
}

export interface MyFileResponseObjectBody {
  success: boolean;
  msg?: string;
  body?: any;
}
