import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MoviePreview } from '../../models/movie-preview';
import { MovieDetail } from 'src/app/models/movies-detail';

import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() moviesList: MoviePreview[];
  @Input() category: string;
  @Input() openCategory: string;
  @Output() sliderOpen = new EventEmitter();
  @Output() sliderClose = new EventEmitter();
  @Output() toggleMyList = new EventEmitter();

  isContinue: boolean;
  tabShow: boolean = false;
  movies: MoviePreview[];
  moviesLength: number;
  // slider의 총 개수
  slider: number;
  // Tab 배열
  tab = [];
  tabLength;
  // 현재 slider
  sliderState = 1;
  // 현재 슬라이더 위치
  sliderPosition = 0;
  // padding 제거 후 기본 x 좌표
  XState = -16.897;
  // 한 slider 당 길이
  OneSliderLength = 99.8766666666667;
  // default 버튼, padding 삭제
  default = false;
  // transform, transition
  transform: any;
  transition: any;
  // slice 배열 저장
  sliderZero;
  sliderForth;
  // hover한 카드 id
  bobup: number;
  // 슬라이더 당 카드 개수
  cardCount: number = 6;
  // hover한 카드 0 ~ 7
  hoverCard: number = 8;
  cardTransform: any;
  cardTransition: any;
  bobScale = 'scale(0.52222)';
  cardMove: boolean = false;
  cardShowNumber;
  isOpen: boolean = false;
  moviesDetail: MovieDetail;
  hoverTimer;
  movieGood: boolean = false;
  movieBad: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.isOpen = this.category === this.openCategory;

    if (this.moviesList && this.moviesList.length === 0) return;

    if (this.moviesList.length > 0) {
      this.isContinue = this.category === '시청 중인 콘텐츠' ? true : false;

      this.movies = this.moviesList.map((movie, index) => ({
        ...movie,
        order: index + 1,
      }));

      this.moviesLength = this.moviesList.length;

      if (this.default) {
        this.moviesClone();
      }
      this.slider = this.movies.length / this.cardCount;
      this.tabArray();
    }
  }

  tabArray() {
    this.tab = [];
    for (let i = 1; i <= this.slider; i++) {
      this.tab = [...this.tab, i];
    }
    // Tab의 길이
    this.tabLength = this.tab.length;
  }

  moviesClone() {
    this.sliderZero = this.movies.slice(this.movies.length - 7);
    this.sliderForth = this.movies.slice(0, 7);
    this.movies = this.sliderZero.concat(this.movies).concat(this.sliderForth);
  }

  prev() {
    this.transform = `translate3d(${this.sliderPosition +
      this.OneSliderLength}%, 0px, 0px)`;
    this.transition = `transform 0.75s ease 0s`;
    this.sliderPosition = this.sliderPosition + this.OneSliderLength;

    this.sliderState--;
    if (this.sliderState === 0) {
      this.sliderState = this.tabLength;

      setTimeout(() => {
        this.transform = `translate3d(${this.XState -
          this.OneSliderLength * this.sliderState}%, 0px, 0px)`;
        this.transition = `none`;
        this.sliderPosition =
          this.XState - this.OneSliderLength * this.sliderState;
      }, 750);
    }
  }

  next() {
    this.sliderState++;
    this.transform = `translate3d(${this.sliderPosition -
      this.OneSliderLength}%, 0px, 0px)`;
    this.transition = `transform 0.75s ease 0s`;
    this.sliderPosition = this.sliderPosition - this.OneSliderLength;
    if (!this.default) {
      setTimeout(() => {
        // movies 뒷부분 clone
        this.moviesClone();
        this.transform = `translate3d(${this.XState -
          this.OneSliderLength * this.sliderState}%, 0px, 0px)`;
        this.transition = `none`;
        this.default = true;
        this.sliderPosition =
          this.XState - this.OneSliderLength * this.sliderState;
      }, 750);
    }

    if (this.sliderState === this.tabLength + 1) {
      this.sliderState = 1;

      setTimeout(() => {
        this.transform = `translate3d(${this.XState -
          this.OneSliderLength * this.sliderState}%, 0px, 0px)`;
        this.transition = `none`;
        this.sliderPosition =
          this.XState - this.OneSliderLength * this.sliderState;
      }, 750);
    }
  }

  hoverTimeout(movieOrder, movieId) {
    this.hoverTimer = setTimeout(() => {
      this.cardHover(movieOrder, movieId);
    }, 500);
  }

  hoverTimeoutClear() {
    clearTimeout(this.hoverTimer);
    this.cardHoverLeave();
  }

  cardHover(movieOrder: number, movieId: number) {
    if (!this.isOpen) {
      this.bobup = movieOrder;
      setTimeout(() => {
        this.bobScale = 'scale(0.99999)';
      }, 200);
    }
    this.cardMove = true;

    this.hoverCard =
      movieOrder % this.cardCount !== 0 ? movieOrder % this.cardCount : 6;

    this.hoverMoviesDetail(movieId);
  }

  cardHoverLeave() {
    this.cardMove = false;
    this.bobScale = 'scale(0.52222)';
    setTimeout(() => {
      this.bobup = 0;
      if (!this.isOpen) {
        this.moviesDetail = undefined;
      }
    }, 300);
  }

  // 보여주고 있는 카드 숫자 부여
  showNumber(movieOrder) {
    const showNumber = movieOrder % this.cardCount;
    const quotient =
      Math.floor(movieOrder / this.cardCount) === this.sliderState - 1
        ? showNumber
        : 0;
    // console.log(quotient);
    if (this.sliderState === 1 && movieOrder === 18) {
      this.cardShowNumber = showNumber;
      return this.cardShowNumber;
    }
    if (this.sliderState === 1 && (movieOrder === 6 || movieOrder === 7)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    if (this.sliderState === 2 && (movieOrder === 12 || movieOrder === 13)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    if (this.sliderState === 3 && (movieOrder === 18 || movieOrder === 1)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    this.cardShowNumber = quotient;
    return this.cardShowNumber;
  }

  // bobup 시 left 값 주기
  bobupLeft() {
    if (this.hoverCard === 1) return 0;
    else if (this.hoverCard === 6) return -94.5;
    return -47.5;
  }

  // 어디서 bobup이 될 것인지 정해주기
  bobupTransformOrigin() {
    if (this.hoverCard === 1) return 'left';
    else if (this.hoverCard === 6) return 'right';
    return;
  }

  showDetail() {
    this.bobup = 0;
    this.isOpen = true;
    this.sliderOpen.emit(this.category);
  }

  detailClosed() {
    this.sliderClose.emit(this.category);
    this.cardMove = false;
  }

  hoverMoviesDetail(movieId: number) {
    if (!movieId) return;

    this.movieService.getMovieDetail(movieId).subscribe(
      detail => {
        this.moviesDetail = detail;
      },
      error => {
        console.log(error);
      }
    );
  }

  likeMovie(id: number) {
    this.movieService.likeMovie(id).subscribe(
      ({ response }) => {
        this.moviesDetail.like = response ? 1 : 0;
      },
      error => console.error(error)
    );
  }

  dislikeMovie(id: number) {
    this.movieService.dislikeMovie(id).subscribe(
      ({ response }) => {
        this.moviesDetail.like = response ? 2 : 0;
      },
      error => console.error(error)
    );
  }

  myList(movie: MovieDetail) {
    this.movieService.myList(movie.id).subscribe(
      ({ marked }) => {
        movie.marked = marked;
        this.toggleMyList.emit();
      },
      error => console.error(error)
    );
  }
}
