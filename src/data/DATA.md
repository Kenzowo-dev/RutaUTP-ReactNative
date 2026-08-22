# Capa de Datos (`src/data/`)

Esta directorio contiene los datos simulados (mock) utilizados para prototipado y demostración.

---

## MockData.ts

Dataset centralizado con datos de ejemplo que simulan información de un backend real.

**Nota importante:** Este archivo NO está importado por los servicios. Los datos están duplicados directamente en cada clase Service.

### Contenido del Dataset

| Export | Descripción | Cantidad |
|--------|-------------|----------|
| `MOCK_DESTINOS` | Lugares frecuentes con coordenadas GPS | 5 |
| `MOCK_RUTAS_OPCIONES` | Opciones de transporte para el mapa | 3 |
| `MOCK_RUTAS` | Lista completa de rutas | 4 |
| `MOCK_COORDENADAS_LINEAS` | Puntos GPS para polilíneas por línea | 6 líneas |
| `MOCK_REPORTES` | Reportes de comunidad simulados | 3 |
| `MOCK_RUTAS_SEGURAS` | Zonas con monitoreo de seguridad | 2 |
| `MOCK_SAMPLE_LUGARES` | Lugares pre-guardados por defecto | 6 |
| `MOCK_LINEAS` | Líneas de transporte guardadas | 3 |
| `MOCK_CAR_INSTRUCCIONES` | Instrucciones paso a paso | 5 |

---

### Coordenadas GPS (Trujillo, Perú)

| Lugar | Latitud | Longitud |
|-------|---------|----------|
| UTP Trujillo | -8.1116 | -79.0287 |
| Salaverry | -8.1200 | -79.0350 |
| Huanchaco (Playa) | -8.0825 | -79.1197 |
| Casa (referencia) | -8.1180 | -79.0350 |
| Trabajo (referencia) | -8.1050 | -79.0200 |

---

### Estructura de Datos Simulados

```typescript
// Destino con coordenadas
{ id: 1, label: 'UTP', icon: 'school', lat: -8.1116, lon: -79.0287 }

// Ruta de transporte
{
  id: 1,
  linea: 'B',
  empresa: 'Empresa Salaverry',
  recorrido: 'Salaverry → UTP → Centro',
  llegaEn: '4 min',
  tiempo: '20 min',
  costo: 'S/ 1.50',  // Soles peruanos
  congestion: 'Media'
}

// Reporte comunitario
{
  id: '1',
  iniciales: 'JD',
  nombre: 'Jorge D.',
  tipo: 'ALERTA',
  cuerpo: 'Micro lleno en Av. Larco...',
  utiles: 12,
  comentarios: 2
}
```

---

### Recomendación para Producción

1. **Eliminar este archivo** y usar los Services como única fuente de datos
2. **O importar los mocks desde los Services** para evitar duplicación
3. **Reemplazar con llamadas a API:**
   - Google Maps Directions API (rutas y coordenadas)
   - Backend propio (reportes, lugares guardados)
   - API de transporte público local (si disponible)
