"use client";
import { links } from "@/data/DashboardMenuData";
import DashLinks from "@/features/dashboard/components/DashLinks";
import DashProfileBox from "@/features/dashboard/components/DashProfileBox";
import SideBar from "@/features/dashboard/components/SideBar";
import { MenuOpenRounded, MenuRounded } from "@mui/icons-material";
import { Card, IconButton, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);
  return (
    <>
      <div
        className={`absolute top-0 right-0 left-0 bottom-0 transition-all ${isOpen ? "bg-black/20 z-900 opacity-100" : "bg-black/0 -z-1 opacity-0"} `}
        onClick={handleOpenMenu}
      ></div>
      <div
        className={`fixed lg:hidden top-0 ${isOpen ? "right-0" : "-right-75"} transition-all  bottom-0 z-998 flex items-start`}
        onClick={() => {
          if (isOpen) {
            //  fixed the bug but its still there
            handleOpenMenu();
          }
        }}
      >
        <Card className="w-75 lg:w-full h-full top-0 right-0 bottom-0 z-999 p-4! flex flex-col justify-between">
          <div>
            {/* <IconButton
                            size="medium"
                            className="bg-white! m-2!"
                            onClick={handleOpenMenu}
                        >
                            {isOpen ? (
                                <MenuOpenRounded fontSize="large" />
                            ) : (
                                <MenuRounded fontSize="large" />
                            )}
                        </IconButton> */}
            <Typography variant="h6" className="font-bold! " color="primary">
              نسیه
            </Typography>
            <div className="flex flex-col gap-4">
              {links.map((link, index) => (
                <DashLinks key={index} link={link} pathname={pathname} />
              ))}
            </div>
          </div>
          <DashProfileBox />
        </Card>
      </div>
      <IconButton
        size="small"
        className=" z-800 lg:hidden!"
        onClick={handleOpenMenu}
      >
        {isOpen ? (
          <MenuOpenRounded fontSize="large" />
        ) : (
          <MenuRounded fontSize="large" />
        )}
      </IconButton>
    </>
  );
};

export default MobileMenu;

{
  /* <div
                className={`absolute top-0 right-0 left-0 bottom-0 transition-all ${isOpen ? "bg-black/20 z-900 opacity-100" : "bg-black/0 -z-1 opacity-0"} `}
                onClick={handleOpenMenu}
            ></div>
            <div
                className={`fixed lg:hidden top-0 ${isOpen ? "right-0" : "-right-75"} transition-all  bottom-0 z-998 flex items-start`}
                onClick={() => {
                    if (isOpen) {
                        //  fixed the bug but its still there
                        handleOpenMenu();
                    }
                }}
            >
                <SideBar />

                <IconButton
                    size="medium"
                    className="bg-white! m-2!"
                    onClick={handleOpenMenu}
                >
                    {isOpen ? (
                        <MenuOpenRounded fontSize="large" />
                    ) : (
                        <MenuRounded fontSize="large" />
                    )}
                </IconButton>
            </div> */
}
