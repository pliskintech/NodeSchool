var minArgIndex = 2;
var maxArgIndex = process.argv.length;
var index = minArgIndex;
var arg = '';
var argSum = 0;

for (; index < maxArgIndex; index++)
{
    arg = process.argv[index];
    argSum = argSum + Number(arg);
}

console.log(argSum);
