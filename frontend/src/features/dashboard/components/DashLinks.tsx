import { LinkItemType } from "@/data/DashboardMenuData";
import { Typography } from "@mui/material";
import Link from "next/link";

interface DashLinksProps {
    link: LinkItemType;
    pathname: string;
}

const DashLinks = ({ link, pathname }: DashLinksProps) => {
    return (
        <div>
            <Typography variant="caption">
                {link.group}
            </Typography>
            <div className="flex flex-col ">
                {link.items.map((item, idx) => (
                    <Typography
                        key={idx}
                        variant="body2"
                        className={`
                                        hover:bg-gray-100 hover:text-black font-bold! rounded transition-all duration-100 text-gray-600
                                            ${pathname === item.href ? "bg-blue-100 border-r border-blue-400 text-blue-600! " : ""}
                                        `}
                    >
                        <Link
                            href={item.href}
                            className="flex items-center text-xs gap-2 p-2 "
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </Typography>
                ))}
            </div>
        </div>
    );
};

export default DashLinks;
