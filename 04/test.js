function getData() {
    return [new Set(), 5];
}

// Unpack the return value
const [message, count] = getData();

console.log(message); // 'hello'
console.log(count); // 5
