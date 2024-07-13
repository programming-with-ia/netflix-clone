interface NavbarItemProps {
  label: string;
}

const NavbarItem = ({ label }: NavbarItemProps) => {
  return (
    <p className="cursor-pointer transition hover:text-primary hover:underline underline-offset-1">
      {label}
    </p>
  );
};

export default NavbarItem;
