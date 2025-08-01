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
      title: 'TalentRx',
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
      returnValue: () => this.menuItems(),
    };

    const canvasRef = this.offCanvasService.open(options);

    canvasRef.result.then(
      (result) => {
        console.log(result);
        if (result?.action !== 'secondary') {
          this.menuItems.set(result);
        }
      },
      () => console.log('Dismissed'),
    );
  }
}
