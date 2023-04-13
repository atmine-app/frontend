import { BsCarFront, BsBoxSeam, BsTree, BsBuildingGear } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { BiSwim } from "react-icons/bi";
import { GiBarbecue } from "react-icons/gi";
import { AiOutlineCamera } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";

const categories = [
  { value: "parking", label: "Parking", icon: BsCarFront },
  { value: "storage", label: "Storage", icon: BsBoxSeam },
  { value: "garden", label: "Garden", icon: BsTree },
  { value: "basement", label: "Basement", icon: HiOutlineHome },
  { value: "attic", label: "Attic", icon: BsBuildingGear },
  { value: "pool", label: "Pool", icon: BiSwim },
  { value: "barbecue", label: "Barbecue", icon: GiBarbecue },
  { value: "photostudio", label: "Photo Studio", icon: AiOutlineCamera },
  { value: "other", label: "Other", icon: FaRandom },
];

export default categories;
