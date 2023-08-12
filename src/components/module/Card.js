import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";
import styles from "@/module/Card.module.css";

function Card({ data }) {

  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icons[data?.category]}</div>
      <p className={styles.title}>{data?.title}</p>
      <p className={styles.location}>
        <HiOutlineLocationMarker />
        {data?.location}
      </p>
      <span>{sp(data?.price)} تومان</span>
      <Link href={`/buy-residential/${data?._id}`}>
        مشاهده آگهی
        <BiLeftArrowAlt />
      </Link>
    </div>
  );
}

export default Card;
