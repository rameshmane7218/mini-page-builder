export type UserComponentConfig<T> = {
  displayName: string;
  //   rules: Partial<NodeRules>;
  related: Partial<NodeRelated>;
  props: Partial<T>;
  custom: Record<string, any>;
  isCanvas: boolean;
  name: string;
  order: number;
  defaultProps: Partial<T>;
};
export type UserComponent<T = any> = React.ComponentType<T> & {
  craft?: Partial<UserComponentConfig<T>>;
};

export type NodeRelated = Record<string, React.ElementType>;
export type Resolver<T = any> = Record<string, UserComponent<T>>;
