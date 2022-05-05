export interface GenericLink {
  submenus?: GenericLink[] | null;
  path?: string;
  selected?: boolean | undefined;
  icon?: string;
  title?: string;
}
