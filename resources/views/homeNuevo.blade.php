@extends('layout')

@section('content')
    <div class="container">
        <header>
            <h1>Enhanced Color Palette Generator</h1>
            <p>Create beautiful, accessible color palettes with ease</p>
        </header>

        <div class="top-controls">
            <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
                <i class="fas fa-moon"></i>
                <span class="sr-only">Toggle dark mode</span>
            </button>
        </div>

        <div class="color-wheel-container">
            <h2 class="color-wheel-title">Color Wheel</h2>
            <div id="pickerColor">
            </div>
            <div class="selected-color">
                {{-- <div id="selected-color-preview" class="color-preview"></div> --}}
                <div class="color-info">
                </div>
            </div>
        </div>

        <div class="controls">
            {{-- <button id="generate-btn" aria-label="Generate new palette">
                <i class="fas fa-random"></i> Generate Palette
            </button> --}}
            {{-- <select id="palette-size" aria-label="Select palette size">
                <option value="3">3 Colors</option>
                <option value="5" selected>5 Colors</option>
                <option value="7">7 Colors</option>
            </select> --}}
            <select id="selectColor" aria-label="Select color harmony type">
                <option value="monocromatico">Monocromático</option>
                <option selected value="complementario">Complementario</option>
                <option value="analogico">Análogo</option>
            </select>
            <p class="form-label">Color Base en Hex</p>
            <input type="text" id="baseColorHex" name="baseColorHex" maxlength="7">
            <p class="form-label">Color Base en RGB</p>
            <input type="text" id="baseColorRGB" name="baseColorRGB" readonly>
        </div>

        <div class="divPaleta " id="divPaleta" role="region" aria-label="Color palette">
            <!-- Color boxes will be generated here -->
        </div>

        {{-- <div class="instructions">
            <h2>How to use</h2>
            <p><i class="fas fa-paint-brush"></i> Use the color wheel to select custom colors</p>
            <p><i class="fas fa-lock"></i> Click the lock icon to keep a color when generating</p>
            <p><i class="fas fa-copy"></i> Click on the color code to copy to clipboard</p>
            <p><i class="fas fa-random"></i> Press spacebar to generate a new palette</p>
            <p><i class="fas fa-universal-access"></i> Contrast ratios are shown for accessibility</p>
        </div> --}}
    </div>

    <footer>
        <p>Racing yo te amo</p>
    </footer>

    <div class="toast-container position-fixed top-0 bottom-0 end-0 p-3">
        <div id="liveToast" class="toast"  role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <div id="toastIcon" class="rounded me-2" style="width: 20px; height: 20px;"></div>
                <strong class="me-auto"></strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
            </div>
        </div>
    </div>

    <div id="live-region" class="live-region" aria-live="polite"></div>
@endsection
