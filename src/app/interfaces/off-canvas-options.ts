import { Signal, Type } from '@angular/core';

export interface OffCanvasOptions {
  title?: string;
  component?: Type<any>;
  props?: Record<string, any>;
  position?: 'start' | 'end' | 'top' | 'bottom';
  scroll?: boolean;
  backdrop?: boolean;
  width: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
  closeOnPrimaryButtonClick?: boolean;
  closeOnSecondaryButtonClick?: boolean;
  closeOnBackdropClick?: boolean;
  isMobile: Signal<boolean>;
  showFooter?: boolean;
  returnValue?: () => any;
}
