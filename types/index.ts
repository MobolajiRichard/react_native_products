


import { ImageSourcePropType} from "react-native/types";

export type ProductProp = {
    id: number;
    image: ImageSourcePropType;
    title: string;
    desc: string;
    weight: number;
    price: number
}

export type ProductCardProp = {
    product: ProductProp;
    setSelectedProducts: React.Dispatch<React.SetStateAction<ProductProp[]>>
}