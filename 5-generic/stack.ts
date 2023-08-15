{
  interface IStack<T> {
    push(value: T): void;
    pop(): T;
    readonly size: number;
  }

  type Node<T> = {
    readonly value: T;
    readonly next?: Node<T>;
  };

  class Stack<T> implements IStack<T> {
    private _size: number = 0;
    private head?: Node<T>;

    pop() {
      // null == undefined
      if (this.head == null) {
        throw new Error("stack is empty");
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }

    push(value: T) {
      const node: Node<T> = { value: value, next: this.head };
      this.head = node;
      this._size++;
    }

    get size(): number {
      return this._size;
    }
  }

  const stack = new Stack<number>();

  stack.push(3);
  stack.push(5);
  stack.push(5);
  const item = stack.pop();
  console.log(stack);
  console.log(item);
}
