import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  TemplateRef,
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
  @Input() options: OffCanvasOptions<any> = {} as OffCanvasOptions<any>;
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  isPrimaryLoading = false;
  isSecondaryLoading = false;
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

    setTimeout(() => {
      const element = document.querySelector(
        '.offcanvas-header h5',
      ) as HTMLElement;
      if (element) element.focus();
    }, 0);
  }

  close(result?: any): void {
    this.activeOffcanvas.close(result);
  }

  async onPrimaryClick(): Promise<void> {
    if (!this.options.primaryButtonAction) return;
    this.isPrimaryLoading = true;
    try {
      const result = this.options.returnValue?.();
      await this.options.primaryButtonAction(result);
      if (this.options.closeOnPrimaryButtonClick) this.close(result);
    } catch (error) {
      this.options.onError?.(error);
      console.error('Primary button error:', error);
    } finally {
      this.isPrimaryLoading = false;
    }
  }

  async onSecondaryClick(): Promise<void> {
    if (!this.options.secondaryButtonAction) return;
    this.isSecondaryLoading = true;
    try {
      const result = this.options.returnValue?.();
      await this.options.secondaryButtonAction(result);
      if (this.options.closeOnSecondaryButtonClick) this.close(result);
    } catch (error) {
      this.options.onError?.(error);
      console.error('Secondary button error:', error);
    } finally {
      this.isSecondaryLoading = false;
    }
  }
}
