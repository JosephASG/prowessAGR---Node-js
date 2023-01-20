import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";

const FollCustomerInfo = ({ item }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { wish } = state;

  const handlerUnfollow = (item) => {
    ctxDispatch({
      type: "WISH_REMOVE_ITEM",
      payload: item,
    });
  };

  return (
    <div className="sell-fill-group">
      <div className="sell-fill-header">
        <img src={item.image.secure_url} alt={item.name} />
      </div>
      <div className="sell-fill-body">
        <Link to={`../seller/${item._id}`}>
          {item.name} <FontAwesomeIcon icon={faEye} />
        </Link>
        <span onClick={() => handlerUnfollow(item)} className="unfollow">
          Dejar de seguir
        </span>
        <span className="date">
          Miembro desde: {item.createdAt.slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default FollCustomerInfo;
