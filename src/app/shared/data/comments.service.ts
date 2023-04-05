import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Comment } from 'src/app/shared/interfaces/forms';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private db: Dexie;

  constructor() {
    this.db = new Dexie('comments');
    this.db.version(1).stores({
      comments: '++id,pubID,author,content,reactions'
    });
  }

  async addComment(comment: Comment): Promise<void> {
    await this.db.table('comments').put(comment);
  }

  async getComments(): Promise<Comment[]> {
    return await this.db.table('comments').toArray();
  }
}
