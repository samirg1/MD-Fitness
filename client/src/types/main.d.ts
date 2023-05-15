/**
 * Type of object that is used to sell a product.
 */
type TSellProduct = {
    id: string;
    price_id: string;
    price: number;
    description: string;
    name: string;
};

/**
 * Type of object that is used to view a product
 */
type TViewProduct = Pick<TSellProduct, "id" | "description" | "name"> & {
    metadata: { link: string; client?: string };
};

/**
 * Type of object that is stored as authentication state.
 */
type TAuthentication = {
    name: string;
    email: string;
    permissions: number[];
    purchases: string[];
    accessToken: string;
};

/**
 * Signup object type.
 */
type TSignup = {
    name: string;
    email: string;
    password: string;
};

/**
 * Login object type.
 */
type TLogin = Omit<TSignup, "name">;

/**
 * Type of user that is returned from database.
 */
type TUser = {
    _id: string;
    name: string;
    email: string;
    dateCreated: Date;
    permissions: number[];
    purchases: string[];
};
