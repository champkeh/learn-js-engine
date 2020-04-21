function Point() {}

// These three functions are identical, but they will be called with different
// inputs and hence collect different type feedback:
function processPointMonomorphic(N, point) {
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += point.a;
    }
    return sum;
}
function processPointPolymorphic(N, point) {
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += point.a;
    }
    return sum;
}
function processPointGeneric(N, point) {
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += point.a;
    }
    return sum;
}

let p1 = new Point();
let p2 = new Point();
let p3 = new Point();
let p4 = new Point();

const warmup = 12000;
const N = 100000000;
let sum = 0;
p1.a = 1;
p2.b = 1;
p2.a = 1;
p3.c = 1;
p3.b = 1;
p3.a = 1;
p4.d = 1;
p4.c = 1;
p4.b = 1;
p4.a = 1;
processPointMonomorphic(warmup, p1);
processPointMonomorphic(1, p1);
let start_1 = Date.now();
sum += processPointMonomorphic(N, p1);
let t1 = Date.now() - start_1;

processPointPolymorphic(2, p1);
processPointPolymorphic(2, p2);
processPointPolymorphic(2, p3);
processPointPolymorphic(warmup, p4);
processPointPolymorphic(1, p4);
let start_2 = Date.now();
sum += processPointPolymorphic(N, p1);
let t2 = Date.now() - start_2;

processPointGeneric(warmup, 1);
processPointGeneric(1, 1);
let start_3 = Date.now();
sum += processPointGeneric(N, p1);
let t3 = Date.now() - start_3;
console.log(t1, t2, t3);
