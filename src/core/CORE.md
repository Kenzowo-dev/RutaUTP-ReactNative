# Capa de Infraestructura (`src/core/`)

Esta directorio contiene la capa de infraestructura de la aplicación: repositorios para acceso a datos.

---

## Repositories

### BaseRepository

Interfaz genérica CRUD que define el contrato para todos los repositorios.

```typescript
export interface BaseRepository<T, ID> {
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T | null>;
  save(item: T): Promise<void>;
  deleteById(id: ID): Promise<void>;
}
```

**Propósito:**
- Abstraer el origen de datos (API, AsyncStorage, SQLite)
- Genéricos `<T, ID>` para reutilizar con cualquier entidad
- Operaciones asíncronas con Promise

**Estado:** Interfaz definida pero no implementada. Los servicios usan datos estáticos.

---

### StorageRepository

Envoltorio de AsyncStorage para persistencia local tipada.

```typescript
const repo = new StorageRepository();

// Operaciones genéricas
await repo.setItem('@rutautp:user_profile', JSON.stringify(profile));
const data = await repo.getItem('@rutautp:user_profile');

// Operaciones específicas
await repo.savePlaces(places);
const places = await repo.getSavedPlaces(); // retorna '[]' por defecto

await repo.saveProfile(profile);
const profile = await repo.getProfile(); // retorna '{}' por defecto
```

**Claves de almacenamiento:**

| Clave | Contenido | Default |
|-------|-----------|---------|
| `@rutautp:saved_places` | Lugares guardados | `'[]'` |
| `@rutautp:saved_lines` | Líneas guardadas | `'[]'` |
| `@rutautp:user_profile` | Perfil del usuario | `'{}'` |
| `@rutautp:payment_method` | Método de pago | `'null'` |

**Manejo de errores:**
- Try/catch silencioso que retorna valores por defecto
- No crashea la app en dispositivos con almacenamiento lleno

**Estado:** Completamente implementado pero NO integrado en los ViewModels. El estado actual es volátil (se pierde al cerrar la app).

---

## Integración Futura

Para conectar StorageRepository con los ViewModels:

```typescript
// Ejemplo: usePerfilViewModel.ts
const [profile, setProfile] = useState(defaultProfile);
const storage = new StorageRepository();

// Cargar perfil al montar
useEffect(() => {
  storage.getProfile().then(data => {
    setProfile(JSON.parse(data));
  });
}, []);

// Guardar perfil al cambiar
const saveProfile = (newProfile) => {
  setProfile(newProfile);
  storage.saveProfile(newProfile);
};
```
