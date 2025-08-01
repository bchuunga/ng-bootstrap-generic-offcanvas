import { Component, Input, Signal } from '@angular/core';
import { Menu } from '../navbar/navbar.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() menuItems!: Signal<Menu[]>;
}
