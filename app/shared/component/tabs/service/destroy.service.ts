import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * Функция для удобной отписки.
 * Для ручной отписки через pipe (takeUntil) мы создаём Subject() и завершаем его при удалении компонент.
 * Этот сервис является Subject(-ом) и избавляет нас от ручной отписки, всё что нужно сделать это импорт через декоратор.
 * Тогда сервис удалиться автоматически, а при удалении компонента вывовет complete и потому происходит отписка
 * @example смотри пример в коде;
 */
@Injectable()
export class DestroyService extends ReplaySubject<void> implements OnDestroy {
  constructor() {
    super(1);
  }

  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}

