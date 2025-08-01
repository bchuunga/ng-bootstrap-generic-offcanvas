import { Signal, TemplateRef, Type } from '@angular/core';

export interface OffCanvasOptions<T = any> {
  title?: string;
  component?: Type<T>;
  props?: Partial<T>;
  position?: 'start' | 'end' | 'top' | 'bottom';
  scroll?: boolean;
  backdrop?: boolean;
  width: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: (data?: any) => void | Promise<void>;
  secondaryButtonAction?: (data?: any) => void | Promise<void>;
  closeOnPrimaryButtonClick?: boolean;
  closeOnSecondaryButtonClick?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  isMobile: Signal<boolean>;
  showFooter?: boolean;
  returnValue?: () => any;
  customFooterTemplate?: TemplateRef<any>;
  customHeaderTemplate?: TemplateRef<any>;
  animationDuration?: string;
  animationEasing?: string;
  onOpen?: () => void;
  onClose?: (result?: any) => void;
  onDismiss?: (reason?: any) => void;
  onError?: (error: any) => void;
}
