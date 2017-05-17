const my_array = new Array();

my_array[0] = "Test";
my_array[1] = "T344";
my_array[2] = "nngo";

my_array['foo'] = "bar";

console.log(my_array);
console.warn("Property");

for (property in my_array) {
    console.info(typeof property);
    console.info(property);
}

console.warn("Indexes");
console.warn("Length is: ", my_array.length);
for (let index = 0; index < my_array.length; index++) {
    console.info(typeof index);
    console.info(index);
}

console.log("Hidden object:", my_array['foo']);