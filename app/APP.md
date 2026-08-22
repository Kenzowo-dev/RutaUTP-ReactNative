# Pantallas y Navegación (`app/`)

Este directorio contiene las pantallas de la aplicación usando el sistema de enrutado basado en archivos de **expo-router**.

---

## Estructura de Archivos

```
app/
├── _layout.tsx      # Layout raíz (fonts + navigator + provider)
├── index.tsx        # Pantalla de bienvenida (onboarding)
├── mapa.tsx         # Pantalla del mapa
├── rutas.tsx        # Pantalla de rutas
├── guardado.tsx     # Pantalla de guardados
├── seguridad.tsx    # Pantalla de seguridad
└── perfil.tsx       # Pantalla de perfil
```

---

## _layout.tsx — Layout Raíz

Configura la estructura base de toda la aplicación.

### Responsabilidades

1. **Carga de fuentes tipográficas**
   ```typescript
   const [fontsLoaded] = useFonts({
     'HankenGrotesk': require('../assets/fonts/HankenGrotesk-Regular.ttf'),
     'BeVietnamPro': require('../assets/fonts/BeVietnamPro-Regular.ttf'),
     'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
     // ... más variantes (Bold, Medium, SemiBold, ExtraBold)
   });
   ```

2. **Stack Navigator**
   ```typescript
   <Stack screenOptions={{ headerShown: false }}>
     <Stack.Screen name="index" />
     <Stack.Screen name="mapa" />
     <Stack.Screen name="rutas" />
     <Stack.Screen name="guardado" />
     <Stack.Screen name="seguridad" />
     <Stack.Screen name="perfil" />
   </Stack>
   ```
   - `headerShown: false` porque usamos TopAppBar custom

3. **RouterProvider**
   - Context de navegación personalizado (actualmente placeholder)

4. **StatusBar**
   - `style="auto"` para adaptarse al tema del sistema

---

## Pantallas (Screens)

Cada pantalla es un componente "delgado" (thin screen) que solo conecta el ViewModel con la View.

### Patrón de Pantalla

```typescript
import { useXxxViewModel } from '@/features/xxx/viewmodels/useXxxViewModel';
import XxxView from '@/features/xxx/XxxView';

export default function XxxScreen() {
  const viewModel = useXxxViewModel();
  return <XxxView viewModel={viewModel} />;
  // o: return <XxxView {...viewModel} />;  // spread de props
}
```

---

### index.tsx — Bienvenida

```typescript
export default function BienvenidaScreen() {
  const viewModel = useBienvenidaViewModel();
  return <BienvenidaView viewModel={viewModel} />;
}
```

**Navegación:** `index` es la ruta por defecto al abrir la app.

---

### mapa.tsx — Mapa

```typescript
export default function MapaScreen() {
  const viewModel = useMapaViewModel();
  return <MapaView viewModel={viewModel} />;
}
```

**Navegación:** Ruta `/mapa`, accesible desde cualquier pestaña.

---

### rutas.tsx — Rutas

```typescript
export default function RutasScreen() {
  const viewModel = useRutasViewModel();
  return <RutasView viewModel={viewModel} />;
}
```

---

### guardado.tsx — Guardado

```typescript
export default function GuardadoScreen() {
  const viewModel = useGuardadoViewModel();
  return <GuardadoView {...viewModel} />;  // Spread de props
}
```

**Nota:** Este screen usa spread `{...viewModel}` en vez de pasar el objeto completo.

---

### seguridad.tsx — Seguridad

```typescript
export default function SeguridadScreen() {
  const viewModel = useSeguridadViewModel();
  return <SeguridadView viewModel={viewModel} />;
}
```

---

### perfil.tsx — Perfil

```typescript
export default function PerfilScreen() {
  const viewModel = usePerfilViewModel();
  return <PerfilView viewModel={viewModel} />;
}
```

---

## Flujo de Navegación

```
┌─────────────────────────────────────────────────────────────────┐
│                         Apertura de App                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     index (Bienvenida)                          │
│  - Muestra características de la app                            │
│  - Botón "Comenzar" o "Saltar"                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  mapaPrincipal (Mapa)                           │
│  - Mapa con ubicación del usuario y UTP                         │
│  - Búsqueda de destinos                                         │
│  - Buses simulados en tiempo real                               │
│  - BottomNavBar visible                                         │
└─────────────────────────────────────────────────────────────────┘
         │           │           │           │
         ▼           ▼           ▼           ▼
     ┌───────┐  ┌───────┐  ┌─────────┐  ┌───────┐
     │ rutas │  │guardad│  │seguridad│  │perfil │
     │       │  │  o    │  │         │  │       │
     └───────┘  └───────┘  └─────────┘  └───────┘
```

---

## Navegación por BottomNavBar

La barra inferior permite navegación directa entre secciones:

| Icono | Label | Pantalla |
|-------|-------|----------|
| map | Mapa | mapaPrincipal |
| bus | Rutas | rutas |
| bookmark | Guardado | guardado |
| lock | Seguridad | seguridad |
| person | Perfil | perfil |

---

## Navegación Programática

```typescript
import { useRouter } from '@/shared/hooks/useRouter';

const router = useRouter();

// Navegar a pantalla específica
router.navigate('mapaPrincipal');
router.navigate('rutas');
router.navigate('guardado');

// Reiniciar a bienvenida (reemplaza historial)
router.reset();

// Pantalla actual
if (router.currentScreen === 'mapaPrincipal') {
  // Lógica específica del mapa
}
```
