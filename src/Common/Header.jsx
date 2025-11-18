import * as React from "react";
import { Link } from "react-router-dom";
import { Blocks, House, ShoppingCart, User, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/context/authContext";

const components = [
  {
    title: "Toys",
    href: "/docs/primitives/alert-dialog",
    description:
      "You can find Premium quality toys from Gadget Shop and make your collections perfect.",
  },
  {
    title: "Books",
    href: "/docs/primitives/hover-card",
    description: "For Book Lovers, we have every variety of books...",
  },
  {
    title: "Laptops",
    href: "/docs/primitives/progress",
    description:
      "All types of Latops you can explore and purchase. checkout now",
  },
  {
    title: "Mobile Phones",
    href: "/docs/primitives/scroll-area",
    description: "I phone Lover or Android lover?.... whatever explore here.",
  },
  {
    title: "Tablets",
    href: "/docs/primitives/tabs",
    description: "Explore the variety of Tablets in Gadget Shop",
  },
  {
    title: "Others",
    href: "/docs/primitives/tooltip",
    description: "Miscellaneous gadgets are there...",
  },
];

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenication, logout } = useUser();

  return (
    <>
      <div className=" flex items-center justify-around p-4 bg-gradient-to-r from-gray-900 to-blue-200">
        {/*  logo */}
        <Link to="/">
          <div className="border-1 p-2 rounded-sm border-purple-300 gap-2 flex ">
            <span>
              {" "}
              <Blocks />
            </span>
            Gadget Shop
          </div>
        </Link>

        <NavigationMenu viewport={false} className="">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="[&>svg]:hidden cursor-pointer">
                <Link to="/">Home</Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50">
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[500px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/aboutus">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem></NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
              <NavigationMenuContent className={` z-50`}>
                <ul className="grid w-[200px] gap-4 ">
                  <li>
                    {isAuthenication ? (
                      <NavigationMenuLink asChild>
                        <Link
                          to="/signin"
                          onClick={() => {
                            logout();
                            console.log("runnin")
                          }}
                          className="flex-row items-center gap-2 "
                        >
                          <User />
                          Logout
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/signin"
                            className="flex-row items-center gap-2 "
                          >
                            <User />
                            SignIn
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link
                            to="signup"
                            className="flex-row items-center gap-2"
                          >
                            <UserCheck />
                            SignUp
                          </Link>
                        </NavigationMenuLink>
                      </>
                    )}

                    <NavigationMenuLink asChild>
                      <Link to="/" className="flex-row items-center gap-2">
                        <ShoppingCart />
                        Cart
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {isAuthenication && (
              <NavigationMenuItem className="rounded-xl py-1 px-2 ml-2 bg-gray-700">
                Welcome back, {user}
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default Header;