/**
 * =============================================================================
 * DECLARACIÓN DE TIPOS — @expo/vector-icons
 * =============================================================================
 *
 * PROPÓSITO:
 * Declara los tipos TypeScript para los iconos vectoriales de la app.
 * Expo no incluye tipos nativos para sus iconos, por lo que este archivo
 * proporciona definiciones mínimas para evitar errores de TypeScript.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - TypeScript requiere declaraciones de tipo para módulos sin tipos propios.
 * - IconProps define las props comunes (name, size, color, style) que todos
 *   los componentes de iconos aceptan.
 * - Cada clase (Ionicons, MaterialIcons, etc.) extiende Component con IconProps.
 *
 * NOTA: Solo se usa Ionicons en el proyecto, pero se declaran todas las
 * familias de iconos por si se necesitan en el futuro.
 */
declare module '@expo/vector-icons' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  export interface IconProps {
    name: string;
    size?: number;
    color?: string | number;
    style?: TextStyle;
    className?: string;
  }

  export class Ionicons extends Component<IconProps> {}
  export class MaterialIcons extends Component<IconProps> {}
  export class FontAwesome extends Component<IconProps> {}
  export class Entypo extends Component<IconProps> {}
  export class Feather extends Component<IconProps> {}
  export class Fontisto extends Component<IconProps> {}
  export class Foundation extends Component<IconProps> {}
  export class MaterialCommunityIcons extends Component<IconProps> {}
  export class Octicons extends Component<IconProps> {}
  export class SimpleLineIcons extends Component<IconProps> {}
  export class Zocial extends Component<IconProps> {}
  export class AntDesign extends Component<IconProps> {}
  export class EvilIcons extends Component<IconProps> {}
}
