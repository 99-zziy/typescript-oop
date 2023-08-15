{
  interface IStack {
    push(value: string): void;
    pop(): string;
    readonly size: number;
  }

  type Node = {
    readonly value: string;
    readonly next?: Node;
  };

  class Stack implements IStack {
    private _size: number = 0;
    private head?: Node;

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

    push(value: string) {
      const node: Node = { value: value, next: this.head };
      this.head = node;
      this._size++;
    }

    get size(): number {
      return this._size;
    }
  }

  const stack = new Stack();

  stack.push("3");
  stack.push("5");
  stack.push("6");
  const item = stack.pop();
  console.log(stack);
  console.log(item);
}
