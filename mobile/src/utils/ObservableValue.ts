export type Unsubscribe = () => void;
export class ObservableValue<T> {
  private listeners = new Set<(value: T) => void>();
  constructor(private value: T) {}
  get(): T { return this.value; }
  emit(value: T): void { this.value = value; this.listeners.forEach((listener) => listener(value)); }
  subscribe(listener: (value: T) => void): Unsubscribe { this.listeners.add(listener); listener(this.value); return () => this.listeners.delete(listener); }
}
