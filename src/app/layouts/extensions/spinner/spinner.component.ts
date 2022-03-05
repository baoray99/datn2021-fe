import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/utils/services/loading/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  isShow: boolean = false;
  constructor(
    private loadingService: LoadingService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.loadingService.getSpinnerObserver().subscribe((status) => {
      this.isShow = status === 'start';
      this.cdref.detectChanges();
    });
  }
}
