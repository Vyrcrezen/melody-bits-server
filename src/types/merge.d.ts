
export type Merge<A, B> = { [K in keyof (A | B)]: K extends keyof B ? B[K] : A[K] };

export type FieldsNullableRec<T> = { [P in keyof T]: T[P] extends object ? FieldsNullable<T[P]> : T[P] | null; };

export type FieldsNullable<T> = { [P in keyof T]: T[P] extends number | undefined ? T[P] | null : T[P] };
