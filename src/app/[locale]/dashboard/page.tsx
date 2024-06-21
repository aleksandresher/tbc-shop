import HeaderWrapper from "@/app/components/header/HeaderWrapper";
import UserSideBar from "@/app/components/userdashboard/SideBar";

interface ParamsType {
  locale: string;
}

export default function Dashboard({ params }: { params: ParamsType }) {
  return (
    <div className="pt-8 px-14 bg-[#f1f3f6] h-lvh">
      <HeaderWrapper locale={params.locale} />
      <UserSideBar locale={params.locale} />
    </div>
  );
}
