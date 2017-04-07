export class DerivationStack {
  stack: any[] = [];

  peek() {
    return this.stack[this.stack.length - 1];
  }

  pop() {
    this.stack.pop();
  }

  push(val: any) {
    this.stack.push(val);
  }
}

export const stack = new DerivationStack();
