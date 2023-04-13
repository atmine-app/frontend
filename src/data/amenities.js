import {AiOutlineWifi,AiOutlinePlusCircle,AiOutlineFire} from "react-icons/ai";
import {FiMusic} from "react-icons/fi";
import {SlScreenDesktop} from "react-icons/sl";
import {BsThermometerSnow,BsThermometerSun,BsPersonWorkspace,BsLaptop} from "react-icons/bs";
import {GiWashingMachine,GiCigarette,GiPartyPopper,GiBarbecue} from "react-icons/gi";
import {FaSink,FaChild,FaSwimmingPool,FaHotTub} from "react-icons/fa";
import {TbElevator,TbToolsKitchen2,TbIroning3,TbHanger} from "react-icons/tb";
import {FaDog} from "react-icons/fa";
import {CiParking1,CiDumbbell} from "react-icons/ci";
import {MdOutlineAir} from "react-icons/md";
import {RiAlarmWarningLine,RiAlarmWarningFill} from "react-icons/ri";
import {GrAidOption} from "react-icons/gr";


const amenitiesOptions = [
    { value: "wifi", label: "Wi-Fi", icon: AiOutlineWifi },
    { value: "music", label: "Music" ,icon:FiMusic },
    { value: "tv", label: "TV", icon: SlScreenDesktop },
    { value: "airConditioning", label: "Air Conditioning",icon:BsThermometerSnow },
    { value: "heating", label: "Heating" ,icon:BsThermometerSun},
    { value: "washer", label: "Washer",icon:GiWashingMachine },
    { value: "dishwasher", label: "Dishwasher",icon:FaSink },
    { value: "elevator", label: "Elevator",icon:TbElevator},
    { value: "petFriendly", label: "Pet Friendly", icon: FaDog },
    { value: "smokingAllowed", label: "Smoking Allowed",icon: GiCigarette },
    { value: "kidFriendly", label: "Kid Friendly",icon:FaChild },
    { value: "eventFriendly", label: "Event Friendly",icon:GiPartyPopper },
    { value: "other", label: "Other" ,icon:AiOutlinePlusCircle},
    { value: "freeParking", label: "Free Parking",icon:CiParking1 },
    { value: "kitchen", label: "Kitchen" ,icon:TbToolsKitchen2},
    { value: "workspace", label: "Workspace" ,icon:BsPersonWorkspace},
    { value: "pool", label: "Pool" , icon:FaSwimmingPool},
    { value: "hotTub", label: "Hot Tub", icon: FaHotTub},
    { value: "gym", label: "Gym" ,icon: CiDumbbell},
    { value: "fireplace", label: "Fireplace",icon:AiOutlineFire },
    { value: "iron", label: "Iron" ,icon:TbIroning3},
    { value: "hairDryer", label: "Hair Dryer" ,icon:MdOutlineAir},
    { value: "laptopFriendly", label: "Laptop Friendly",icon:BsLaptop },
    { value: "hangers", label: "Hangers",icon:TbHanger },
    { value: "carbonMonoxideDetector", label: "Carbon Monoxide Detector",icon:RiAlarmWarningLine },
    { value: "smokeDetector", label: "Smoke Detector",icon: RiAlarmWarningFill},
    { value: "firstAidKit", label: "First Aid Kit" ,icon:GrAidOption},
    { value: "grill", label: "Grill",icon:GiBarbecue },
  ];
  
  export default amenitiesOptions;