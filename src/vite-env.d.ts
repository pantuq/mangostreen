/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

type Tag = {
  id: number;
  user_id: number;
  name: string;
  sign: string;
  kind: "expenses" | "income";
};

type Resources<T = any> = {
  resources: T[];
  pager: {
    page: number;
    per_page: number;
    count: number;
  };
};

type Item = {
  id: number;
  user_id: number;
  amount: number;
  tag_ids: number[];
  happened_at: string;
  kind: "expenses" | "income";
  tags?: Tag[];
};

type accountingData = {
  kind: "expenses" | "income" | string;
  tag_ids: number[];
  amount: number;
  happened_at: string;
};
