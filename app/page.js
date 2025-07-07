import Image from "next/image";
import styles from "./page.module.css";
import Leftside from "@/components/Signup/Leftside";
import Signup from "@/components/Signup/Signup.js";

export default function Home() {
  return (
    <div>
      <div className="d-flex">
        <div className="">
          <Leftside />
        </div>
        <div className="">
          <Signup />
        </div>
      </div>
    </div>
  );
}
