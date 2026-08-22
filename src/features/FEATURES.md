# Módulos de Funcionalidad (Features)

## Estructura de un Feature

Cada funcionalidad sigue una estructura consistente:

```
src/features/<nombre>/
├── <Nombre>View.tsx           # Vista principal (presentación)
├── viewmodels/
│   └── use<Nombre>ViewModel.ts  # Hook con estado y lógica
├── services/
│   └── <Nombre>Service.ts       # Datos y lógica de negocio
├── styles.ts                    # Estilos StyleSheet.create
└── index.ts                     # Re-exportaciones (barril)
```

---

## 1. Bienvenida (`bienvenida/`)

### Propósito
Pantalla de onboarding que presenta la app al usuario por primera vez.

### Archivos

| Archivo | Descripción |
|---------|-------------|
| `BienvenidaView.tsx` | Vista con hero section, feature cards y CTA |
| `useBienvenidaViewModel.ts` | Estado de presión del botón y modal legal |
| `BienvenidaService.ts` | Texto legal y datos de feature cards |
| `styles.ts` | Estilos de la pantalla de bienvenida |

### Flujo
1. Usuario ve el tiempo de llegada simulado ("3 min")
2. Observa las características (Seguridad, Ahorros)
3. Presiona "Comenzar" → navega al mapa
4. Opcional: ve términos de servicio en modal

---

## 2. Mapa (`mapa/`)

### Propósito
Pantalla central con mapa interactivo y transporte en tiempo real.

### Archivos

| Archivo | Descripción |
|---------|-------------|
| `MapaView.tsx` | Mapa con marcadores, búsqueda, drawer y modales |
| `useMapaViewModel.ts` | Estado del mapa, buses simulados y búsqueda |
| `MapaService.ts` | Destinos, rutas y simulación de buses |
| `styles.ts` | Estilos de marcadores, drawer y modales |

### Funcionalidades Clave

#### Simulación de Buses
```typescript
// Los buses se generan en círculo alrededor del destino
// Cada uno tiene ángulo (0°, 60°, 120°...) y velocidad aleatoria
// Se mueven cada 50ms usando setInterval
// 0.2% probabilidad de cambiar dirección por tick
```

#### Búsqueda de Destinos
- Coincidencia case-insensitive por texto
- Actualiza la región del mapa al seleccionar
- Spawnea buses cercanos automáticamente

#### Modales
- **Drawer:** Menú lateral con navegación y cerrar sesión
- **Reportar:** Formulario con tipo (Alerta/Tráfico/Sugerencia) y descripción
- **Éxito:** Confirmación de reporte enviado

---

## 3. Rutas (`rutas/`)

### Propósito
Lista de rutas de transporte con vista detallada y navegación simulada.

### Archivos

| Archivo | Descripción |
|---------|-------------|
| `RutasView.tsx` | Lista maestro-detalle + navegación CarPlay |
| `useRutasViewModel.ts` | Estado de selección y navegación |
| `RutasService.ts` | Rutas, coordenadas e instrucciones |
| `styles.ts` | Estilos de cards, mapa y CarPlay |

### Componentes Internos

| Componente | Propósito |
|------------|-----------|
| `DetalleRutaView` | Vista de detalle con polilínea y stats |
| `PasoRow` | Fila de instrucción paso a paso |
| `CarPlayView` | Navegación simulada con progreso |

### Flujo de Navegación
1. Usuario selecciona una ruta de la lista
2. Ve el detalle con mapa (polilínea), estadísticas e instrucciones
3. Presiona "Iniciar Navegación"
4. Modal CarPlay muestra instrucciones que avanzan cada 4 segundos
5. Barra de progreso indica avance del trayecto

---

## 4. Guardado (`guardado/`)

### Propósito
Gestión de lugares y líneas de transporte favoritas.

### Archivos

| Archivo | Descripción |
|---------|-------------|
| `GuardadoView.tsx` | Tabs, listas y modales de detalle |
| `useGuardadoViewModel.ts` | Estado de tabs, lugares y líneas |
| `GuardadoService.ts` | Lugares y líneas pre-guardados |
| `styles.ts` | Estilos de cards y modales |

### Funcionalidades

#### Tabs
- **Lugares:** Casa, UTP, Centro Comercial, etc.
- **Líneas:** B, 7, C con sus recorridos

#### CRUD
- **Agregar:** Modal con nombre, dirección y categoría
- **Seleccionar:** Ver detalle con mini mapa y acciones
- **Eliminar:** Filtrar de la lista por ID

#### Indicador Frecuente
- Badge "FRECUENTE" en lugares marcados como `esFrecuente: true`
- Color diferenciado para UTP (rojo institucional)

---

## 5. Seguridad (`seguridad/`)

### Propósito
Reportes comunitarios y zonas con monitoreo de seguridad.

### Archivos

| Archivo | Descripción |
|---------|-------------|
| `SeguridadView.tsx` | Feed de reportes, rutas seguras y saludo |
| `useSeguridadViewModel.ts` | Estado de modales y datos dinámicos |
| `SeguridadService.ts` | Reportes y rutas seguras predefinidos |
| `styles.ts` | Estilos de cards y badges |

### Funcionalidades Clave

#### Saludo Dinámico
```typescript
// 5:00 - 11:59 → "Buenos días"
// 12:00 - 18:59 → "Buenas tardes"
// 19:00 - 4:59  → "Buenas noches"
```

#### Tipos de Reporte
| Tipo | Color | Descripción |
|------|-------|-------------|
| ALERTA | Rojo (errorContainer) | Incidentes urgentes |
| TRÁFICO | Azul (secondaryContainer) | Congestiones |
| SUGERENCIA | Verde (tertiaryContainer) | Consejos de ruta |

#### Rutas Seguras
- Zonas con patrullaje activo
- Paraderos con cámaras de seguridad
- Indicador de paraderos iluminados

---

## 6. Perfil (`perfil/`)

### Propósito
Datos del usuario, billetera y preferencias.

### Archivos

| Archivo | Descripción |
|---------|-------------|
| `PerfilView.tsx` | Hero, stats, preferencias y modales |
| `usePerfilViewModel.ts` | Estado de perfil y acciones |
| `PerfilService.ts` | Datos por defecto y utilidades |
| `styles.ts` | Estilos de hero, toggles y modales |

### Componentes Internos

| Componente | Propósito |
|------------|-----------|
| `ToggleRow` | Fila con icono, label y switch toggle |

### Funcionalidades

#### Hero Section
- Gradiente con colores UTP (rojo → rosa → verde)
- Avatar con iniciales dinámicas (calculadas del nombre)
- Badges: "ESTUDIANTE UTP" y "VERIFICADO" (si carnet escaneado)

#### Billetera
- **Tarjeta de pago:** Modal TarjetaFormSheet para agregar método
- **Carnet UTP:** Escáner con cámara para verificar estudiante

#### Preferencias
| Toggle | Descripción |
|--------|-------------|
| Notificaciones | Alertas de la app |
| Compartir ubicación | GPS para rutas |
| Modo económico | Preferir rutas más baratas |

---

## Convtensiones de Features

1. **View pura:** Solo recibe viewModel como props, no contiene lógica
2. **ViewModel como hook:** `useXxxViewModel()` retorna estado y acciones
3. **Service estático:** Métodos `static` para datos sin estado
4. **Styles separados:** `styles.ts` con `StyleSheet.create`
5. **Barrel index.ts:** Re-exporta View y ViewModel
