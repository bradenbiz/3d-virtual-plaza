import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'vapor-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  public canLock: boolean = true;

  public faCircleNotch = faCircleNotch;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {

  }


  public fastTravel(destinationRoute: string): void {
    // this.isMenuClosed = true;
    this.router.navigate([destinationRoute], {relativeTo: this.activatedRoute});
  }

}
