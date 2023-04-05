export interface Form {
  id?: number;
  name: string;
  email: string;
  reason: number;
  message: string;
}
export interface IComment {
  id?: number;
  pubId: number;
  content: string;
  reactions: number;
  name: string;
}

export class Comment {
  pubID: number = 0;
  author: string = '';
  content: string = '';
  reactions: { [key: string]: number } = {};
}
