document.addEventListener('DOMContentLoaded', function () {
    const geoCheckbox = document.getElementById('geo-consent');
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    const errorEl = document.getElementById('error-message');
    const form = document.getElementById('signup-form');

    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');

    function showError(msg) {
        errorEl.textContent = msg || '';
    }

    function clearCoords() {
        latInput.value = '';
        lngInput.value = '';
    }

    function requestGeolocation() {
        showError('');
        if (!navigator.geolocation) {
            showError('Geolocalização não disponível neste navegador.');
            if (geoCheckbox) geoCheckbox.checked = false;
            clearCoords();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                latInput.value = pos.coords.latitude;
                lngInput.value = pos.coords.longitude;
            },
            (err) => {
                if (geoCheckbox) geoCheckbox.checked = false;
                clearCoords();
                if (err.code === err.PERMISSION_DENIED) {
                    showError('Permissão de localização negada.');
                } else {
                    showError('Erro ao obter localização: ' + (err.message || ''));
                }
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }

    if (geoCheckbox) {
        geoCheckbox.addEventListener('change', function () {
            if (this.checked) {
                requestGeolocation();
            } else {
                clearCoords();
                showError('');
            }
        });
    }

    // validação de confirmação de senha + validação de geolocalização
    form.addEventListener('submit', function (e) {
        // checa se os campos de senha existem antes
        if (passwordInput && confirmInput) {
            if (passwordInput.value !== confirmInput.value) {
                e.preventDefault();
                showError('As senhas não coincidem.');
                confirmInput.focus();
                return;
            }
        }

        if (geoCheckbox && geoCheckbox.checked && (!latInput.value || !lngInput.value)) {
            e.preventDefault();
            showError('Aguardando localização ou permissões. Desmarque a opção ou tente novamente.');
            return;
        }

        // formulário segue normalmente (ou coloque envio via fetch/AJAX aqui)
    });

    // limpa erro se usuário corrigir a confirmação
    if (confirmInput) {
        confirmInput.addEventListener('input', function () {
            if (errorEl.textContent && passwordInput && passwordInput.value === confirmInput.value) {
                showError('');
            }
        });
    }
});