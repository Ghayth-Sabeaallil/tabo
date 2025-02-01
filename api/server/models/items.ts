import Mongoose from "mongoose";

interface Location {
    lat: number;
    lng: number;
}

interface Item {
    description: string;
    address: string;
    price: number;
    rooms: number;
    phone: number;
    location: Location;
    city: string;
    area: number;
    type: string;
    date_created: string;
    is_active: boolean;
    creator: string;
    images: string[];
}

const LocationSchema = new Mongoose.Schema<Location>({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});

const ItemSchema = new Mongoose.Schema<Item>({
    description: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    phone: { type: Number, required: true },
    rooms: { type: Number, required: true },
    area: { type: Number, required: true },
    location: { type: LocationSchema, required: true }, // Use the Location schema
    date_created: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    creator: { type: String, required: true },
    images: { type: [String], required: true },
});
const ItemModel = Mongoose.model("item", ItemSchema);

export default ItemModel;