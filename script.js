// ============================================
// CALCULADORA DE PRÉSTAMOS - LÓGICA PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const btnCalcular = document.getElementById('btn-calcular');
    const montoInput = document.getElementById('monto');
    const semanasInput = document.getElementById('semanas');
    const resultadoDiv = document.getElementById('resultado');
    
    // Formatear moneda
    function formatMoney(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Validar inputs
    function validarInputs() {
        const monto = parseFloat(montoInput.value);
        const semanas = parseInt(semanasInput.value);
        
        if (isNaN(monto) || isNaN(semanas)) {
            alert('Por favor completa todos los campos');
            return null;
        }
        
        if (monto < 50 || monto > 300) {
            alert('El monto debe estar entre $50 y $300');
            montoInput.focus();
            return null;
        }
        
        if (semanas < 1 || semanas > 15) {
            alert('La duración debe estar entre 1 y 15 semanas');
            semanasInput.focus();
            return null;
        }
        
        return { monto, semanas };
    }
    
    // Calcular préstamo
    function calcularPrestamo(monto, semanas) {
        const tasaInteres = 0.01; // 1% semanal
        const interesTotal = monto * tasaInteres * semanas;
        const totalPagar = monto + interesTotal;
        const cuotaSemanal = totalPagar / semanas;
        
        return {
            monto,
            semanas,
            interesTotal,
            totalPagar,
            cuotaSemanal,
            tasaInteres
        };
    }
    
    // Generar tabla de pagos
    function generarTablaPagos(datos) {
        const tbody = document.getElementById('tabla-body');
        tbody.innerHTML = '';
        
        const capitalSemanal = datos.monto / datos.semanas;
        const interesSemanal = datos.interesTotal / datos.semanas;
        let saldo = datos.totalPagar;
        
        for (let i = 1; i <= datos.semanas; i++) {
            saldo -= datos.cuotaSemanal;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${i}</strong></td>
                <td>${formatMoney(datos.cuotaSemanal)}</td>
                <td>${formatMoney(capitalSemanal)}</td>
                <td>${formatMoney(interesSemanal)}</td>
                <td>${formatMoney(Math.max(0, saldo))}</td>
            `;
            tbody.appendChild(row);
        }
    }
    
    // Mostrar resultados
    function mostrarResultados(datos) {
        document.getElementById('res-monto').textContent = formatMoney(datos.monto);
        document.getElementById('res-semanas').textContent = datos.semanas + (datos.semanas === 1 ? ' semana' : ' semanas');
        document.getElementById('res-interes').textContent = formatMoney(datos.interesTotal);
        document.getElementById('res-interes-detalle').textContent = `($${(datos.tasaInteres * 100).toFixed(0)} x ${datos.semanas} semanas)`;
        document.getElementById('res-cuota').textContent = formatMoney(datos.cuotaSemanal);
        document.getElementById('res-total').textContent = formatMoney(datos.totalPagar);
        
        generarTablaPagos(datos);
        
        resultadoDiv.classList.remove('hidden');
        
        // Scroll suave a resultados
        setTimeout(() => {
            resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
    
    // Evento click
    btnCalcular.addEventListener('click', function() {
        const inputs = validarInputs();
        if (inputs) {
            const datos = calcularPrestamo(inputs.monto, inputs.semanas);
            mostrarResultados(datos);
        }
    });
    
    // Permitir calcular con Enter
    [montoInput, semanasInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                btnCalcular.click();
            }
        });
    });
    
    // Limpiar resultado al cambiar valores
    [montoInput, semanasInput].forEach(input => {
        input.addEventListener('input', function() {
            resultadoDiv.classList.add('hidden');
        });
    });
});


