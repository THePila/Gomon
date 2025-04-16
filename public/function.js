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

function actualizarColorMonocromatico() {
    const color1 = colorPicker.colors[0];
    const hue = color1.hue;  // Mantener el mismo tono
    
    // Crear variaciones monocromáticas cambiando saturación y brillo
    // Versión 1: Color original
    const monocromatico1 = new iro.Color({ h: hue, s: color1.saturation, v: color1.value });
    
    // Versión 2: Más claro (mayor brillo)
    const monocromatico2 = new iro.Color({ h: hue, s: color1.saturation, 
        v: Math.min(100, color1.value + 30)  // Aumenta el brillo en 30%, máximo 100
    });
    
    // Versión 3: Más oscuro (menor brillo)
    const monocromatico3 = new iro.Color({ 
        h: hue, 
        s: color1.saturation, 
        v: Math.max(0, color1.value - 30)  // Disminuye el brillo en 30%, mínimo 0
    });
    
    // Aplica los colores a los tres cursores
    colorPicker.colors[0].set(monocromatico1);
    colorPicker.colors[1].set(monocromatico2);
    colorPicker.colors[2].set(monocromatico3);
    
    console.log(colorPicker.colors[0].hexString);
    console.log(colorPicker.colors[1].hexString);
    console.log(colorPicker.colors[2].hexString);
}

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
    if (colorSelect === "analogico" || colorSelect === "monocromatico") {
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
    if (valorSelect === "monocromatico") {
        manejarModoMonocromatico();
    }
    if (valorSelect === "complementario") {
        manejarModoComplementario();
    } else if (valorSelect === "analogico") {
        manejarModoAnalogico();
    }
}

function manejarModoMonocromatico() {
    const color1 = colorPicker.colors[0].hexString;
    const color2 = colorPicker.colors[1].hexString;
    const color3 = colorPicker.colors[2].hexString;
    generarPaleta(color1, color2, color3);
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

function copiarPortaPapeles(color, btnElement) 
{   
    const span = btnElement.querySelector('span');
    const textoOriginal = span.textContent;

    navigator.clipboard.writeText(color)
        .then(() => {
            span.textContent = "Color copiado: " ;
            setTimeout(() => {
                span.textContent = textoOriginal;
            }
            , 2000); // Cambia el texto de vuelta después de 2 segundos
        })
        .catch(err => {
            alert('Error al copiar el color: ', err);
        });
}

function crearColorBox(color) {
    return `
    <div class="col color-box" style="background-color:${color}">
        <button type="button" onclick="copiarPortaPapeles('${color}', this)" class="btn">
            <span>${color}</span>
        </button>
    </div>`;
}

function generarPaleta(color1, color2, color3) {
    $('#divPaleta').empty();
    if (color1 == undefined || color2 == undefined && color3 == undefined) {
        return;
    }

    let colorBoxes = [];

    colorBoxes.push(crearColorBox(color1));
    colorBoxes.push(crearColorBox(color2));
    
    if (valorSelect == "monocromatico" || valorSelect == "analogico") {
        colorBoxes.push(crearColorBox(color3));
    }
    console.log (colorBoxes);
    // Añadir todos los color boxes al div de la paleta
    $('#divPaleta').append(colorBoxes.join(''));
}




