import * as S from "./styles";
import { Link, useLocation } from "react-router-dom";
import { Engine, Users, House, Gear } from "@phosphor-icons/react";

export function Sidebar() {
  const location = useLocation();

  const buttons = [
    {
      id: "company",
      path: "/companies",
      label: "Companies",
      icon: <House size={24} />,
    },
    {
      id: "units",
      path: "/units",
      label: "Units",
      icon: <Gear size={24} />,
    },
    {
      id: "users",
      path: "/users",
      label: "Users",
      icon: <Users size={24} />,
    },
    {
      id: "assets",
      label: "Assets",
      path: "/asset",
      icon: <Engine size={24} />,
    },
  ];

  const isSelected = (button: typeof buttons[number]) => {
    if (location.pathname === "/") return button.path === location.pathname;

    return location.pathname.split("/")[1] === button.path?.substring(1);
  };

  return (
    <S.Sidebar>
      {buttons.map((button) => (
        <Link to={button.path} key={button.id}>
          <S.SidebarContent isSelected={isSelected(button)}>
            <>{button.icon}</>
            <p>{button.label}</p>
          </S.SidebarContent>
        </Link>
      ))}
    </S.Sidebar>
  );
}
