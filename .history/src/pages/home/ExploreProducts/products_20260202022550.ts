import DogFood from "/images/DryFood-Dog.png";
import Camera from "/images/Canon-Camera.png";
import Laptop from "/images/laptop.png";
import Skincare from "/images/unsplash.png";
import Car from "/images/Toy-Car.png";
import Shoes from "/images/Football-Shoes.png";
import Gamepad from "/images/Playstation-Arm.png";
import Jacket from "/images/satin-jacket.png";

export const products = [
  {
    id: "featured-dog-food",
    image: DogFood,
    title: "Breed Dry Dog Food",
    price: 100,
    rating: 3,
    reviewsCount: 35,
  },
  {
    id: "canon-eos-dslr-camera",
    image: Camera,
    title: "CANON EOS DSLR Camera",
    price: 360,
    rating: 4,
    reviewsCount: 95,
  },
  {
    id: "asus-fhd-gaming-laptop",
    image: Laptop,
    title: "ASUS FHD Gaming Laptop",
    price: 700,
    rating: 5,
    reviewsCount: 325,
  },
  {
    id: "featured-curology",
    image: Skincare,
    title: "Curology Product Set",
    price: 500,
    rating: 4,
    reviewsCount: 145,
  },
  {
    id: "kids-electric-car",
    image: Car,
    title: "Kids Electric Car",
    price: 960,
    rating: 5,
    reviewsCount: 65,
    isNew: true,
    colors: ["#FB1314", "#DB4444"],
  },
  {
    id: "football-shoes",
    image: Shoes,
    title: "Jr. Zoom Soccer Cleats",
    price: 1160,
    rating: 5,
    reviewsCount: 35,
    colors: ["#EEFF61", "#DB4444"],
  },
  {
    id: "featured-gamepad-2",
    image: Gamepad,
    title: "GP11 Shooter USB Gamepad",
    price: 660,
    rating: 4,
    reviewsCount: 55,
    isNew: true,
    colors: ["#000000", "#DB4444"],
  },
  {
    id: "featured-jacket-2",
    image: Jacket,
    title: "Quilted Satin Jacket",
    price: 660,
    rating: 4,
    reviewsCount: 55,
    colors: ["#184A48", "#DB4444"],
  },
];

export default products;
