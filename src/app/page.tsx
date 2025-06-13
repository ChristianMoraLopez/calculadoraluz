// pages/index.tsx
'use client'
import { useState, useEffect } from 'react';

// Define interfaces for type safety
interface Inquilino {
  nombre: string;
  lecturaAnterior: string;
  lecturaActual: string;
}

interface Resultado {
  nombre: string;
  consumoKwh: number;
  pagoLuz: number;
  costoAseo: number;
  pagoTotal: number;
}

export default function CalculadoraLuz() {
  const [totalLuz, setTotalLuz] = useState<string>('');
  const [aseo, setAseo] = useState<string>('');
  const [consumoMes, setConsumoMes] = useState<string>('');
  const [totalInquilinos, setTotalInquilinos] = useState<string>('');
  const [inquilinos, setInquilinos] = useState<Inquilino[]>([
    { nombre: '', lecturaAnterior: '', lecturaActual: '' },
  ]);
  const [resultados, setResultados] = useState<Resultado[]>([]);

  // Función para formatear números con separador de miles colombiano
  const formatearPeso = (numero: number): string => {
    return numero.toLocaleString('es-CO', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Función para formatear decimales (kWh y costo por kWh)
  const formatearDecimal = (numero: number, decimales: number = 2): string => {
    return numero.toLocaleString('es-CO', { 
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    });
  };

  const agregarInquilino = () => {
    setInquilinos([...inquilinos, { nombre: '', lecturaAnterior: '', lecturaActual: '' }]);
  };

  const eliminarInquilino = (index: number) => {
    if (inquilinos.length > 1) {
      const nuevosInquilinos = inquilinos.filter((_, i) => i !== index);
      setInquilinos(nuevosInquilinos);
    }
  };

  const actualizarInquilino = (index: number, campo: keyof Inquilino, valor: string) => {
    const nuevosInquilinos = [...inquilinos];
    nuevosInquilinos[index][campo] = valor;
    setInquilinos(nuevosInquilinos);
  };

  const calcularDivision = (): Resultado[] => {
    const cantidadTotalInquilinos = totalInquilinos ? parseInt(totalInquilinos) : inquilinos.length;
    const costoAseoPorCabeza = parseFloat(aseo) / cantidadTotalInquilinos;
    const costoKwh = parseFloat(totalLuz) / parseFloat(consumoMes);

    return inquilinos.map((inquilino, index) => {
      const consumoInquilino = parseFloat(inquilino.lecturaActual) - parseFloat(inquilino.lecturaAnterior);
      const pagoLuz = costoKwh * consumoInquilino;
      const pagoTotal = pagoLuz + costoAseoPorCabeza;

      return {
        nombre: inquilino.nombre || `Inquilino ${index + 1}`,
        consumoKwh: isNaN(consumoInquilino) ? 0 : consumoInquilino,
        pagoLuz: isNaN(pagoLuz) ? 0 : pagoLuz,
        costoAseo: isNaN(costoAseoPorCabeza) ? 0 : costoAseoPorCabeza,
        pagoTotal: isNaN(pagoTotal) ? 0 : pagoTotal,
      };
    });
  };

  // Cálculo automático cuando cambian los datos
  useEffect(() => {
    if (totalLuz && aseo && consumoMes && inquilinos.some(i => i.lecturaAnterior && i.lecturaActual)) {
      const nuevosResultados = calcularDivision();
      setResultados(nuevosResultados);
    } else {
      setResultados([]);
    }
  }, [totalLuz, aseo, consumoMes, totalInquilinos, inquilinos]);

  const generarMensajeWhatsApp = () => {
    const costoKwh = parseFloat(totalLuz) / parseFloat(consumoMes);
    const cantidadTotalInquilinos = totalInquilinos ? parseInt(totalInquilinos) : inquilinos.length;
    
    let mensaje = `🏢 *DIVISIÓN DE LUZ - EDIFICIO PAOLA T.*\n\n`;
    mensaje += `💡 *Datos Generales:*\n`;
    mensaje += `• Total de luz: $${formatearPeso(parseFloat(totalLuz))}\n`;
    mensaje += `• Costo aseo: $${formatearPeso(parseFloat(aseo))}\n`;
    mensaje += `• Consumo total: ${consumoMes} kWh\n`;
    mensaje += `• Costo por kWh: $${isNaN(costoKwh) ? '0' : formatearDecimal(costoKwh)}\n`;
    mensaje += `• Total inquilinos edificio: ${cantidadTotalInquilinos}\n`;
    mensaje += `• Inquilinos calculados: ${inquilinos.length}\n\n`;

    mensaje += `📊 *Detalle por Inquilino:*\n`;
    resultados.forEach((resultado, index) => {
      mensaje += `\n${index + 1}. *${resultado.nombre}*\n`;
      mensaje += `   • Consumo: ${formatearDecimal(resultado.consumoKwh)} kWh\n`;
      mensaje += `   • Pago luz: $${formatearPeso(resultado.pagoLuz)}\n`;
      mensaje += `   • Aseo: $${formatearPeso(resultado.costoAseo)}\n`;
      mensaje += `   • *Total: $${formatearPeso(resultado.pagoTotal)}*\n`;
    });

    const totalCalculado = resultados.reduce((sum, r) => sum + r.pagoTotal, 0);
    mensaje += `\n💰 *TOTAL CALCULADO: $${formatearPeso(totalCalculado)}*`;

    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const totalCalculado = resultados.reduce((sum, r) => sum + r.pagoTotal, 0);
  const costoKwh = totalLuz && consumoMes ? parseFloat(totalLuz) / parseFloat(consumoMes) : 0;
  const costoAseoPorPersona = aseo && totalInquilinos ? parseFloat(aseo) / parseInt(totalInquilinos) : 
                              aseo ? parseFloat(aseo) / inquilinos.length : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-3 px-2 sm:py-6 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header - Optimizado para móvil */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border-2 border-blue-100">
            <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🏢</div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">
              Cálculo de Luz
            </h1>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-600 mb-2 sm:mb-4">
              Edificio Paola T.
            </h2>
            <p className="text-gray-600 text-sm sm:text-xl">
              Calculadora fácil para dividir los costos de luz y aseo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Panel de Datos Generales - Responsive */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-green-100 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">📊</span>
                <span className="hidden sm:inline">Datos del Recibo</span>
                <span className="sm:hidden">Datos</span>
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 sm:mb-3 text-sm sm:text-lg">
                    💡 Total de la Luz
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-500 text-sm sm:text-lg">$</span>
                    <input
                      type="number"
                      value={totalLuz}
                      onChange={(e) => setTotalLuz(e.target.value)}
                      className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-4 text-sm sm:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="150000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2 sm:mb-3 text-sm sm:text-lg">
                    🧹 Costo Aseo
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-500 text-sm sm:text-lg">$</span>
                    <input
                      type="number"
                      value={aseo}
                      onChange={(e) => setAseo(e.target.value)}
                      className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-4 text-sm sm:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="20000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2 sm:mb-3 text-sm sm:text-lg">
                    ⚡ Consumo del Mes
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={consumoMes}
                      onChange={(e) => setConsumoMes(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-4 text-sm sm:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="462"
                    />
                    <span className="absolute right-2 sm:right-3 top-2 sm:top-3 text-gray-500 text-sm sm:text-lg">kWh</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2 sm:mb-3 text-sm sm:text-lg">
                    🏠 Total Apartamentos
                  </label>
                  <input
                    type="number"
                    value={totalInquilinos}
                    onChange={(e) => setTotalInquilinos(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-4 text-sm sm:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: 8"
                  />
                  <p className="text-gray-500 text-xs sm:text-sm mt-2 bg-yellow-50 p-2 rounded">
                    💡 Para dividir el aseo entre todos los apartamentos del edificio
                  </p>
                </div>
              </div>

              {/* Información de cálculo - Responsive */}
              {(totalLuz || aseo || consumoMes) && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border-2 border-blue-200">
                  <h4 className="text-sm sm:text-lg font-bold text-blue-800 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="text-lg sm:text-xl">🔢</span>
                    Información
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {costoKwh > 0 && (
                      <div className="bg-white p-2 sm:p-3 rounded-lg">
                        <p className="text-gray-700 font-semibold text-xs sm:text-sm">Costo por kWh:</p>
                        <p className="text-lg sm:text-2xl font-bold text-green-600">${formatearDecimal(costoKwh)}</p>
                      </div>
                    )}
                    {costoAseoPorPersona > 0 && (
                      <div className="bg-white p-2 sm:p-3 rounded-lg">
                        <p className="text-gray-700 font-semibold text-xs sm:text-sm">Aseo por apartamento:</p>
                        <p className="text-lg sm:text-2xl font-bold text-orange-600">${formatearPeso(costoAseoPorPersona)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel de Inquilinos - Completamente responsive */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-purple-100">
              <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">👥</span>
                  <span className="hidden sm:inline">Apartamentos a Calcular ({inquilinos.length})</span>
                  <span className="sm:hidden">Apartamentos ({inquilinos.length})</span>
                </h3>
                <button
                  onClick={agregarInquilino}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
                >
                  <span className="text-lg sm:text-xl">➕</span>
                  <span className="hidden sm:inline">Agregar Apartamento</span>
                  <span className="sm:hidden">Agregar</span>
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {inquilinos.map((inquilino, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <h4 className="font-bold text-gray-800 text-lg sm:text-2xl flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">🏠</span>
                        <span className="hidden sm:inline">Apartamento {index + 1}</span>
                        <span className="sm:hidden">Apt. {index + 1}</span>
                      </h4>
                      {inquilinos.length > 1 && (
                        <button
                          onClick={() => eliminarInquilino(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                        >
                          <span className="text-sm sm:text-lg">🗑️</span>
                          <span className="hidden sm:inline">Eliminar</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2 sm:mb-3 text-sm sm:text-lg">
                          👤 Nombre del Inquilino
                        </label>
                        <input
                          type="text"
                          value={inquilino.nombre}
                          onChange={(e) => actualizarInquilino(index, 'nombre', e.target.value)}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Juan Pérez"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-gray-700 font-bold mb-2 sm:mb-3 text-xs sm:text-lg">
                            📊 <span className="hidden sm:inline">Lectura Mes Pasado</span>
                            <span className="sm:hidden">Mes Pasado</span>
                          </label>
                          <input
                            type="number"
                            value={inquilino.lecturaAnterior}
                            onChange={(e) => actualizarInquilino(index, 'lecturaAnterior', e.target.value)}
                            className="w-full px-2 sm:px-4 py-3 sm:py-4 text-sm sm:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="1500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-bold mb-2 sm:mb-3 text-xs sm:text-lg">
                            📈 <span className="hidden sm:inline">Lectura Este Mes</span>
                            <span className="sm:hidden">Este Mes</span>
                          </label>
                          <input
                            type="number"
                            value={inquilino.lecturaActual}
                            onChange={(e) => actualizarInquilino(index, 'lecturaActual', e.target.value)}
                            className="w-full px-2 sm:px-4 py-3 sm:py-4 text-sm sm:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="1650"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mostrar resultado individual - Completamente responsive */}
                    {resultados[index] && (
                      <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg sm:rounded-xl border-2 border-green-200">
                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                          <div className="bg-white p-2 sm:p-4 rounded-lg text-center shadow-sm">
                            <p className="text-gray-600 font-semibold mb-1 text-xs sm:text-sm">Consumo</p>
                            <p className="text-lg sm:text-2xl font-bold text-blue-600">{formatearDecimal(resultados[index].consumoKwh)}</p>
                            <p className="text-xs text-gray-500">kWh</p>
                          </div>
                          <div className="bg-white p-2 sm:p-4 rounded-lg text-center shadow-sm">
                            <p className="text-gray-600 font-semibold mb-1 text-xs sm:text-sm">Pago Luz</p>
                            <p className="text-sm sm:text-xl font-bold text-green-600">${formatearPeso(resultados[index].pagoLuz)}</p>
                          </div>
                          <div className="bg-white p-2 sm:p-4 rounded-lg text-center shadow-sm">
                            <p className="text-gray-600 font-semibold mb-1 text-xs sm:text-sm">Pago Aseo</p>
                            <p className="text-sm sm:text-xl font-bold text-orange-600">${formatearPeso(resultados[index].costoAseo)}</p>
                          </div>
                          <div className="bg-white p-2 sm:p-4 rounded-lg text-center shadow-sm border-2 border-purple-200">
                            <p className="text-gray-600 font-semibold mb-1 text-xs sm:text-sm">TOTAL</p>
                            <p className="text-lg sm:text-2xl font-bold text-purple-600">${formatearPeso(resultados[index].pagoTotal)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Resultados Finales - Completamente responsive */}
        {resultados.length > 0 && (
          <div className="mt-4 sm:mt-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xl border-2 border-yellow-200">
              <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 text-center flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-4xl">💰</span>
                <span className="hidden sm:inline">Resumen Final de Pagos</span>
                <span className="sm:hidden">Resumen Final</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
                {resultados.map((resultado, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-200 shadow-md">
                    <h4 className="font-bold text-gray-800 text-lg sm:text-xl mb-3 sm:mb-4 flex items-center gap-2 justify-center">
                      <span className="text-xl sm:text-2xl">🏠</span>
                      <span className="text-center text-sm sm:text-lg">{resultado.nombre}</span>
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center py-1 sm:py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium text-xs sm:text-sm">Consumo:</span>
                        <span className="font-bold text-blue-600 text-sm sm:text-lg">{formatearDecimal(resultado.consumoKwh)} kWh</span>
                      </div>
                      <div className="flex justify-between items-center py-1 sm:py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium text-xs sm:text-sm">Luz:</span>
                        <span className="font-bold text-green-600 text-sm sm:text-lg">${formatearPeso(resultado.pagoLuz)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 sm:py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium text-xs sm:text-sm">Aseo:</span>
                        <span className="font-bold text-orange-600 text-sm sm:text-lg">${formatearPeso(resultado.costoAseo)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 sm:py-3 bg-purple-100 rounded-lg px-2 sm:px-3 mt-3 sm:mt-4">
                        <span className="font-bold text-gray-800 text-sm sm:text-lg">TOTAL:</span>
                        <span className="font-bold text-purple-700 text-lg sm:text-2xl">${formatearPeso(resultado.pagoTotal)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 border-2 border-yellow-300 mb-4 sm:mb-8">
                <div className="text-center">
                  <p className="text-gray-700 text-lg sm:text-2xl mb-2 sm:mb-4 font-semibold">
                    💵 <span className="hidden sm:inline">Suma Total de Todos los Pagos</span>
                    <span className="sm:hidden">Total General</span>
                  </p>
                  <p className="text-yellow-700 font-bold text-3xl sm:text-5xl">
                    ${formatearPeso(totalCalculado)}
                  </p>
                </div>
              </div>

              <button
                onClick={generarMensajeWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 sm:py-6 px-4 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-2xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-4"
              >
                <span className="text-2xl sm:text-3xl">📱</span>
                <span className="hidden sm:inline">Enviar Cálculo por WhatsApp</span>
                <span className="sm:hidden">Enviar por WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}