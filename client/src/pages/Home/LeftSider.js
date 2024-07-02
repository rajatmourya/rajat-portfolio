import React from "react";
import { RiFacebookCircleLine } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 text-gray-600 text-xl sm:flex-row sm:pb-10">
          <Link to="https://www.facebook.com/share/7gaME7GU2xx8fTVm/?mibextid=qi2Omg">
            <RiFacebookCircleLine className="i" />
          </Link>
          <Link to="https://www.instagram.com/rajat_mourya24?igsh=MTBpaDloZzFuZnZrMg==">
            <FaInstagram className="i" />
          </Link>
          <Link >
            <CiMail className="i" />
          </Link>
          <Link to="https://www.linkedin.com/in/rajat2404/">
            <FaLinkedinIn className="i" />
          </Link>
          <Link to="https://github.com/rajatmourya">
            <FaGithub className="i" />
          </Link>
        </div>
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
