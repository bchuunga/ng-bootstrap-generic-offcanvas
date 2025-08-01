import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OffCanvasOptions } from '../interfaces/off-canvas-options';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-off-canvas-wrapper',
  templateUrl: './off-canvas-wrapper.component.html',
  styleUrl: './off-canvas-wrapper.component.scss',
})
export class OffCanvasWrapperComponent implements AfterViewInit {
  @Input() options: OffCanvasOptions = {} as OffCanvasOptions;

  @ViewChild('dynamicContent', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  private componentRef?: ComponentRef<any>;

  constructor(private activeOffcanvas: NgbActiveOffcanvas) {}

  ngAfterViewInit(): void {
    if (this.options.component) {
      this.viewContainerRef.clear();
      this.componentRef = this.viewContainerRef.createComponent(
        this.options.component,
      );

      Object.assign(this.componentRef.instance, {
        ...this.options.props,
        close: (result?: any) => this.close(result),
      });
    }
  }

  close(result?: any): void {
    this.activeOffcanvas.close(result);
  }

  onPrimaryClick(): void {
    this.options.primaryButtonAction?.();

    const result = this.options.returnValue?.();

    if (this.options.closeOnPrimaryButtonClick) {
      this.close(result ?? { action: 'primary' });
    }
  }

  onSecondaryClick(): void {
    this.options.secondaryButtonAction?.();

    const result = this.options.returnValue?.();

    if (this.options.closeOnSecondaryButtonClick) {
      this.close({ action: 'Cancel' });
    }
  }
}
