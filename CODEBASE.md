# RutaUTP-Expo — Documentación del Código Fuente

## Descripción General

**Ruta UTP** es una aplicación móvil desarrollada con Expo/React Native que facilita la orientación de transporte público hacia el campus de la Universidad Tecnológica del Perú (sede Trujillo). La app muestra rutas de micros y combis, permite guardar lugares favoritos, ver reportes de seguridad comunitarios y gestionar el perfil del usuario.

---

## Arquitectura del Proyecto

```
RutaUTP-Expo/
├── app/                    # Pantallas (file-based routing de expo-router)
├── src/
│   ├── core/              # Capa de infraestructura (repositorios)
│   ├── data/              # Datos simulados (mock)
│   ├── features/          # Módulos de funcionalidad (MVVM)
│   └── shared/            # Código reutilizable entre features
└── assets/                # Recursos estáticos (fuentes, imágenes)
```

### Patrón MVVM (Model-View-ViewModel)

Cada feature sigue una arquitectura MVVM modificada:

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| **View** | `XxxView.tsx` | Presentación JSX, recibe viewModel |
| **ViewModel** | `useXxxViewModel.ts` | Estado y lógica de UI (hooks) |
| **Service** | `XxxService.ts` | Datos estáticos/lógica de negocio |
| **Styles** | `styles.ts` | Estilos StyleSheet.create |
| **index.ts** | `index.ts` | Re-exportaciones (barril) |

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Expo SDK | ~54 | Framework principal (managed workflow) |
| React Native | 0.81.5 | Runtime UI multiplataforma |
| React | 19.1 | Librería de componentes |
| TypeScript | ~5.9 | Tipado estático |
| expo-router | ~6.0.24 | Navegación file-based |
| react-native-maps | 1.20.1 | Mapas con proveedor Google |
| expo-camera | ~17.0.10 | Escáner de carnet con cámara |
| AsyncStorage | 2.2.0 | Persistencia local |
| reanimated | ~4.1.1 | Animaciones performantes |
| gesture-handler | ~2.28 | Gestos táctiles |

---

## Módulos de Funcionalidad (Features)

### 1. Bienvenida (`bienvenida/`)

Pantalla de onboarding que muestra las características de la app antes de navegar al mapa.

**Componentes:**
- Hero section con tiempo de llegada simulado
- Tarjetas de características (Seguridad, Ahorros)
- Botón CTA con animación de presión
- Modal de términos de servicio

### 2. Mapa (`mapa/`)

Pantalla central con mapa interactivo y simulación de transporte en tiempo real.

**Funcionalidades:**
- Mapa Google con marcadores (UTP, usuario, buses)
- Simulación de buses moviéndose en coordenadas
- Búsqueda de destinos por texto
- Chips de acceso rápido a lugares frecuentes
- Drawer lateral con navegación
- Sistema de reporte de incidentes

### 3. Rutas (`rutas/`)

Lista de rutas de transporte con vista detallada y navegación simulada.

**Funcionalidades:**
- Lista de rutas con tiempo, costo y congestión
- Vista detallada con polilínea en el mapa
- Estadísticas (tiempo, costo, transbordos, congestión)
- Instrucciones paso a paso
- Navegación tipo CarPlay (modal simulado)

### 4. Guardado (`guardado/`)

Gestión de lugares y líneas de transporte favoritas.

**Funcionalidades:**
- Tabs: Lugares / Líneas
- CRUD básico (agregar, ver detalle, eliminar)
- Indicador de lugar frecuente
- Mini mapa en detalle de lugar
- Paradas principales en detalle de línea

### 5. Seguridad (`seguridad/`)

Reportes comunitarios y zonas seguras.

**Funcionalidades:**
- Feed de reportes (alertas, tráfico, sugerencias)
- Sistema de votos y comentarios
- Rutas seguras con monitoreo
- Mini mapa con polilínea de ruta
- Acceso a emergencia (105)
- Saludo dinámico según hora del día

### 6. Perfil (`perfil/`)

Datos del usuario, billetera y preferencias.

**Funcionalidades:**
- Hero con avatar e iniciales dinámicas
- Estadísticas (viajes, rutas, logros)
- Billetera: tarjeta de pago + carnet universitario
- Toggles de preferencias (notificaciones, ubicación, eco)
- Editor de nombre
- Escáner de carnet con cámara

---

## Código Compartido (`shared/`)

### Componentes Reutilizables

| Componente | Propósito |
|------------|-----------|
| `TopAppBar` | Barra superior con leading/trailing configurables |
| `BottomNavBar` | Barra inferior con 5 pestañas |
| `BusCard` | Tarjeta de información de línea de transporte |
| `FeatureCard` | Tarjeta de característica destacada |
| `StatTile` | Mosaico de estadística con icono |
| `SheetHeader` | Encabezado para modales/sheets |
| `TarjetaFormSheet` | Formulario de método de pago |
| `CarnetScannerView` | Escáner de carnet con cámara |

### Constantes

| Archivo | Contenido |
|---------|-----------|
| `Colors.ts` | Paleta Material 3 (rojo UTP #a80033) |
| `Typography.ts` | Escala tipográfica (HankenGrotesk, BeVietnamPro, JetBrainsMono) |
| `Spacing.ts` | Sistema de spacing (grid 4px) y radios |

### Hooks

| Hook | Propósito |
|------|-----------|
| `useRouter` | Abstracción de navegación con tipado |
| `RouterProvider` | Context de navegación (placeholder) |

### Tipos

| Tipo | Descripción |
|------|-------------|
| `Ruta` | Línea de transporte público |
| `LugarGuardado` | Ubicación favorita del usuario |
| `LineaGuardada` | Ruta de transporte guardada |
| `ReporteComunidad` | Reporte/incidente de la comunidad |
| `AppScreen` | Pantallas principales de la app |
| `NavTab` | Pestañas de navegación inferior |

---

## Sistema de Diseño

### Colores (Material 3)

```typescript
// Color principal — Rojo institucional UTP
appPrimary: '#a80033'

// Color secundario — Azul complementario
secondary: '#3c5d9c'

// Color terciario — Verde-azulado para acentos
tertiary: '#005b6e'
```

### Tipografía

| Familia | Uso |
|---------|-----|
| HankenGrotesk | Títulos y displays (impacto visual) |
| BeVietnamPro | Cuerpo de texto (legibilidad) |
| JetBrainsMono | Etiquetas en mayúsculas (estilo técnico) |

### Espaciado

Sistema basado en grid de 4px:
- `unit`: 4px
- `stackGap`: 12px
- `gutter`: 16px
- `containerPadding`: 20px
- `touchTargetMin`: 48px (accesibilidad)

---

## Navegación

### Estructura de Rutas (expo-router)

```
index       → Bienvenida (onboarding)
mapa        → Mapa con transporte
rutas       → Lista de rutas
guardado    → Lugares y líneas guardadas
seguridad   → Reportes y rutas seguras
perfil      → Perfil del usuario
```

### Router Personalizado

El hook `useRouter()` abstrae expo-router con:
- Tipado fuerte (`AppScreen`, `NavTabScreenMap`)
- Mapeo bidireccional segment ↔ pantalla
- Estado de pantalla actual (`currentScreen`)

---

## Persistencia de Datos

### AsyncStorage (StorageRepository)

Claves utilizadas:
- `@rutautp:saved_places` → Lugares guardados
- `@rutautp:saved_lines` → Líneas guardadas
- `@rutautp:user_profile` → Perfil del usuario
- `@rutautp:payment_method` → Método de pago

**Nota:** El repositorio está implementado pero no integrado en los ViewModels. El estado actual es volátil (se pierde al cerrar la app).

---

## Datos Simulados (Mock)

La app funciona completamente con datos estáticos:
- Coordenadas GPS reales de Trujillo, Perú
- Nombres de empresas de transporte reales
- Reportes comunitarios simulados
- Buses con movimiento aleatorio

**Para producción:** Reemplazar servicios con llamadas a API real (Google Maps, backend propio).

---

## Puntos de Mejora Futura

1. **Integrar StorageRepository** con ViewModels para persistencia real
2. **API de mapas** para rutas y tiempos reales
3. **Autenticación** de usuarios
4. **WebSocket** para reportes en tiempo real
5. **Notificaciones push** para alertas de seguridad
6. **Geolocalización real** del usuario
7. **Tests unitarios** y de integración
8. **CI/CD** para automatización de builds

---

## Convenciones de Código

1. **Idioma de comentarios:** Español (para el equipo de desarrollo)
2. **Nomenclatura:** camelCase para variables/functions, PascalCase para componentes
3. **Archivos de barril:** `index.ts` en cada carpeta para re-exportaciones
4. **Path aliases:** `@/shared/*`, `@/features/*`, `@/core/*`, `@/data/*`
5. **Componentes puros:** Las Views no contienen lógica de negocio
6. **Estado local:** useState/useMemo en ViewModels, no Context global

---

## Comandos de Desarrollo

```bash
# Iniciar desarrollo
npm start

# Plataformas específicas
npm run android
npm run ios
npm run web
```

---

## Contacto y Contribución

Este proyecto es un **prototipo académico** desarrollado para la Universidad Tecnológica del Perú (UTP) sede Trujillo.

Para contribuir:
1. Seguir la arquitectura MVVM establecida
2. Mantener los comentarios en español
3. Usar los tokens del sistema de diseño (no colores hardcodeados)
4. Documentar nuevos componentes con JSDoc
