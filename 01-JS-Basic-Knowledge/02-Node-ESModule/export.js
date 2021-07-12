export default class Person {
    constructor(name) {
        this.name = name
    }
    sayName() {
        console.log(`hello, ${this.name}`)
    }
}