export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  displayName: string;
  bio?: string;
  profileImageUrl?: string;
  appearance: {
    theme: string;
    backgroundColor: string;
    buttonColor: string;
    font: string;
  };
}

export interface Link {
  _id: string;
  owner: string;
  title: string;
  url: string;
  isActive: boolean;
  order: number;
  clicks: number;
}
