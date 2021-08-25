const dataType = data => Object.prototype.toString.call(data).slice(8, -1)

console.log(dataType({})) // 'Object'
console.log(dataType([])) // 'Array'
console.log(dataType(() => {})) // 'Function'
console.log(dataType(new Date())) // 'Date'
console.log(dataType(/[1-9]/)) // 'RegExp'