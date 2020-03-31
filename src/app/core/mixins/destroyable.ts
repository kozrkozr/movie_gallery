import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type Constructor<T> = new (...args: any[]) => T;

function Destroyable<T extends Constructor<{}>>(Base: T = class {} as any) {
  return class extends Base implements OnDestroy {
    private destroyed$ = new Subject<void>();

    takeUntilDestroyed = <K>(): MonoTypeOperatorFunction<K> =>
      takeUntil(this.destroyed$);

    ngOnDestroy() {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
  };
}

export default Destroyable;
