import Dexie from 'dexie';

export interface ImageComment {
  id?: number;
 imageId: number;
 author: string;
  text: string;
  createdAt: Date;
}

export interface ImageReaction {
  id?: number;
 imageId: number;
  reaction: string;
  createdAt: Date;
}

export class DexieService extends Dexie {
 imageComments: Dexie.Table<ImageComment, number>;
 imageReactions: Dexie.Table<ImageReaction, number>;

  constructor() {
    super('MiBaseDeDatos');
    this.version(1).stores({
     imageComments: '++id,imageId,text,createdAt',
     imageReactions: '++id,imageId,reaction,createdAt',
    });
    this.imageComments = this.table('imageComments');
    this.imageReactions = this.table('imageReactions');
  }
}
