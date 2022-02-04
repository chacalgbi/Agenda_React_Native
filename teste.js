let letras = {
    a: "aaaaaa",
    b: "bbbbbb",
    c: "cccccc",
    d: "dddddd",
    e: "eeeeee"
}

//----------------------------
//let visible = true;
//let extract = ({e, ...obj}, varName, varValue) => { obj[varName] = varValue; return obj; }
//let y = extract(letras, 'visible', visible);
//console.log(y);
//-----------------------

letras.a = "AAAAAA";

console.log(letras);