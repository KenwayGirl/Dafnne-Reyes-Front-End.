/*  Ejercicio Tipo 2: Simulador de Cuotas de Crédito
Desarrollar un componente funcional en React que permita simular la cuota mensual de un crédito simple.
Entradas (Inputs) requeridas:
●	Nombre del cliente: Texto.
●	Monto del préstamo: Numérico.
●	Tasa de interés mensual (%): Numérico.
●	Plazo en meses: Numérico (entero).

Fórmula de cálculo:
Cuota Mensual = (Monto + (Monto × Tasa / 100)) / Plazo
Requisito de Estilos Condicionales para el Resultado:
Valor Cuota Mensual	Categoría / Estado	Color / Alerta Aplicada
> $250.000	Riesgo / Cuota Alta	Danger (Rojo) - Advertencia de endeudamiento
$100.000 – $250.000	Cuota Moderada	Warning (Amarillo) - Deuda equilibrada
< $100.000	Cuota Cómoda	Secondary (Gris) - Totalmente asumible*/

import { useState } from "react";

const App = () => {
    const [nombre, setNombre] = useState("");
    const [monto, setMonto] = useState("");
    const [tasa, setTasa] = useState("");
    const [plazo, setPlazo] = useState("");
    const [resultado, setResultado] = useState("");
    const [error, setError] = useState("");
    
    /* funcion al presionar calcular */
    const calcular = (e) => {
        e.preventDefault(); 
        
        if (!nombre || !monto || !tasa || !plazo) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        const m = parseFloat(monto);
        const t = parseFloat(tasa);
        const p = parseInt(plazo);

        if (m <= 0 || t <= 0 || p <= 0) {
            setError("Monto, tasa y plazo deben ser mayores a cero.");
            return;
        }

        /* formulas */
        const interesTotal = m * (t / 100) * p;
        const montoTotal = m + interesTotal;
        const cuotaMensual = montoTotal / (p * 12); 

        /* guardar el resultado */
        setResultado({
            interesTotal: interesTotal.toFixed(2),
            montoTotal: montoTotal.toFixed(2),
            cuotaMensual: cuotaMensual.toFixed(2),
        });

        setError("");
    }; 

    /* limpiar */
    const limpiar = () => {
        setNombre("");
        setMonto("");
        setTasa("");
        setPlazo("");
        setResultado("");
        setError("");
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="card-title mb-0">Simulador de Crédito</h3>
                        </div>

                        <div className="card-body">
                            <form onSubmit={calcular}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre del Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Monto del Préstamo</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={monto}
                                        onChange={(e) => setMonto(e.target.value)}
                                        step="0.01"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Tasa de Interés Mensual (%)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={tasa}
                                        onChange={(e) => setTasa(e.target.value)}
                                        step="0.01"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Plazo en Meses</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={plazo}
                                        onChange={(e) => setPlazo(e.target.value)}
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit">
                                        Calcular
                                    </button>
                                    <button className="btn btn-secondary" type="button" onClick={limpiar}>
                                        Limpiar
                                    </button>
                                </div>
                            </form>

                            {/* mensaje error */}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}

                            {/* resultado */}
                            {resultado && (
                                <div className="alert alert-success mt-3">
                                    <h5>Resultado: </h5>
                                    <p className="mb-1"><strong>Cliente:</strong> {nombre}</p>
                                    <p className="mb-1"><strong>Cuota Mensual:</strong> ${resultado.cuotaMensual}</p>
                                    <p className="mb-1"><strong>Interés Total:</strong> ${resultado.interesTotal}</p>
                                    <p className="mb-1"><strong>Monto Total a Pagar:</strong> ${resultado.montoTotal}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;