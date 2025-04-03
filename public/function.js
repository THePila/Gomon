$(window).on('load', function () {
    reflejarColorInput();
    desplegarCursores();
});


$(document).on('input', '#baseColorHex', reflejarHexAPaleta);
$(document).on('change', '#selectColor', desplegarCursores);
$(document).on('change', '#selectColor', generarPaleta);
// $(document).on('mouseover', '.color-box', desplegarCursores);

var colorPicker = new iro.ColorPicker("#pickerColor", {
    width: 320,
    colors: ["#f00", "#00f"]
});

function reflejarColorInput() {

    const inputHex = document.getElementById('baseColorHex');
    const inputRgb = document.getElementById('baseColorRGB');

    inputHex.value = colorPicker.color.hexString;
    inputRgb.value = colorPicker.color.rgbString;
    inputRgb.value = inputRgb.value.replace('rgb(', '');
    inputRgb.value = inputRgb.value.replace(')', '');
    // console.log("hola");
}

document.getElementById('baseColorHex').addEventListener('input', function (e) {
    var value = e.target.value;
    // Permitir solo caracteres hexadecimales y el símbolo #
    if (!/^#[0-9A-Fa-f]*$/.test(value)) {
        e.target.value = value.slice(0, -1); // Eliminar el último carácter no válido
    }
});

function reflejarHexAPaleta() {
    const inputHex = document.getElementById('baseColorHex');
    const inputHexValue = inputHex.value;

    if (inputHexValue.length == 7) {
        try {
            colorPicker.color.hexString = inputHexValue;
        } catch (error) {
            // Revertir al último color válido
            inputHexValue = colorPicker.color.hexString;
        }
    }
    // si no llamo aca a la funcion el segundo color de la paleta no se refleja correctamente
    convertirHSVAHex();
}

function actualizarColorComplementario(primerSelectorComple) {
    if (primerSelectorComple) {
        const color1 = colorPicker.colors[0];
        const complementarioHue = (color1.hue + 180) % 360; // Calcula el tono complementario
        const complementario = new iro.Color({ h: complementarioHue, s: color1.saturation, v: color1.value });
        colorPicker.colors[1].set(complementario); // Aplica el color complementario al segundo cursor
    } else {
        const color2 = colorPicker.colors[1];
        const complementarioHue = (color2.hue + 180) % 360; // Calcula el tono complementario
        const complementario = new iro.Color({ h: complementarioHue, s: color2.saturation, v: color2.value });
        colorPicker.colors[0].set(complementario); // Aplica el color complementario al primer cursor
    }
}

// function actualizarColorMonocromatico() {
//     const color1 = colorPicker.colors[0];
//     const escalaDeGrises = [];

//     // Generar una escala de grises basada en el color1
//     for (let i = 0; i <= 10; i++) {
//         const valorGris = i * 10; // Incrementar el valor para crear diferentes tonos de gris
//         const colorGris = new iro.Color({ h: color1.hue, s: 0, v: valorGris });
//         escalaDeGrises.push(colorGris);
//     }

//     // Aplicar la escala de grises al color picker
//     for (let i = 0; i < escalaDeGrises.length; i++) {
//         if (colorPicker.colors[i]) {
//             colorPicker.colors[i].set(escalaDeGrises[i]);
//         } else {
//             colorPicker.colors.push(escalaDeGrises[i]);
//         }
//     }
// }

function actualizarColorAnalogico(primerSelectorAnalogo, SegundoSelectorAnalogo, tercerSelectorAnalogo) {
    if (primerSelectorAnalogo) {
        const color1 = colorPicker.colors[0];

        const analogoHue1 = (color1.hue + 30) % 360; // Calcula el tono analógico 1
        const analogoHue2 = (color1.hue - 30 + 360) % 360; // Asegura que el tono esté en el rango 0-360

        const analogo1 = new iro.Color({ h: analogoHue1, s: color1.saturation, v: color1.value });
        const analogo2 = new iro.Color({ h: analogoHue2, s: color1.saturation, v: color1.value });

        colorPicker.colors[1].set(analogo1); // Aplica el color analógico 1 al segundo cursor
        colorPicker.colors[2].set(analogo2); // Aplica el color analógico 2 al tercer cursor
    } else if (SegundoSelectorAnalogo) {
        const color2 = colorPicker.colors[1];

        const analogoHue1 = (color2.hue + 30) % 360;
        const analogoHue2 = (color2.hue - 30 + 360) % 360;

        const analogo1 = new iro.Color({ h: analogoHue1, s: color2.saturation, v: color2.value });
        const analogo2 = new iro.Color({ h: analogoHue2, s: color2.saturation, v: color2.value });

        colorPicker.colors[0].set(analogo1);
        colorPicker.colors[2].set(analogo2);
    } else if (tercerSelectorAnalogo) {
        const color3 = colorPicker.colors[2];

        const analogoHue1 = (color3.hue + 30) % 360;
        const analogoHue2 = (color3.hue - 30 + 360) % 360;

        const analogo1 = new iro.Color({ h: analogoHue1, s: color3.saturation, v: color3.value });
        const analogo2 = new iro.Color({ h: analogoHue2, s: color3.saturation, v: color3.value });

        colorPicker.colors[0].set(analogo1);
        colorPicker.colors[1].set(analogo2);
    }
}



let valorSelect

function desplegarCursores() {
    const colorSelect = document.getElementById('selectColor').value;
    valorSelect = colorSelect;
    ajustarCursores(colorSelect);
}

colorPicker.on('color:change', function (color) {
    // Siempre reflejar los cambios en los inputs y la paleta
    convertirHSVAHex();
    reflejarColorInput();
    // Ejecutar la lógica específica según el modo activo
    if (valorSelect === "monocromatico") {
        actualizarColorMonocromatico();
    } else if (valorSelect === "analogico") {
        const primerSelectorAnalogo = color.index === 0;
        const SegundoSelectorAnalogo = color.index === 1;
        const tercerSelectorAnalogo = color.index === 2;
        actualizarColorAnalogico(primerSelectorAnalogo, SegundoSelectorAnalogo, tercerSelectorAnalogo);
    } else if (valorSelect === "complementario") {
        const primerSelectorComple = color.index === 0;
        actualizarColorComplementario(primerSelectorComple);
    }
});

function ajustarCursores(colorSelect) {
    if (colorSelect === "analogico") {
        // Asegurarse de que haya tres colores para el modo análogo
        if (colorPicker.colors.length < 3) {
            colorPicker.addColor("#f00");
        }
    } else {
        // Limitar a dos colores para otros modos
        while (colorPicker.colors.length > 2) {
            colorPicker.removeColor(colorPicker.colors.length - 1);
        }
    }
}


function convertirHSVAHex() {
    console.log(valorSelect);

    // Lógica específica para cada modo
    if (valorSelect === "complementario") {
        manejarModoComplementario();
    } else if (valorSelect === "analogico") {
        manejarModoAnalogico();
    }
}

function manejarModoComplementario() {
    const color1 = colorPicker.colors[0].hexString;
    const color2 = colorPicker.colors[1].hexString;

    generarPaleta(color1, color2);
}

function manejarModoAnalogico() {
    const color1 = colorPicker.colors[0].hexString;
    const color2 = colorPicker.colors[1].hexString;
    const color3 = colorPicker.colors[2].hexString;

    generarPaleta(color1, color2, color3);
}

function generarPaleta(color1, color2, color3) {
    $('#divPaleta').empty();
    if (valorSelect == "complementario") {
        const colorBox1 = `
        <div class="col color-box" style="background-color:${color1}">
        <button type="button" class="btn" style="backgroud-color:${color1}"><span>${color1}</span></button>
        </div>`;
        const colorBox2 = `
        <div class="col color-box" style="background-color:${color2}">
        <button type="button" class="btn" style="backgroud-color:${color2}"><span>${color2}</span></button>
        </div>`;
        $('#divPaleta').append(colorBox1, colorBox2);
    }
    else if (valorSelect == "analogico") {
        const colorBox1 = `
        <div class="col color-box" style="background-color:${color1}">
        <button type="button" class="btn" style="backgroud-color:${color1}"><span>${color1}</span></button>
        </div>`;
        const colorBox2 = `
        <div class="col color-box" style="background-color:${color2}">
        <button type="button" class="btn" style="backgroud-color:${color2}"><span>${color2}</span></button>
        </div>`;
        const colorBox3 = `<div class="col color-box" style="background-color:${color3}">
        <button type="button" class="btn" style="backgroud-color:${color3}"><span>${color3}</span></button>
        </div>`;
        console.log(color3);
        $('#divPaleta').append(colorBox1, colorBox2, colorBox3);
    }
}




