import { H1 } from "../../ui/Typography";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <H1 className="text-black cursor-pointer">Exclusive</H1>
    </Link>
  );
};

export default Logo;
