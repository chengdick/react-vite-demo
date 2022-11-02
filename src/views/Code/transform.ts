import { transform as _transform } from "sucrase";

const opts: any = { transforms: ["jsx", "imports"] };

export default (code: any) => _transform(code, opts).code;
