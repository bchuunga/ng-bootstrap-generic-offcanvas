import { Component, signal } from '@angular/core';
import { OffCanvasService } from '../services/off-canvas.service';
import { OffCanvasOptions } from '../interfaces/off-canvas-options';
import { SidenavComponent } from '../sidenav/sidenav.component';

export interface Menu {
  title: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuItems = signal<Menu[]>([
    { title: 'Home', route: '/' },
    { title: 'About', route: '/about' },
    { title: 'Contact', route: '/contact' },
  ]);

  constructor(private readonly offCanvasService: OffCanvasService) {}

  openSidenav() {
    const options: OffCanvasOptions = {
      component: SidenavComponent,
      title: 'Generic OffCanvas',
      primaryButtonText: 'Submit',
      secondaryButtonText: 'Cancel',
      closeOnPrimaryButtonClick: true,
      closeOnSecondaryButtonClick: true,
      position: 'start',
      scroll: true,
      backdrop: true,
      width: '25',
      isMobile: signal<boolean>(false),
      props: {
        menuItems: this.menuItems(),
      },
      showFooter: true,

      // Pass data through options
      primaryButtonAction: (data) => {
        console.log('Saved from sidenav:', data);
        this.menuItems.set(data);
      },

      // Pass data through options
      secondaryButtonAction: (data) => {
        console.log('Cancelled:', data);
      },
      returnValue: () => this.menuItems(),
    };

    const canvasRef = this.offCanvasService.open(options);

    // OffCanvas way to pass data
    canvasRef.result.then(
      (result) => {
        this.menuItems.set(result);
      },
      () => console.log('Dismissed'),
    );
  }
}
