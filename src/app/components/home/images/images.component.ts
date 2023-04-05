import { Component, OnInit } from '@angular/core';
import {
  Storage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/shared/data/comments.service';
import {
  DexieService,
  ImageComment,
  ImageReaction,
} from 'src/app/shared/data/dexie.service';
import { Comment } from 'src/app/shared/interfaces/forms';

interface Image {
  id: number;
  title: string;
  url: string;
  showCommentForm: boolean;
  showReactionForm: boolean;
  author: string;
  commentText: string;
  reaction: string;
  comments: ImageComment[];
  reactions: ImageReaction[];
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  comments: Comment[] = [];
  newComment: Comment = new Comment();

  categories = [
    'Recientes',
    'Boda - novios',
    'Cumpleaños',
    'Graduación',
    'Otras',
  ];
  showVideo: boolean = false;
  showImage: boolean = false;
  formComment: FormGroup;
  images: any[];
  imgNew: any[];
  detailsImg;
  showGalery = true;
  id: number = 1;
  constructor(
    private dexieService: DexieService,
    private commentService: CommentService,
    private storage: Storage
  ) {
    this.formComment = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(7)]),
      message: new FormControl(),
    });
    this.images = [];
    this.imgNew = [];
    this.detailsImg = '';
  }

  async ngOnInit(): Promise<void> {
    this.getImages();
    this.dexieService.imageComments.toArray().then((comments) => {
      for (const comment of comments) {
        const image = this.imgNew.find((image) => image.id === comment.imageId);
        if (image) {
          image.comments.push(comment);
        }
      }
    });

    this.dexieService.imageReactions.toArray().then((reactions) => {
      for (const reaction of reactions) {
        const image = this.imgNew.find(
          (image) => image.id === reaction.imageId
        );
        if (image) {
          image.reactions.push(reaction);
        }
      }
    });
  }

  getImages() {
    const imgRef = ref(this.storage, 'images');
    listAll(imgRef).then(async (res) => {
      this.images = [];
      for (let item of res.items) {
        const url = await getDownloadURL(item);
        this.images.push(url);
        this.id++;
        let newImagen = {
          id: this.id,
          title: 'Photo 1',
          url: url,
        };
        this.imgNew.push(newImagen);
        console.log('newImagen', newImagen);
      }
    });
  }
  getCategory(category?: string) {
    if (category === undefined || category === 'Recientes') {
      category = 'images';
    }
    const imgRef = ref(this.storage, category);
    listAll(imgRef).then(async (res) => {
      this.images = [];
      for (let item of res.items) {
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    });
  }
  details(img: string) {
    this.showGalery = !this.showGalery;
    this.detailsImg = img;
  }
  back() {
    this.showGalery = !this.showGalery;
  }

  // async loadComments(): Promise<void> {
  //   this.comments = await this.commentService.getComments();
  //   console.log('Comment',this.comments);
  // }

  // async addComment(): Promise<void> {
  //   if (this.newComment.author && this.newComment.content) {
  //     await this.commentService.addComment(this.newComment);
  //     this.newComment = new Comment();
  //     await this.loadComments();
  //   }
  // }

  // async addReaction(comment: Comment, reaction: string): Promise<void> {
  //   if (!comment.reactions[reaction]) {
  //     comment.reactions[reaction] = 1;
  //   } else {
  //     comment.reactions[reaction]++;
  //   }
  //   await this.commentService.addComment(comment);
  //   await this.loadComments();
  // }

  submitComment(image: any) {
    console.log('image', image);
    const comment: ImageComment = {
      imageId: image.id,
      author: image.author,
      text: image.commentText,
      createdAt: new Date(),
    };
    console.log('comment', comment);
    this.dexieService.imageComments.add(comment).then((id) => {
      comment.id = id;
      image.comments.push(comment);
      image.commentText = '';
      image.showCommentForm = false;
    });
  }
  submitReaction(image: Image) {
    const reaction: ImageReaction = {
      imageId: image.id,
      reaction: image.reaction,
      createdAt: new Date(),
    };

    this.dexieService.imageReactions.add(reaction).then((id) => {
      reaction.id = id;
      image.reactions.push(reaction);
      image.showReactionForm = false;
    });
  }
  comment() {
    for (const img of this.imgNew) {
      let newImagen = {
        author: this.formComment.value.name,
        showCommentForm: false,
        showReactionForm: false,
        commentText: this.formComment.value.message,
        reaction: 'like',
        comments: [],
        reactions: [],
      };
      this.imgNew.push(newImagen);
    }
    this.submitComment(this.imgNew);
  }
}
