import { Injectable } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { OffCanvasOptions } from '../interfaces/off-canvas-options';
import { OffCanvasWrapperComponent } from '../off-canvas-wrapper/off-canvas-wrapper.component';

@Injectable({
  providedIn: 'root',
})
export class OffCanvasService {
  constructor(private offCanvasService: NgbOffcanvas) {}

  open<T>(options: OffCanvasOptions<T>): NgbOffcanvasRef {
    const ref = this.offCanvasService.open(OffCanvasWrapperComponent, {
      position: options.position ?? 'end',
      scroll: options.scroll ?? true,
      backdrop: options.backdrop ?? true,
      panelClass: options.isMobile() ? 'w-100' : `w-${options.width}`,
      keyboard: options.closeOnEscape ?? true,
      animation: true,
    });

    const instance = ref.componentInstance as OffCanvasWrapperComponent;
    instance.options = options;

    options.onOpen?.();

    ref.result.then(
      (result) => options.onClose?.(result),
      (reason) => options.onDismiss?.(reason),
    );

    return ref;
  }
}
