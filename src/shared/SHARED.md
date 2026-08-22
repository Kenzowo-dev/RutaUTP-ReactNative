# Código Compartido (`src/shared/`)

Este directorio contiene todo el código reutilizable entre las diferentes features de la aplicación.

---

## Componentes (`shared/components/`)

### TopAppBar

Barra de navegación superior reutilizable.

```tsx
<TopAppBar
  leading="menu"        // 'none' | 'menu' | 'back'
  title="Mapa"
  trailingIcon="add"    // Icono de Ionicons
  trailingAction={handleAdd}
  titleColor={Colors.appPrimary}
/>
```

**Características:**
- Botón leading configurable (menú hamburguesa o flecha volver)
- Botón trailing opcional para acciones contextuales
- Accesibilidad con `accessibilityLabel`
- Sutil sombra para separación visual

---

### BottomNavBar

Barra de navegación inferior con 5 pestañas.

```tsx
<BottomNavBar />
```

**Pestañas:**
| Tab | Icono Activo | Icono Inactivo | Pantalla |
|-----|--------------|----------------|----------|
| mapa | map | map-outline | mapaPrincipal |
| rutas | bus | bus-outline | rutas |
| guardado | bookmark | bookmark-outline | guardado |
| seguridad | lock | lock-open-outline | seguridad |
| perfil | person | person-outline | perfil |

**Comportamiento:**
- Resalta la pestaña activa con color primaria y opacidad completa
- Oculta la barra en la pantalla de bienvenida
- Usa `router.currentScreen` para determinar activo

---

### BusCard

Tarjeta de información de línea de transporte público.

```tsx
<BusCard
  linea="LÍNEA B"
  empresa="Empresa Salaverry"
  minutos="4 min"
  tipo="Micro"
  placa="T1B-721"
  colorLinea={Colors.appPrimary}
  onPress={handlePress}
/>
```

**Diseño:**
- Ancho fijo de 256px, alto 100px
- Barra de acento a la izquierda con color de línea
- Badge de tiempo de llegada
- Scroll horizontal para lista de buses

---

### FeatureCard

Tarjeta de característica destacada (usada en bienvenida).

```tsx
<FeatureCard
  icon="heart"
  iconColor={Colors.appPrimary}
  label="SEGURIDAD"
  title="Rutas nocturnas monitoreadas."
/>
```

---

### StatTile

Mosaico de estadística con icono (usado en rutas).

```tsx
<StatTile
  icon="time"
  iconColor={Colors.appPrimary}
  label="TIEMPO"
  value="20 min"
/>
```

**Layout:** Grid de 2 columnas con `flexWrap: 'wrap'`

---

### SheetHeader

Encabezado para bottom sheets y modales.

```tsx
<SheetHeader
  icon="warning"
  iconColor={Colors.appPrimary}
  title="Reportar incidente"
/>
```

---

### TarjetaFormSheet

Formulario modal para agregar método de pago.

```tsx
<TarjetaFormSheet
  onGuardar={(numero) => saveCard(numero)}
  onClose={() => setShowSheet(false)}
/>
```

**Funcionalidades:**
- Formateo automático del número (grupos de 4 dígitos)
- Formato de fecha MM/AA con slash automático
- CVV con `secureTextEntry`
- Validación completa antes de habilitar guardado

---

### CarnetScannerView

Escáner de carnet universitario con cámara.

```tsx
<CarnetScannerView
  onCapture={handleCapture}
  onClose={handleClose}
/>
```

**Flujo:**
1. Solicita permiso de cámara al montarse
2. Muestra viewfinder con marco de escaneo
3. Botón de captura con feedback visual (checkmark verde)
4. Ejecuta `onCapture` tras 1.5 segundos

**Estados:**
- Solicitando permisos
- Permiso denegado (con botón abrir ajustes)
- Escáner activo con overlay

---

## Constantes (`shared/constants/`)

### Colors

Paleta de colores estilo Material Design 3.

```typescript
import { Colors } from '@/shared/constants';

// Colores principales
Colors.appPrimary      // #a80033 (Rojo UTP)
Colors.secondary       // #3c5d9c (Azul)
Colors.tertiary        // #005b6e (Verde-azulado)

// Superficies
Colors.appBackground   // #f7f9fb
Colors.surfaceContainerLowest  // #ffffff
Colors.surfaceContainerHighest // #e0e3e5

// Texto
Colors.onSurface       // #191c1e
Colors.onSurfaceVariant // #5c3f41
```

---

### Typography

Escala tipográfica con 3 familias de fuentes.

```typescript
import { Typography, AppTracking } from '@/shared/constants';

// Títulos (HankenGrotesk)
Typography.displayLg     // 32px, 900
Typography.headlineMd    // 24px, 700
Typography.headlineSm    // 20px, 700

// Cuerpo (BeVietnamPro)
Typography.bodyLg        // 18px, 400
Typography.bodyMd        // 16px, 400
Typography.bodySm        // 14px, 400

// Etiquetas (JetBrainsMono)
Typography.labelCapsMd   // 12px, 600

// Tracking (letter-spacing)
AppTracking.wideLabel    // 1.5
AppTracking.wideLabelCaps // 2.4
```

---

### Spacing

Sistema de espaciado basado en grid de 4px.

```typescript
import { Spacing, Radius } from '@/shared/constants';

// Espaciado
Spacing.unit             // 4
Spacing.stackGap         // 12
Spacing.gutter           // 16
Spacing.containerPadding // 20
Spacing.touchTargetMin   // 48 (accesibilidad)

// Bordes redondeados
Radius.small             // 4
Radius.medium            // 8
Radius.large             // 12
Radius.xl                // 16
Radius.card              // 20
Radius.pill              // 9999 (completamente redondo)
```

---

## Hooks (`shared/hooks/`)

### useRouter

Hook de navegación personalizado sobre expo-router.

```typescript
const { currentScreen, navigate, reset } = useRouter();

// Navegar a pantalla
navigate('mapaPrincipal');
navigate('rutas');

// Reiniciar a bienvenida
reset();

// Pantalla actual
if (currentScreen === 'mapaPrincipal') { ... }
```

**Mapeo de pantallas:**
| Segmento | AppScreen |
|----------|-----------|
| index | bienvenida |
| mapa | mapaPrincipal |
| rutas | rutas |
| guardado | guardado |
| seguridad | seguridad |
| perfil | perfil |

---

## Tipos (`shared/types/index.ts`)

### Entidades Principales

```typescript
// Ruta de transporte
interface Ruta {
  id: string;
  linea: string;
  nombre: string;
  empresa: string;
  tipo: TipoVehiculo;  // 'Micro' | 'Combi' | 'Bus'
  placa: string;
  minutosLlegada: number;
  colorIdentificador: string;
}

// Lugar guardado por el usuario
interface LugarGuardado {
  id: string;
  nombre: string;
  direccion: string;
  categoria: CategoriaLugar;
  esFrecuente: boolean;
  colorBadge: string;
}

// Reporte de la comunidad
interface ReporteComunidad {
  id: string;
  iniciales: string;
  nombre: string;
  tipo: TipoReporte;  // 'ALERTA' | 'TRÁFICO' | 'SUGERENCIA' | 'OTRO'
  cuerpo: string;
  utiles: number;
  comentarios: number;
}
```

### Tipos de Navegación

```typescript
type AppScreen = 'bienvenida' | 'mapaPrincipal' | 'rutas' | 'guardado' | 'seguridad' | 'perfil';
type NavTab = 'mapa' | 'rutas' | 'guardado' | 'seguridad' | 'perfil';
```

---

## Vector Icons Type Declaration (`shared/types/vector-icons.d.ts`)

Declaración de tipos TypeScript para `@expo/vector-icons` ya que el paquete no incluye tipos nativos.

```typescript
declare module '@expo/vector-icons' {
  export interface IconProps {
    name: string;
    size?: number;
    color?: string | number;
    style?: TextStyle;
  }
  export class Ionicons extends Component<IconProps> {}
  // ... otras familias de iconos
}
```
