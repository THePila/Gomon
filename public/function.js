$(window).on('load', function () {
    reflejarColorInput();
    desplegarCursores();
});


$(document).on('input', '#baseColorHex', reflejarHexAPaleta);
$(document).on('change', '#selectColor', desplegarCursores);
$(document).on('click', '#selectColor', generarPaleta);
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
    console.log("hola");
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

function actualizarColorComplementario(interactuarConPrimero) {
    if (interactuarConPrimero) {
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

function actualizarColorAnalogico() {
    const color1 = colorPicker.colors[0];
    const color2 = colorPicker.colors[1];
    const color3 = colorPicker.colors[2];

    const color1Hue = color1.hue;
    const color2Hue = color2.hue;
    const color3Hue = color3.hue;
    
    console.log(color3Hue);

    const color1HueOffset = (color1Hue + 30) % 360;
    const color2HueOffset = (color2Hue + 30) % 360;
    const color3HueOffset = (color3Hue + 30) % 360;

    // colorPicker.colors[0].set(color1HueOffset);
    // colorPicker.colors[1].set(color2HueOffset);
    // colorPicker.colors[2].set(color3HueOffset);
}



function desplegarCursores() {
    const colorSelect = document.getElementById('selectColor');

    if (colorSelect.value === "monocromatico") {
        colorPicker.on('color:change', function (color) {
            actualizarColorMonocromatico();
        });
    } else if (colorSelect.value === "analogico") {
        colorPicker.on('color:change', function (color) {
            actualizarColorAnalogico();
        });
        colorPicker.addColor("#f00");
    } else if (colorSelect.value === "complementario") {
        colorPicker.on('color:change', function (color) {
            const interactuarConPrimero = color.index === 0;
            actualizarColorComplementario(interactuarConPrimero);
        });
        if (colorPicker.colors.length > 2) {
            colorPicker.removeColor(2);
        }
    }
}

function convertirHSVAHex() {
    var color1 = colorPicker.colors[0];
    var color2 = colorPicker.colors[1];
    color1 = color1.hexString;
    color2 = color2.hexString;
    console.log("color 1" + color1);
    console.log("color 2" + color2);
    generarPaleta(color1, color2);
}


function generarPaleta(color1, color2) {
    $('#divPaleta').empty();
    const colorBox1 = `
    <div class="col color-box" style="background-color:${color1}">
        <button type="button" class="btn" style="backgroud-color:${color1}"><span>${color1}</span></button>
    </div>`;
    const colorBox2 = `
    <div class="col color-box" style="background-color:${color2}">
        <button type="button" class="btn" style="backgroud-color:${color2}"><span>${color2}</span></button>
    </div>`;
    $('#divPaleta').append(colorBox1, colorBox2);
    // const selectColor = document.getElementById('selectColor');
    // if (selectColor == "complementario") {
    //     const colorBox1 = `
    // <div class="col color-box" style="background-color:${color1}">
    //     <button type="button" class="btn" style="backgroud-color:${color1}"><span>${color1}</span></button>
    // </div>`;
    //     const colorBox2 = `
    // <div class="col color-box" style="background-color:${color2}">
    //     <button type="button" class="btn" style="backgroud-color:${color2}"><span>${color2}</span></button>
    // </div>`;
    // $('#divPaleta').append(colorBox1, colorBox2);
    // }
    // else if (selectColor == "monocromatico") {
    //     const colorBox1 = `
    // <div class="col color-box" style="background-color:${color1}">
    //     <button type="button" class="btn" style="backgroud-color:${color1}"><span>${color1}</span></button>
    // </div>`;
    //     const colorBox2 = `
    // <div class="col color-box" style="background-color:${color2}">
    //     <button type="button" class="btn" style="backgroud-color:${color2}"><span>${color2}</span></button>
    // </div>`;
    // $('#divPaleta').append(colorBox1, colorBox2);
    // }
}


colorPicker.on('color:change', function (color) {
    convertirHSVAHex();
    reflejarColorInput();
});


