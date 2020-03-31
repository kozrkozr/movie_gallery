import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import Destroyable from '@core/mixins/destroyable';

export enum GridListValue {
  GRID = 'GRID',
  LIST = 'LIST'
}

@Component({
  selector: 'app-grid-list-control',
  templateUrl: 'grid-list-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GridListControlComponent),
      multi: true
    }
  ]
})
export class GridListControlComponent extends Destroyable()
  implements ControlValueAccessor, OnInit {
  @Input() size = 30;

  disabled: boolean;
  gridListValues = GridListValue;
  gridListControl = new FormControl(GridListValue.GRID);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.gridListControl.valueChanges
      .pipe(this.takeUntilDestroyed())
      .subscribe(value => {
        this.onChange(value);
        this.onTouched();
      });
  }
  get value() {
    return this.gridListControl.value;
  }

  set value(value) {
    this.gridListControl.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
