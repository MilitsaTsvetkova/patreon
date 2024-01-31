import WelcomeOne from "../../components/WelcomeOne";
import WelcomeTwo from "../../components/WelcomeTwo";

type Props = {
  searchParams: {
    step?: string;
  };
};

const WelcomePage = ({ searchParams }: Props) => {
  const step = searchParams.step ?? "1";
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 ">
      {step == "1" && <WelcomeOne />}
      {step == "2" && <WelcomeTwo />}
    </div>
  );
};

export default WelcomePage;
