import { formatTimestamp } from "../../utils/index.js";
import "./UserInfo.css";

export default function UserInfo ({property}){
    const {owner} = property;

    return(
        <div className="userInfo-section section">
           {owner.avatar && <div className="">
             <img
                    src={owner.avatar}
                    alt="Avatar"
                    className="user-info-avatar-detail "
                  />
            </div>
            }
            <div className="user-info-details"> 
               <h2>Host: {owner.username}</h2>
                <p>Joined {formatTimestamp(owner.createdAt)}</p>
            </div>
        </div>
    )
}