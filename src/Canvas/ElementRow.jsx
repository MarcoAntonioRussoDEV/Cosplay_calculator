import React, { useEffect, useRef, useState } from "react";
import {
    Eye,
    EyeOff,
    MoreHorizontal,
    Move,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteLine, setSelectedLineId } from "@redux/lineSlice.js";
import {
    hideLine,
    setLineColor,
    showLine,
} from "@/Redux/Redux-Slices/lineSlice";
import useLineActions from "@/Hooks/use-line-actions";
import { Input } from "@/components/ui/input";
import { GradientPicker } from "@/components/ui/color-picker";
import { HexColorPicker } from "react-colorful";
import { DrawerTrigger } from "@/components/ui/drawer";
import ColorDrawer from "./ColorDrawer";

const ElementRow = ({ line, alertDialogRef }) => {
    const [lineName, setLineName] = useState();
    const drawerRef = useRef(null);
    const dispatch = useDispatch();
    const {
        utils: { selectedLineId },
    } = useSelector(state => state.lines);

    useEffect(() => {
        setLineName(line.name);
    }, [line]);

    const handleClick = lineID => {
        if (selectedLineId === lineID) {
            dispatch(setSelectedLineId(null));
        } else {
            dispatch(setSelectedLineId(lineID));
        }
    };

    const refer = useRef(null);

    useEffect(() => {
        // const setSeletedLine = () => {
        //     dispatch(setSelectedLineId(line.id));
        // };
        // refer.current.addEventListener("mouseover", setSeletedLine);
        // refer.current.addEventListener("mouseout", () => {
        //     dispatch(setSelectedLineId(null));
        //     refer.current.addEventListener("mouseover", setSeletedLine);
        // });
    }, [selectedLineId]);

    const dropDownActions = useLineActions(line, drawerRef, alertDialogRef);

    return (
        <>
            <DrawerTrigger
                className="hidden"
                ref={drawerRef}
            >
                Open
            </DrawerTrigger>
            <SidebarMenuItem>
                <SidebarMenuButton
                    ref={refer}
                    variant={
                        line.id === selectedLineId ? "selected" : "outline"
                    }
                    onClick={() => handleClick(line.id)}
                    className={`fade-in ${line.isHidden ? "opacity-35" : ""}`}
                >
                    <div className="cursor-pointer text-white flex justify-between w-full items-center ">
                        <p className="truncate whitespace-nowrap text-xs">
                            {lineName} -{" "}
                            <span className="italic text-muted-foreground">
                                {line.size} cm
                            </span>
                        </p>
                    </div>
                </SidebarMenuButton>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                            <MoreHorizontal />
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="right"
                        align="start"
                    >
                        {dropDownActions.map(action => (
                            <DropdownMenuItem
                                key={action.label}
                                onClick={action.action}
                                className={`flex justify-between gap-2 cursor-pointer ${action.className}`}
                            >
                                <span>{action.label}</span>
                                {action.icon}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
            <ColorDrawer {...line} />
        </>
    );
};

export default ElementRow;
