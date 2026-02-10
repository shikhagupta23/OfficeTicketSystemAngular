import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

declare var $: any;

@Directive({
  selector: '[appSelect2]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select2Directive),
      multi: true
    }
  ]
})
export class Select2Directive
  implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() placeholder = 'Select option';

  private onChange = (_: any) => {};
  private onTouched = () => {};
  private observer?: MutationObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const $element = $(element);

    // ✅ Prevent double init
    if ($element.data('select2')) return;

    // ✅ Correct Select2 init
    $element.select2({
      theme: 'bootstrap-5',
      width: '100%',
      placeholder: this.placeholder,
      allowClear: true,
      dropdownAutoWidth: true,
      dropdownParent: $('body')
    });

    // ✅ Handle change
    $element.on('change', () => {
      this.onChange($element.val());
      this.onTouched();
    });

    // ✅ Observe dynamic option changes
    this.observer = new MutationObserver(() => {
      $element.trigger('change.select2');
    });

    this.observer.observe(element, {
      childList: true,
      subtree: true
    });
  }

  writeValue(value: any): void {
    const $element = $(this.el.nativeElement);
    $element.val(value ?? '').trigger('change.select2');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    $(this.el.nativeElement).prop('disabled', isDisabled);
  }

  ngOnDestroy(): void {
    const $element = $(this.el.nativeElement);

    this.observer?.disconnect();
    $element.off('change');

    if ($element.data('select2')) {
      $element.select2('destroy');
    }
  }
}
