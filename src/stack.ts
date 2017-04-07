const stack: any[] = [];

export function peek() {
  return stack[stack.length - 1];
}

export function pop() {
  return stack.pop();
}

export function push(val: any) {
  return stack.push(val);
}
