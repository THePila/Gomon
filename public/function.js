$(window).on('load', function () {
    reflejarColorInput();
    desplegarCursores();
});


$(document).on('input', '#baseColorHex', reflejarHexAPaleta);
$(document).on('change', '#selectColor', desplegarCursores);
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
}

// falta terminar
function reflejarHexAPaleta() {
    const inputHex = document.getElementById('baseColorHex');
    const inputHexValue = inputHex.value;

    if (inputHexValue.length == 7) {
        try {
            colorPicker.color.hexString = inputHexValue;
        } catch (error) {
            console.error("Error: Invalid hex string", error);
            // Revertir al último color válido
            inputHexValue = colorPicker.color.hexString;
        }
    }
}

function actualizarColorComplementario() {
    const color1 = colorPicker.colors[0];
    // console.log(color1);
    const complementarioHue = (color1.hue + 180) % 360; // Calcula el tono complementario
    const complementario = new iro.Color({ h: complementarioHue, s: color1.saturation, v: color1.value });
    colorPicker.colors[1].set(complementario); // Aplica el color complementario al segundo cursor
}

function actualizarColorMonocromatico() {

}

// function actualizarColorAnalogico() {
//     const color1 = colorPicker.colors[0];
//     const color2 = colorPicker.colors[1];

//     const colorAnalogico = new iro.Color({ h: color1.hue + 30, s: color1.saturation, v: color1.value });
// }



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
    } else if (colorSelect.value === "complementario") {
        colorPicker.on('color:change', function (color) {
            actualizarColorComplementario();
        });
    }
}

function convertirHSVAHex() {
    var color1 = colorPicker.colors[0];
    var color2 = colorPicker.colors[1];
    color1 = color1.hexString;
    color2 = color2.hexString;
    console.log(color1);
    console.log(color2);
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
}


colorPicker.on('color:change', function (color) {
    convertirHSVAHex();
    reflejarColorInput();
});


