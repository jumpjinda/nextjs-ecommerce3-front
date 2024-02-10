import CategoriesSection from "@/components/CategoriesSection";
import Featured from "@/components/Featured";

const Home = () => {
  return (
    <>
      <div className="bg-gray-100">
        <Featured />
        <CategoriesSection />
      </div>
    </>
  );
};

export default Home;
